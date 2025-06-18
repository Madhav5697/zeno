'use client';

import { useEffect } from 'react';

export default function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
      <div className="bg-white/5 text-white px-6 py-4 rounded-lg shadow-xl border border-white/10 backdrop-blur-xl animate-popup pointer-events-auto">
        {message}
      </div>
    </div>
  );
}
