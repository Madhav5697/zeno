import { Suspense } from 'react';
import ClarifyPage from './ClarifyPage';

export default function ClarifyWrapper() {
  return (
    <Suspense fallback={<div className="text-white text-center pt-40">Loading...</div>}>
      <ClarifyPage />
    </Suspense>
  );
}
