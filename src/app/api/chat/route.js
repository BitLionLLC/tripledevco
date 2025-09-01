import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { knowledgeBase } from '@/kb/knowledge';
import { buildContextForQuery } from '@/lib/retrieval';

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const userMessage = messages[messages.length - 1]?.content ?? '';

    const context = buildContextForQuery(userMessage, knowledgeBase, 1600);

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const model = process.env.OPENAI_MODEL || 'gpt-5-nano';

    const completion = await client.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content:
            'You are the TripleDev.co assistant. Be concise, helpful, and friendly. Use the provided context to answer. If the context is missing relevant info, say so briefly and ask a clarifying question.',
        },
        {
          role: 'system',
          content: `Context for this conversation (use it faithfully):\n\n\n${context}`,
        },
        ...messages.map(m => ({ role: m.role, content: m.content })),
      ],
    });

    const message = completion.choices?.[0]?.message ?? { role: 'assistant', content: 'Sorry, no response was generated.' };
    return NextResponse.json({ message });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}


