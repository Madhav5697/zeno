import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt, answers } = await req.json();

  if (!prompt || !answers || !Array.isArray(answers)) {
    return NextResponse.json({ error: 'Missing prompt or answers' }, { status: 400 });
  }

  const instruction = `
You are a professional prompt refiner. Your job is to convert a vague or incomplete prompt into a precise, structured instruction that is fully understood by AI tools like Cursor, LLaVA, GPT-4, Claude, and coding copilots.

Follow these rules:
- Write a clear TASK description
- Include INPUT and OUTPUT expectations if applicable
- Add CONTEXT, CONSTRAINTS, or TECHNOLOGIES used
- Use Markdown-style formatting with labels (e.g., **Task:**, **Input:**, etc.)
- Avoid unnecessary language, explanation, or vague terms

Use a direct tone. Focus on clarity and specificity.

---

**Original Prompt:**
${prompt}

### Clarifying Answers:
${answers.map((a, i) => `Q${i + 1}: ${a}`).join('\n')}

### Output:
Return only the final refined prompt. Do not include this header.
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
          { role: 'system', content: 'You generate refined prompts from vague ones using user input.' },
          { role: 'user', content: instruction },
        ],
      }),
    });

    const data = await res.json();

    if (data.error) {
      console.error('OpenRouter error:', data.error);
      return NextResponse.json({ error: data.error.message || 'API error' }, { status: 500 });
    }

    const finalPrompt = data?.choices?.[0]?.message?.content?.trim();
    return NextResponse.json({ finalPrompt });
  } catch (error) {
    console.error('Request failed:', error);
    return NextResponse.json({ error: 'Failed to contact model' }, { status: 500 });
  }
}
