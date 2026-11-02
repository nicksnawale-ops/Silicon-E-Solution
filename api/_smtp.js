/**
 * Minimal, dependency-free SMTP client for sending one message over implicit
 * TLS (SMTPS, port 465) with AUTH LOGIN — what Zoho Mail's SMTP server uses
 * (smtp.zoho.in for India-hosted accounts, smtp.zoho.com otherwise).
 *
 * Files in /api starting with "_" are not exposed as Vercel functions.
 */
import tls from 'node:tls';
import { randomUUID } from 'node:crypto';

const CRLF = '\r\n';
const b64 = (s) => Buffer.from(s, 'utf8').toString('base64');
/** RFC 2047 encoded-word for non-ASCII header text. */
const encodeHeader = (s) => (/^[\x20-\x7E]*$/.test(s) ? s : `=?UTF-8?B?${b64(s)}?=`);
/** Base64 body wrapped at 76 characters per line. */
const b64Body = (s) => b64(s).replace(/.{1,76}/g, (l) => l + CRLF).trimEnd();
const addr = (name, email) => (name ? `"${encodeHeader(name).replace(/"/g, '')}" <${email}>` : `<${email}>`);

/** Builds a multipart/alternative (text + HTML) RFC 5322 message. */
export function buildMessage({ fromName, from, to, replyTo, subject, text, html }) {
  const boundary = `----=_SES_${randomUUID()}`;
  const domain = from.split('@')[1] || 'localhost';
  const headers = [
    `From: ${addr(fromName, from)}`,
    `To: ${to.map((t) => `<${t}>`).join(', ')}`,
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Subject: ${encodeHeader(subject)}`,
    `Date: ${new Date().toUTCString().replace('GMT', '+0000')}`,
    `Message-ID: <${randomUUID()}@${domain}>`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].filter(Boolean);
  const part = (type, body) =>
    [`--${boundary}`, `Content-Type: ${type}; charset=UTF-8`, 'Content-Transfer-Encoding: base64', '', b64Body(body)].join(CRLF);
  return [headers.join(CRLF), '', part('text/plain', text), part('text/html', html), `--${boundary}--`, ''].join(CRLF);
}

/**
 * Sends one message. Resolves on success; rejects with an Error whose message
 * names the failing SMTP step (never includes the password).
 */
export function sendMail({ host, port = 465, user, pass, from, to, message, timeoutMs = 15000 }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({ host, port, servername: host });
    let buffer = '';
    let waiting = null; // { expect: number[], step: string, resolve }
    let settled = false;

    const finish = (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      socket.end();
      err ? reject(err) : resolve();
    };
    const timer = setTimeout(() => finish(new Error('SMTP timeout')), timeoutMs);

    // Collect complete (possibly multi-line) replies: the last line is "NNN text".
    socket.setEncoding('utf8');
    socket.on('data', (chunk) => {
      buffer += chunk;
      const lines = buffer.split(CRLF);
      // Only complete lines count (the last element is a partial line or '').
      const done = lines.slice(0, -1).findIndex((l) => /^\d{3} /.test(l));
      if (done === -1 || !waiting) return;
      const reply = lines.slice(0, done + 1).join('\n');
      buffer = lines.slice(done + 1).join(CRLF);
      const code = Number(lines[done].slice(0, 3));
      const w = waiting;
      waiting = null;
      if (!w.expect.includes(code)) {
        finish(new Error(`SMTP ${w.step} failed (${code}): ${lines[done].slice(4, 120)}`));
      } else {
        w.resolve(reply);
      }
    });
    socket.on('error', (e) => finish(new Error(`SMTP connection error: ${e.message}`)));

    const expect = (step, codes) => new Promise((res) => (waiting = { step, expect: codes, resolve: res }));
    const cmd = (line, step, codes) => {
      const p = expect(step, codes);
      socket.write(line + CRLF);
      return p;
    };

    (async () => {
      await expect('greeting', [220]);
      await cmd(`EHLO ${from.split('@')[1] || 'localhost'}`, 'EHLO', [250]);
      await cmd('AUTH LOGIN', 'AUTH', [334]);
      await cmd(b64(user), 'AUTH user', [334]);
      await cmd(b64(pass), 'AUTH password', [235]);
      await cmd(`MAIL FROM:<${from}>`, 'MAIL FROM', [250]);
      for (const rcpt of to) await cmd(`RCPT TO:<${rcpt}>`, `RCPT TO ${rcpt}`, [250, 251]);
      await cmd('DATA', 'DATA', [354]);
      // Dot-stuff lines that begin with "." and terminate with <CRLF>.<CRLF>.
      const body = message.replace(/\r?\n/g, CRLF).replace(/^\./gm, '..');
      await cmd(`${body}${CRLF}.`, 'message', [250]);
      socket.write(`QUIT${CRLF}`);
      finish();
    })().catch(finish);
  });
}
