/** Sends a website enquiry to /api/enquiry (emailed via Zoho Mail). */
export interface EnquiryPayload {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  source: 'contact' | 'quote';
  /** Hidden honeypot field — must stay empty for real visitors. */
  website?: string;
}

export async function sendEnquiry(payload: EnquiryPayload): Promise<void> {
  let res: Response;
  try {
    res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, page: window.location.pathname }),
    });
  } catch {
    throw new Error('Network error — please check your connection and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || 'We could not send your enquiry right now.');
  }
}
