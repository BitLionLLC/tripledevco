import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/mailer';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const body = await req.json();
    const name = (body?.name || '').toString().trim();
    const email = (body?.email || '').toString().trim();
    const message = (body?.message || '').toString().trim();
    const recaptchaToken = (body?.recaptchaToken || '').toString();
    const recaptchaAction = (body?.recaptchaAction || '').toString();

    if (!name || !email || !message || !recaptchaToken) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: 'reCAPTCHA not configured' }, { status: 500 });
    }
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: recaptchaToken }).toString(),
    });
    const verifyJson = await verifyRes.json();
    if (!verifyJson.success) {
      console.error('reCAPTCHA verify failed', {
        success: verifyJson.success,
        score: verifyJson.score,
        action: verifyJson.action,
        hostname: verifyJson.hostname,
        errorCodes: verifyJson['error-codes'],
      });
      return NextResponse.json({ error: 'reCAPTCHA failed' }, { status: 400 });
    }
    // Optional: enforce v3 score and action
    if (typeof verifyJson.score === 'number' && verifyJson.score < 0.5) {
      console.warn('Low reCAPTCHA score', { score: verifyJson.score, action: verifyJson.action, hostname: verifyJson.hostname });
      return NextResponse.json({ error: 'Low reCAPTCHA score' }, { status: 400 });
    }
    if (recaptchaAction && verifyJson.action && verifyJson.action !== recaptchaAction) {
      console.warn('Invalid reCAPTCHA action', { expected: recaptchaAction, got: verifyJson.action });
      return NextResponse.json({ error: 'Invalid reCAPTCHA action' }, { status: 400 });
    }

    await sendContactEmail(name, email, message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}


