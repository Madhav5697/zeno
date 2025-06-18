'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PromptPair {
  original: string;
  refined: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<PromptPair[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('prompt_history') || '[]');
    setHistory(stored);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#111111] text-white">
      {/* Header */}
      <header className="w-full px-6 sm:px-12 py-5 flex justify-between items-center bg-black/30 backdrop-blur-md fixed top-0 z-50 border-b border-white/10">
        <nav className="flex space-x-6 text-white/80 text-sm font-medium">
          <Link href="/dashboard" className="hover:text-white transition">Home</Link>
          <Link href="/faq" className="hover:text-white transition">FAQ</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
          <Link href="/history" className="hover:text-white transition font-semibold text-white">History</Link>
        </nav>
        <div className="text-white text-sm font-medium">
          Welcome, <span className="font-semibold text-purple-400">Madhav</span>
        </div>
      </header>

      {/* Main */}
      <main className="pt-32 px-6 sm:px-12 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-white">
          Your Prompt History
        </h1>

        {history.length === 0 ? (
          <p className="text-center text-white/60 text-lg mt-12">
            There is no history.
          </p>
        ) : (
          <ul className="space-y-6">
            {history.map((entry, index) => (
              <li
                key={index}
                className="bg-white/5 p-6 rounded-2xl shadow-md hover:scale-[1.01] transition-all duration-300"
              >
                <p className="text-sm text-white/60 mb-1">Original Prompt</p>
                <p className="text-base text-white font-semibold mb-4">{entry.original}</p>
                <p className="text-sm text-white/60 mb-1">Refined Prompt</p>
                <p className="text-white/80 leading-relaxed">{entry.refined}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Broke Message */}
        <div className="text-center text-sm text-purple-300 font-light mt-16 px-4 sm:px-0 italic">
          I&apos;m broke asf and can&apos;t afford a database to store history. Peace out ✌️
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-white/70 text-sm py-8 border-t border-white/10 mt-10 px-4 sm:px-0">
        <p className="mb-2">
          Made by <span className="text-white font-medium">Madhav Ariaktota</span>
        </p>
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
