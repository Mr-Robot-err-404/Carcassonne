'use client'

import Link from "next/link";
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
    useEffect(() => {
      
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col space-y-5 justify-center items-center h-screen bg-slate-800">
        <h3 className="text-4xl text-white">Something went wrong...</h3>
        <Link href={'/'}>
            <button type="button" className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">
                Go Home
            </button>
        </Link>
    </div>
  );
}