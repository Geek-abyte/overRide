'use client';

import dynamic from 'next/dynamic';

// Dynamic import for Hero component with ThreeJS because it uses browser APIs
const HeroDynamic = dynamic(() => import('@/components/Hero'), { ssr: false });

export default function HeroWrapper() {
  return <HeroDynamic />;
}
