import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/mailer';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const body = await req.json();
    const name = (body?.name || '').toString().trim();
    const email = (body?.email || '').toString().trim();
    const message = (body?.message || '').toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await sendContactEmail(name, email, message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}


