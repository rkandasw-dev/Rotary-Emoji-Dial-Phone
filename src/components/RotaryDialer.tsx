import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotaryDial } from './RotaryDial';
import { DialedEmojis } from './DialedEmojis';
import { ResponseCard } from './ResponseCard';
import { getResponse } from '../utils/responses';
export function RotaryDialer() {
  const [dialedEmojis, setDialedEmojis] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [showInstruction, setShowInstruction] = useState(true);
  // Auto-process after 5 emojis
  useEffect(() => {
    if (dialedEmojis.length >= 5 && !isProcessing && !response) {
      processDialing();
    }
  }, [dialedEmojis]);
  const handleDial = (emoji: string) => {
    if (showInstruction) setShowInstruction(false);
    // Add emoji
    const newEmojis = [...dialedEmojis, emoji];
    setDialedEmojis(newEmojis);
    // Random chance to process early (between 3-5 emojis)
    if (newEmojis.length >= 3 && Math.random() > 0.7) {
      processDialing();
    }
  };
  const processDialing = () => {
    setIsProcessing(true);
    // Simulate "connecting" time with pulsing lights
    setTimeout(() => {
      const result = getResponse(dialedEmojis);
      setResponse(result);
      setIsProcessing(false);
    }, 2000);
  };
  const handleReset = () => {
    setResponse(null);
    setDialedEmojis([]);
    setIsProcessing(false);
  };
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none vignette z-50" />

      {/* Background Ambient Light */}
      <motion.div
        className="fixed inset-0 bg-[#d4a574] pointer-events-none z-0 mix-blend-soft-light"
        animate={{
          opacity: isProcessing ? [0.02, 0.08, 0.02] : 0.02
        }}
        transition={{
          duration: isProcessing ? 1.5 : 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />


      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        {/* Header */}
        <motion.header
          initial={{
            opacity: 0,
            y: -20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1,
            delay: 0.5
          }}
          className="mb-12 text-center">

          <h1 className="text-[#d4a574] font-serif tracking-[0.2em] text-sm md:text-base uppercase opacity-80">
            Midnight Dial
          </h1>
        </motion.header>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {!response ?
          <motion.div
            key="dialer"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              filter: 'blur(10px)'
            }}
            transition={{
              duration: 0.5
            }}
            className="flex flex-col items-center w-full">

              {/* Dialed Emojis Display */}
              <DialedEmojis emojis={dialedEmojis} />

              {/* The Rotary Phone Dial */}
              <div className="relative my-8">
                {/* Processing Glow Pulse */}
                {isProcessing &&
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8
                }}
                animate={{
                  opacity: [0, 0.4, 0.1, 0.5, 0],
                  scale: [0.9, 1.1, 1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                className="absolute inset-0 rounded-full bg-[#d4a574] blur-3xl -z-10" />

              }

                <RotaryDial
                onDial={handleDial}
                isLocked={isProcessing || dialedEmojis.length >= 5} />

              </div>

              {/* Instruction Text */}
              <motion.p
              animate={{
                opacity: showInstruction ? 0.4 : 0
              }}
              className="mt-8 text-[#f0d9b5] font-serif text-sm italic tracking-wide">

                Click a slot to dial...
              </motion.p>
            </motion.div> :

          <ResponseCard
            key="response"
            response={response}
            onReset={handleReset} />

          }
        </AnimatePresence>
      </div>
    </div>);

}