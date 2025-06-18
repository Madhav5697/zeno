'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

export default function ClarifyPage() {
  const searchParams = useSearchParams();
  const prompt = searchParams.get('prompt') || '';
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [errors, setErrors] = useState<boolean[]>([]);
  const [finalPrompt, setFinalPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  const phrases = ['Your answer here...', 'Enter your idea...'];
  const [placeholderText, setPlaceholderText] = useState(phrases[0]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isFocusedArray, setIsFocusedArray] = useState<boolean[]>([]);

  useEffect(() => {
    if (!prompt) return;

    const fetchFollowUps = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/clarify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });

        const data = await res.json();
        const limitedQuestions = (data.questions || []).slice(0, 4);
        setQuestions(limitedQuestions);
        setAnswers(new Array(limitedQuestions.length).fill(''));
        setIsFocusedArray(new Array(limitedQuestions.length).fill(false));
        setErrors(new Array(limitedQuestions.length).fill(false));
      } catch (error) {
        console.error('Error fetching from API:', error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowUps();
  }, [prompt]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let charIndex = 0;
    let typingForward = true;
    const typeInterval = setInterval(() => {
      const fullText = phrases[placeholderIndex];
      if (typingForward) {
        charIndex++;
        if (charIndex >= fullText.length) typingForward = false;
      } else {
        charIndex--;
        if (charIndex <= 0) {
          typingForward = true;
          setPlaceholderIndex((prev) => (prev + 1) % phrases.length);
        }
      }
      setPlaceholderText(fullText.substring(0, charIndex));
    }, 100);

    return () => clearInterval(typeInterval);
  }, [placeholderIndex]);

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);

    const updatedErrors = [...errors];
    if (value.trim() !== '') updatedErrors[index] = false;
    setErrors(updatedErrors);
  };

  const handleFocus = (index: number) => {
    const updated = [...isFocusedArray];
    updated[index] = true;
    setIsFocusedArray(updated);
  };

  const handleBlur = (index: number) => {
    const updated = [...isFocusedArray];
    updated[index] = false;
    setIsFocusedArray(updated);
  };

  const handleSubmit = async () => {
    const missing = answers.map((a) => a.trim() === '');
    setErrors(missing);

    if (missing.includes(true)) return;

    setGenerating(true);
    setFinalPrompt('');

    try {
      const res = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, answers }),
      });

      const data = await res.json();
      if (data.finalPrompt) {
        setFinalPrompt(data.finalPrompt);
      }
    } catch (error) {
      console.error('Error refining prompt:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#111111] text-white px-6 sm:px-10 py-40">
      <h1 className="text-4xl font-bold text-center mb-12 animate-fade-down">Clarify Your Prompt</h1>

      {loading ? (
        <p className="text-center text-white/70 animate-pulse">Thinking...</p>
      ) : (
        <>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white/90 mb-4 text-lg">Your original prompt:</p>
            <div className="bg-white/10 p-5 rounded-xl border border-white/10 text-white mb-12 text-lg">
              {prompt}
            </div>
          </div>

          {questions.length > 0 ? (
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center animate-fade-down">Follow-up Questions</h2>

              {questions.map((q, idx) => (
                <div
                  key={idx}
                  className="glow-border animate-popup transition-transform duration-300 ease-in-out"
                  onMouseMove={(e) => {
                    const card = e.currentTarget.querySelector('.glow-inner') as HTMLDivElement;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * 6;
                    const rotateY = ((x - centerX) / centerX) * -6;
                    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget.querySelector('.glow-inner') as HTMLDivElement;
                    card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
                  }}
                >
                  <div className="glow-inner transition-transform duration-300 ease-out">
                    <div className="mb-4 text-lg sm:text-xl font-medium leading-relaxed text-white">
                      {q}
                    </div>
                    <div className="relative">
                      {answers[idx] === '' && !isFocusedArray[idx] && (
                        <span className="absolute top-[13px] left-[20px] text-white/50 pointer-events-none z-10">
                          {placeholderText}<span className="animate-blink">|</span>
                        </span>
                      )}
                      <input
                        ref={(el) => (inputRefs.current[idx] = el)}
                        type="text"
                        value={answers[idx]}
                        onFocus={() => handleFocus(idx)}
                        onBlur={() => handleBlur(idx)}
                        onChange={(e) => handleInputChange(idx, e.target.value)}
                        className="glass-input relative z-20"
                      />
                      {errors[idx] && (
                        <p className="text-red-400 mt-2 text-sm">This field is required.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-10">
                <button
                  type="button"
                  className="glass-button gradient-button w-full"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-400">
              No questions generated. Try a different prompt.
            </p>
          )}

          {generating && !finalPrompt && (
            <p className="text-center text-white/70 animate-pulse mt-10">
              Generating your refined prompt...
            </p>
          )}

          {finalPrompt && (
            <div className="max-w-3xl mx-auto mt-12 p-6 rounded-xl bg-white/10 border border-white/10 text-white">
              <h3 className="text-xl font-semibold mb-2">Final Refined Prompt:</h3>
              <p className="whitespace-pre-line text-white/90">{finalPrompt}</p>
              <button
                className="mt-4 px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition"
                onClick={() => navigator.clipboard.writeText(finalPrompt)}
              >
                📋
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
