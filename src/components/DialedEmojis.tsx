import React from 'react';
import { motion } from 'framer-motion';
interface DialedEmojisProps {
  emojis: string[];
}
export function DialedEmojis({ emojis }: DialedEmojisProps) {
  return (
    <div className="h-24 flex items-center justify-center gap-4 mb-8 w-full max-w-md mx-auto overflow-hidden">
      {emojis.map((emoji, index) =>
      <motion.div
        key={`${emoji}-${index}`}
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.5
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
        className="relative group">

          <span className="text-4xl filter drop-shadow-lg select-none">
            {emoji}
          </span>

          {/* Amber underline glow */}
          <motion.div
          initial={{
            width: 0,
            opacity: 0
          }}
          animate={{
            width: '100%',
            opacity: 0.6
          }}
          transition={{
            delay: 0.2,
            duration: 0.5
          }}
          className="absolute -bottom-2 left-0 h-0.5 bg-[#d4a574] shadow-[0_0_8px_#d4a574] rounded-full" />


          {/* Subtle separator dot (except for last item) */}
          {index < emojis.length - 1 &&
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#d4a574] opacity-30" />
        }
        </motion.div>
      )}

      {emojis.length === 0 &&
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 0.4
        }}
        className="text-[#d4a574] font-serif italic text-lg tracking-wide">

          Dial your mood...
        </motion.div>
      }
    </div>);

}