'use client';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-8 pt-52 pb-32 bg-gradient-to-br from-black to-[#0b0b0b] text-white overflow-visible">
      <div className="absolute w-[400px] h-[400px] bg-purple-500 rounded-full blur-3xl opacity-20 -z-10 top-10 left-1/2 transform -translate-x-1/2 animate-blob" />

      {/* Main Content */}
      <div className="opacity-0 translate-y-4 animate-fade-up">
        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-10 leading-[1.25] relative z-10">
          ZENO
        </h1>
        <p className="max-w-3xl text-balance text-lg sm:text-xl text-white/70 leading-relaxed font-light mb-6">
          From vague ideas to <span className="text-cyan-400 font-semibold">vivid prompts</span> — Zeno helps you shape your thoughts into <span className="text-purple-400 font-semibold">AI-ready instructions</span>.
        </p>
        <p className="text-sm text-white/40">
          Trusted by prompt engineers, indie devs, and curious minds worldwide.
        </p>

        <div className="mt-12 animate-bounce text-white/50 text-2xl">↓</div>
      </div>
    </section>
  );
}
