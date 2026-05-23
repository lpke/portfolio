import { EMAIL_CONFIG, SITE } from '@/utils/constants';

const RESEND_EMAILS_URL = 'https://api.resend.com/emails';
const USER_AGENT = 'lpdev-portfolio/1.0';
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 4000;
const HTML_ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

type EmailRequest = {
  type?: unknown;
  name?: unknown;
  email?: unknown;
  details?: unknown;
  message?: unknown;
};

type EmailPayload = {
  fromName: string;
  html: string;
  replyTo: string;
  subject: string;
  text: string;
};

function asTrimmedString(value: unknown, maxLength = MAX_MESSAGE_LENGTH) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => HTML_ENTITY_MAP[char] ?? char);
}

function sanitizeSubject(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function sanitizeDisplayName(value: string) {
  return (
    value
      .replace(/[\r\n<>]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() || SITE.name
  );
}

function getEmailLocalPart(email: string) {
  return email.split('@')[0] ?? SITE.name;
}

function getSenderAddress() {
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const sender = from || EMAIL_CONFIG.defaultFromEmail;
  const angleAddress = sender.match(/<([^>]+)>/)?.[1]?.trim();

  return angleAddress || sender;
}

function formatFromHeader(name: string) {
  const displayName = sanitizeDisplayName(name).replace(/["\\]/g, '\\$&');

  return `"${displayName}" <${getSenderAddress()}>`;
}

function buildHtml(rows: Array<[string, string]>) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
      ${rows
        .map(
          ([label, value]) => `
            <div style="margin: 0 0 24px;">
              <div style="font-weight: 700;">${escapeHtml(label)}</div>
              <div>${escapeHtml(value).replace(/\n/g, '<br />')}</div>
            </div>
          `,
        )
        .join('')}
    </div>
  `;
}

function buildText(rows: Array<[string, string]>) {
  return `${rows.map(([label, value]) => `${label}\n${value}`).join('\n\n')}\n`;
}

function buildContactEmail(body: EmailRequest): EmailPayload | null {
  const name = asTrimmedString(body.name, MAX_NAME_LENGTH);
  const email = asTrimmedString(body.email, MAX_EMAIL_LENGTH).toLowerCase();
  const details = asTrimmedString(body.details);

  if (!name || !isValidEmail(email) || !details) return null;

  const rows: Array<[string, string]> = [
    ['Name', name],
    ['Email', email],
    ['Message', details],
  ];

  return {
    fromName: name,
    subject: sanitizeSubject(
      `${EMAIL_CONFIG.subjectPrefix} contact form: ${name}`,
    ),
    replyTo: email,
    text: buildText(rows),
    html: buildHtml(rows),
  };
}

function buildResumeEmail(body: EmailRequest): EmailPayload | null {
  const email = asTrimmedString(body.email, MAX_EMAIL_LENGTH).toLowerCase();
  const message = asTrimmedString(body.message);

  if (!isValidEmail(email)) return null;

  const rows: Array<[string, string]> = [
    ['Email', email],
    ['Optional message', message || 'No message provided.'],
  ];

  return {
    fromName: getEmailLocalPart(email),
    subject: `${EMAIL_CONFIG.subjectPrefix} CV download request`,
    replyTo: email,
    text: buildText(rows),
    html: buildHtml(rows),
  };
}

async function sendEmail(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL?.trim() || SITE.email;

  if (!apiKey) {
    console.error('Missing RESEND_API_KEY');
    return false;
  }

  let response: Response;

  try {
    response = await fetch(RESEND_EMAILS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT,
      },
      body: JSON.stringify({
        from: formatFromHeader(payload.fromName),
        to: [to],
        subject: payload.subject,
        reply_to: payload.replyTo,
        text: payload.text,
        html: payload.html,
      }),
    });
  } catch (error) {
    console.error('Resend email request failed', error);
    return false;
  }

  if (!response.ok) {
    const error = await response.text();
    console.error('Resend email send failed', {
      status: response.status,
      error,
    });
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  let body: EmailRequest;

  try {
    body = (await request.json()) as EmailRequest;
  } catch {
    return Response.json({ message: 'Invalid request.' }, { status: 400 });
  }

  const payload =
    body.type === 'contact'
      ? buildContactEmail(body)
      : body.type === 'resume'
        ? buildResumeEmail(body)
        : null;

  if (!payload) {
    return Response.json({ message: 'Invalid request.' }, { status: 400 });
  }

  const sent = await sendEmail(payload);

  if (!sent) {
    return Response.json(
      { message: 'Email could not be sent.' },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
