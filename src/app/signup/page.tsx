'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Toast from '../../../components/Toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 6) {
      setToastMsg('Password must be at least 6 characters.');
      setShowToast(true);
      return;
    }

    if (password !== confirmPassword) {
      setToastMsg('Passwords do not match');
      setShowToast(true);
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setToastMsg(error.message);
      setShowToast(true);
    } else {
      setToastMsg('Signup successful! Check your email.');
      setShowToast(true);
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#111111]">
      {/* Header */}
      <header className="w-full px-6 sm:px-12 py-5 flex justify-between items-center bg-black/30 backdrop-blur-md fixed top-0 z-50 border-b border-white/10 animate-fade-down shadow-sm transition-all duration-700">
        <nav className="flex space-x-6 text-white/80 text-sm font-medium">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/faq" className="hover:text-white transition">FAQ</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
        </nav>
        <div className="flex space-x-4">
          <Link href="/login" className="px-4 py-2 text-sm text-white border border-white/20 rounded hover:bg-white/10 transition">
            Login
          </Link>
          <button className="px-4 py-2 text-sm text-black bg-white rounded hover:bg-gray-200 transition">
            Sign Up
          </button>
        </div>
      </header>

      {/* Signup Form */}
      <main className="flex items-center justify-center pt-40 pb-24 px-6 sm:px-10">
        <div className="glow-border w-full max-w-md">
          <div className="glow-inner">
            <h2 className="text-4xl font-bold text-center text-white mb-8">Create an Account</h2>
            <form onSubmit={handleSignup} className="space-y-6">
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input"
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input pr-12"
                />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5 text-white/60 hover:text-white" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-white/60 hover:text-white" />
                  )}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="glass-input pr-12"
                />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5 text-white/60 hover:text-white" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-white/60 hover:text-white" />
                  )}
                </span>
              </div>
              <button type="submit" className="glass-button gradient-button">
                Sign Up
              </button>
            </form>
            <p className="text-sm text-white/50 text-center mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-white underline hover:text-cyan-400 transition">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </main>

      {showToast && <Toast message={toastMsg} onClose={() => setShowToast(false)} />}
    </div>
  );
}
