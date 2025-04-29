'use client';

import dynamic from 'next/dynamic';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

export default function ClientCursorWrapper() {
  return <CustomCursor />;
}
