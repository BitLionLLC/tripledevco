import nodemailer from 'nodemailer';

export async function sendContactEmail(name, email, message) {
  const safeName = (name || '').toString().trim();
  const safeEmail = (email || '').toString().trim();
  const safeMessage = (message || '').toString().trim();

  if (!safeName || !safeEmail || !safeMessage) {
    throw new Error('Missing required fields');
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error('Missing SMTP credentials');
  }

  const hasHost = Boolean(host);
  const hasPort = typeof process.env.SMTP_PORT !== 'undefined' && process.env.SMTP_PORT !== '';
  const hasSecure = typeof process.env.SMTP_SECURE !== 'undefined' && process.env.SMTP_SECURE !== '';

  let transporter;
  if (hasHost && hasPort && hasSecure) {
    transporter = nodemailer.createTransport({
      host,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user, pass },
    });
  } else {
    const service = process.env.MAIL_SERVICE || 'gmail';
    transporter = nodemailer.createTransport({
      service,
      auth: { user, pass },
    });
  }

  const toAddress = process.env.MAIL_TO || 'grant@tripledev.co';
  const fromAddress = process.env.MAIL_FROM || user;

  await transporter.sendMail({
    from: fromAddress,
    to: toAddress,
    replyTo: safeEmail,
    subject: `New contact from ${safeName}`,
    text: `Name: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}`,
    html: `
      <div>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;font-family:inherit">${safeMessage}</pre>
      </div>
    `,
  });
}


