'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '../hero/Hero';
import Link from 'next/link';

const phrases = ['Enter your prompt here...', 'Enter your text here...'];

export default function Dashboard() {
  const [inputValue, setInputValue] = useState<string>('');
  const [placeholderText, setPlaceholderText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isFocused) return;
    let index = 0, subIndex = 0;
    let isDeleting = false;

    const interval = setInterval(() => {
      const currentPhrase = phrases[index];

      if (isDeleting) {
        setPlaceholderText(currentPhrase.substring(0, subIndex - 1));
        subIndex--;
        if (subIndex === 0) {
          isDeleting = false;
          index = (index + 1) % phrases.length;
        }
      } else {
        setPlaceholderText(currentPhrase.substring(0, subIndex + 1));
        subIndex++;
        if (subIndex === currentPhrase.length) {
          isDeleting = true;
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isFocused]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const previousRaw = JSON.parse(localStorage.getItem('prompt_history') || '[]');

    const previous = (previousRaw as string[]).map((item) => ({
      original: item,
      refined: `Refined: ${item.trim().replace(/a ai/g, 'an AI')}`,
    }));

    const newEntry = {
      original: inputValue,
      refined: `Refined: ${inputValue.trim().replace(/a ai/g, 'an AI')}`,
    };

    const updated = [newEntry, ...previous].slice(0, 20);
    localStorage.setItem('prompt_history', JSON.stringify(updated));

    const encodedPrompt = encodeURIComponent(inputValue);
    router.push(`/clarify?prompt=${encodedPrompt}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#111111] text-white">
      {/* Header */}
      <header className="w-full px-4 sm:px-8 py-4 flex justify-between items-center bg-black/30 backdrop-blur-md fixed top-0 z-50 border-b border-white/10 shadow-sm animate-fade-down">
        <nav className="flex space-x-4 text-white/80 text-sm font-medium">
          <Link href="/dashboard" className="hover:text-white transition">Home</Link>
          <Link href="/faq" className="hover:text-white transition">FAQ</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
          <Link href="/history" className="hover:text-white transition font-semibold">History</Link>
        </nav>
        <div className="text-white text-sm font-medium">
          Welcome, <span className="font-semibold text-purple-400">Madhav</span>
        </div>
      </header>

      <HeroSection />

      {/* Prompt Input */}
      <main className="flex flex-col items-center justify-center px-4 sm:px-8 pt-10 pb-24 sm:pb-36">
        <div
          className="max-w-4xl w-full"
          onMouseMove={(e) => {
            const card = e.currentTarget.querySelector('.glow-inner') as HTMLDivElement;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height / 2) / rect.height / 2) * 6;
            const rotateY = ((x - rect.width / 2) / rect.width / 2) * -6;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
          }}
          onMouseLeave={(e) => {
            const card = e.currentTarget.querySelector('.glow-inner') as HTMLDivElement;
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
          }}
        >
          <div className="glow-border animate-popup transition duration-500 ease-in-out">
            <div className="glow-inner transition-transform duration-300 ease-out">
              <h2 className="text-2xl sm:text-3xl font-semibold text-center text-purple-400 mb-10 animate-fade-up">
                Seriously bro, you can&apos;t even write your own prompt? You&apos;re cooked. Anyway, enter your vague prompt in the box below.
              </h2>

              <form className="relative space-y-6" onSubmit={handleSubmit}>
                {inputValue === '' && !isFocused && (
                  <span className="absolute top-[18px] left-[24px] text-white/50 pointer-events-none z-10">
                    {placeholderText}<span className="animate-pulse">|</span>
                  </span>
                )}
                <textarea
                  rows={10}
                  value={inputValue}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="glass-input h-[50vh] pt-5 relative z-20"
                />
                <button type="submit" className="glass-button gradient-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <div className="text-center text-sm sm:text-base text-purple-300 font-light mt-16 px-4 sm:px-0">
        kya dekhraha hein bey, it&apos;s end of the website — enter your prompt in the box.
      </div>

      <footer className="w-full text-center text-white/70 text-sm py-8 border-t border-white/10 mt-10 px-4 sm:px-0">
        <p className="mb-2">Made by <span className="text-white font-medium">Madhav Ariaktota</span></p>
        <a
          href="https://instagram.com/madhavarikatota"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          @madhavarikatota
        </a>
      </footer>
    </div>
  );
}
