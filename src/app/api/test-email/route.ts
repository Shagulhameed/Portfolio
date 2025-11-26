import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(_req: NextRequest) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM!, 
      to: 'shagulhameed0320@gmail.com',
      subject: 'Test from Next.js API',
      html: '<h1>Resend is working from localhost ✅</h1>',
    });

    return NextResponse.json({ ok: true, data });
  } catch (error: any) {
    console.error('test-email error', error);
    return NextResponse.json(
      { ok: false, error: error?.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}
