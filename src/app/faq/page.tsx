'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'What is Prompt Refiner?',
    answer:
      'Prompt Refiner helps you convert vague prompts into detailed, AI-ready instructions using smart clarifying questions.',
  },
  {
    question: 'Is it free to use?',
    answer:
      'Yes, Prompt Refiner is completely free for personal and non-commercial use.',
  },
  {
    question: 'Which AI does it use?',
    answer:
      'We currently use the Gemini or OpenRouter API to analyze and refine your prompts.',
  },
  {
    question: 'Can I use the output commercially?',
    answer:
      'Yes, but please verify the refined prompts before commercial use. We do not take responsibility for generated content.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#111111] text-white px-6 sm:px-10 py-40">
      <h1 className="text-4xl font-bold text-center mb-12 animate-fade-down">
        Frequently Asked Questions
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="glow-border transition-transform duration-300 hover:scale-[1.01]"
            onClick={() => toggle(index)}
          >
            <div className="glow-inner cursor-pointer">
              <h2 className="text-xl font-semibold">{faq.question}</h2>
              <p
                className={`text-white/80 mt-3 transition-all duration-300 ${
                  openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
