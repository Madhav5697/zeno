'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import HeroSection from './hero/Hero';

const phrases = ['Enter your prompt here...', 'Enter your text here...'];

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isFocused) return;

    let index = 0;
    let subIndex = 0;
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
    const encodedPrompt = encodeURIComponent(inputValue);
    router.push(`/clarify?prompt=${encodedPrompt}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#111111] text-white">
      {/* Header */}
      <header className="w-full px-4 sm:px-8 py-4 sm:py-5 flex justify-between items-center bg-black/30 backdrop-blur-md fixed top-0 z-50 border-b border-white/10 animate-fade-down shadow-sm transition-all duration-700">
        <nav className="flex space-x-4 sm:space-x-6 text-white/80 text-sm font-medium">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/faq" className="hover:text-white">FAQ</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
        </nav>
        <div className="flex space-x-2 sm:space-x-4">
          <Link href="/login" className="px-3 sm:px-4 py-1 sm:py-2 text-sm text-white border border-white/20 rounded hover:bg-white/10 transition">Login</Link>
          <Link href="/signup" className="px-3 sm:px-4 py-1 sm:py-2 text-sm text-black bg-white rounded hover:bg-gray-200 transition">Sign Up</Link>
        </div>
      </header>

      {/* Hero */}
      <HeroSection />

      {/* Prompt Section */}
      <main className="flex flex-col items-center justify-center px-4 sm:px-10 pt-24 sm:pt-32 pb-24 sm:pb-36">
        <div
          className="max-w-4xl w-full mx-2 sm:mx-0"
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
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
          }}
        >
          <div className="glow-border animate-popup">
            <div className="glow-inner transition-transform duration-300 ease-out p-5 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-center text-purple-400 mb-10 animate-fade-up">
                Seriously bro, you can&apos;t even write your own prompt? You&apos;re cooked. Anyway, enter your vague prompt in the box below.
              </h2>

              <form className="relative space-y-6 flex flex-col" onSubmit={handleSubmit}>
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
                  className="glass-input min-h-[200px] sm:h-[50vh] pt-4 sm:pt-5 relative z-20 w-full"
                />
                <button type="submit" className="glass-button gradient-button">
  Submit
</button>

              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
