import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  console.log('🛠 Prompt received:', prompt);
  console.log('🔑 API KEY loaded:', process.env.OPENROUTER_API_KEY?.slice(0, 15));

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const instruction = `
You are a helpful assistant. Based on the user's prompt below, suggest 2–3 short follow-up questions to clarify vague or missing details. 

Do not answer the prompt or explain anything. Just return the questions, numbered if needed.

Prompt:
\"\"\"${prompt}\"\"\"
`;

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Prompt Refiner',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          { role: 'system', content: 'You ask clarifying questions for vague prompts.' },
          { role: 'user', content: instruction },
        ],
      }),
    });

    const data = await res.json();

    if (data.error) {
      console.error('❌ OpenRouter error:', data.error);
      return NextResponse.json({ error: data.error.message || 'API Error' }, { status: 500 });
    }

    const raw = data?.choices?.[0]?.message?.content ?? '';
    console.log('📩 Raw response from model:\n', raw);

    const questions = raw
      .split(/(?:\r?\n|\s*)?\d+\.\s+/g)
      .map(q => q.trim())
      .filter(q => q.length > 0);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('🚨 Network/API call failed:', error);
    return NextResponse.json({ error: 'Failed to fetch from OpenRouter' }, { status: 500 });
  }
}
