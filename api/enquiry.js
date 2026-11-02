/**
 * POST /api/enquiry — website enquiry → email via Zoho Mail (SMTP).
 *
 * Configure in Vercel → Project → Settings → Environment Variables:
 *   ZOHO_SMTP_USER   Zoho mailbox that sends the email, e.g. info@siliconesolution.in
 *   ZOHO_SMTP_PASS   Zoho *app-specific password* for that mailbox (not the login password)
 *   ENQUIRY_TO       Recipient(s), comma-separated, e.g. sales@…,suhas@…
 *   ZOHO_SMTP_HOST   optional, default smtp.zoho.in (use smtp.zoho.com for non-India accounts)
 *   ZOHO_SMTP_PORT   optional, default 465 (SSL)
 *   ENQUIRY_FROM_NAME optional display name, default "Silicon é Solution Website"
 */
import { buildMessage, sendMail } from './_smtp.js';

const LIMITS = { name: 120, organisation: 160, email: 160, phone: 40, service: 160, message: 4000 };
const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

// Best-effort per-instance rate limit: 5 enquiries per IP per 10 minutes.
const hits = new Map();
const rateLimited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const clean = (v, max) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Too many enquiries. Please try again in a few minutes.' });
  }

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body || {};

  // Honeypot: real visitors never fill this hidden field. Pretend success for bots.
  if (body.website) return res.status(200).json({ ok: true });

  const data = {
    name: clean(body.name, LIMITS.name),
    organisation: clean(body.organisation, LIMITS.organisation),
    email: clean(body.email, LIMITS.email),
    phone: clean(body.phone, LIMITS.phone),
    service: clean(body.service, LIMITS.service),
    message: String(body.message ?? '').trim().slice(0, LIMITS.message),
    source: body.source === 'quote' ? 'Quote popup' : 'Contact form',
    page: clean(body.page, 200),
  };

  const missing = ['name', 'organisation', 'email', 'phone'].filter((k) => !data[k]);
  if (missing.length || !EMAIL_RE.test(data.email) || data.phone.replace(/\D/g, '').length < 8) {
    return res.status(400).json({ ok: false, error: 'Please check your name, organisation, email and phone number.' });
  }

  const { ZOHO_SMTP_USER: user, ZOHO_SMTP_PASS: pass, ENQUIRY_TO } = process.env;
  const to = String(ENQUIRY_TO || '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => EMAIL_RE.test(s));
  if (!user || !pass || to.length === 0) {
    console.error('[enquiry] Missing ZOHO_SMTP_USER / ZOHO_SMTP_PASS / ENQUIRY_TO');
    return res.status(500).json({ ok: false, error: 'Enquiry service is not configured yet.' });
  }

  const submitted = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
  const rows = [
    ['Name', data.name],
    ['Organisation', data.organisation],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Service / solution', data.service || '—'],
    ['Submitted via', `${data.source}${data.page ? ` (${data.page})` : ''}`],
    ['Received', `${submitted} IST`],
  ];
  const subject = `New website enquiry: ${data.service || 'General'} — ${data.name} (${data.organisation})`;
  const text = [
    'New enquiry from the Silicon é Solution website',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Message:',
    data.message || '(no message)',
    '',
    'Reply to this email to respond directly to the enquirer.',
  ].join('\n');
  const html = `<!doctype html><html><body style="margin:0;background:#EEF5FB;font-family:Arial,Helvetica,sans-serif;color:#0B2545">
  <div style="max-width:620px;margin:24px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #D6E6F3">
    <div style="background:linear-gradient(90deg,#0A8BD3,#4FC3F7);padding:20px 24px;color:#fff">
      <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:.85">Website enquiry · ${esc(data.source)}</div>
      <div style="font-size:20px;font-weight:bold;margin-top:4px">${esc(data.service || 'General enquiry')}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:10px 24px;color:#5B6B7F;width:38%;border-bottom:1px solid #EEF3F8">${esc(k)}</td><td style="padding:10px 24px;font-weight:bold;border-bottom:1px solid #EEF3F8">${
              k === 'Email' ? `<a href="mailto:${esc(v)}" style="color:#0A8BD3">${esc(v)}</a>` : k === 'Phone' ? `<a href="tel:${esc(String(v).replace(/[^\d+]/g, ''))}" style="color:#0A8BD3">${esc(v)}</a>` : esc(v)
            }</td></tr>`
        )
        .join('')}
    </table>
    <div style="padding:20px 24px">
      <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#5B6B7F;margin-bottom:8px">Message</div>
      <div style="white-space:pre-wrap;font-size:14px;line-height:1.6;background:#F5F9FD;border-radius:10px;padding:14px 16px">${esc(data.message || '(no message)')}</div>
      <p style="font-size:12px;color:#5B6B7F;margin-top:18px">Reply to this email to respond directly to ${esc(data.name)}.</p>
    </div>
  </div></body></html>`;

  try {
    const message = buildMessage({
      fromName: process.env.ENQUIRY_FROM_NAME || 'Silicon é Solution Website',
      from: user,
      to,
      replyTo: `${data.name.replace(/[<>",]/g, '')} <${data.email}>`,
      subject,
      text,
      html,
    });
    await sendMail({
      host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.in',
      port: Number(process.env.ZOHO_SMTP_PORT || 465),
      user,
      pass,
      from: user,
      to,
      message,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[enquiry] send failed:', err && err.message);
    return res.status(502).json({ ok: false, error: 'We could not send your enquiry right now.' });
  }
}

function safeJson(s) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
