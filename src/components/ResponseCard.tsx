import React from 'react';
import { motion } from 'framer-motion';
import { PhoneOffIcon } from 'lucide-react';
interface ResponseCardProps {
  response: string;
  onReset: () => void;
}
export function ResponseCard({ response, onReset }: ResponseCardProps) {
  // Split response into words for staggered animation
  const words = response.split(' ');
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        y: 20
      }}
      transition={{
        duration: 0.8,
        ease: 'easeOut'
      }}
      className="relative w-full max-w-lg mx-auto mt-8 p-8 md:p-12 bg-[#1a1f2e] border border-[#d4a574]/20 rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">

      {/* Ambient glow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#d4a574]/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4a574]/40 to-transparent" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-8 font-serif text-2xl md:text-3xl leading-relaxed text-[#f0d9b5] text-glow">
          {words.map((word, i) =>
          <motion.span
            key={i}
            initial={{
              opacity: 0,
              filter: 'blur(4px)'
            }}
            animate={{
              opacity: 1,
              filter: 'blur(0px)'
            }}
            transition={{
              delay: i * 0.08 + 0.5,
              duration: 0.6
            }}
            className="inline-block mr-[0.25em]">

              {word}
            </motion.span>
          )}
        </div>

        <motion.button
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: words.length * 0.08 + 1.5,
            duration: 1
          }}
          onClick={onReset}
          className="group flex items-center gap-3 px-6 py-3 mt-4 text-[#d4a574] hover:text-[#f0d9b5] transition-colors duration-300 border border-[#d4a574]/30 hover:border-[#d4a574]/60 rounded-full bg-[#0f1219]/50 hover:bg-[#d4a574]/10"
          aria-label="Hang up and reset">

          <PhoneOffIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-serif tracking-wider text-sm uppercase">
            Hang Up
          </span>
        </motion.button>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-[#d4a574]/40" />
      <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-[#d4a574]/40" />
      <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-[#d4a574]/40" />
      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-[#d4a574]/40" />
    </motion.div>);

}