'use client';

import React from 'react';
import Image from 'next/image';

const Preloader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-950">
    <Image src="/pl.gif" alt="Loading..." width={64} height={64} className="w-16 h-16" />
  </div>
);

export default Preloader;