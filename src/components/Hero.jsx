import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section className="relative w-full h-[360px] md:h-[460px] rounded-3xl overflow-hidden bg-gradient-to-br from-pink-100 via-indigo-100 to-teal-100">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/80 via-white/30 to-transparent" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 drop-shadow-sm">
          30-Day Challenge Tracker
        </h1>
        <p className="mt-3 md:mt-4 max-w-2xl text-slate-600 text-sm md:text-base">
          Build habits the fun way. Create a challenge, mark daily progress, and celebrate when you hit 30 days!
        </p>
      </div>
    </section>
  );
};

export default Hero;
