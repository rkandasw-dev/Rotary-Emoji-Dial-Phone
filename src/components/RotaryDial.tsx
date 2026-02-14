import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { EMOJIS, EmojiDef } from '../utils/responses';
interface RotaryDialProps {
  onDial: (emoji: string) => void;
  isLocked: boolean;
}
export function RotaryDial({ onDial, isLocked }: RotaryDialProps) {
  const [isRotating, setIsRotating] = useState(false);
  const controls = useAnimation();
  // Configuration
  const DIAL_SIZE = 320;
  const RADIUS = 110; // Radius for emoji placement
  const SLOT_RADIUS = 28; // Size of the finger holes
  // Calculate positions for 9 emojis
  // Standard rotary phone has 10 holes. We use 9.
  // The "stop" is usually around 4-5 o'clock position.
  // Let's place emojis from roughly 1 o'clock to 9 o'clock clockwise.
  // Angle 0 is 3 o'clock in standard math.
  // We want the STOP to be at roughly 60 degrees (bottom right).
  const STOP_ANGLE = 60;
  // Calculate angles for each emoji slot
  // We'll distribute them starting from roughly -30 deg (top right) and going counter-clockwise
  // Actually, on a real phone, 1 is at top right, 0 is at bottom middle.
  // Let's place them evenly.
  const ANGLE_STEP = 30;
  const START_ANGLE = -45; // Top right-ish
  const getSlotAngle = (index: number) => START_ANGLE - index * ANGLE_STEP;
  const handleSlotClick = async (emoji: EmojiDef, index: number) => {
    if (isLocked || isRotating) return;
    setIsRotating(true);
    // Calculate how much we need to rotate to hit the stop
    // Current position is getSlotAngle(index)
    // We want this position to rotate TO the STOP_ANGLE
    // So rotation amount = STOP_ANGLE - currentAngle
    const currentAngle = getSlotAngle(index);
    const rotationNeeded = STOP_ANGLE - currentAngle;
    // 1. Rotate to stop (Heavy, mechanical feel)
    await controls.start({
      rotate: rotationNeeded,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1] // Custom heavy easing
      }
    });
    // Trigger the dial action when it hits the stop
    onDial(emoji.char);
    // Small delay at the stop
    await new Promise((resolve) => setTimeout(resolve, 100));
    // 2. Spring back to original position (Mechanical return)
    await controls.start({
      rotate: 0,
      transition: {
        type: 'spring',
        mass: 2.5,
        stiffness: 80,
        damping: 25,
        restDelta: 0.001
      }
    });
    setIsRotating(false);
  };
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: DIAL_SIZE,
        height: DIAL_SIZE
      }}>

      {/* Base Body (Static background behind dial) */}
      <div
        className="absolute inset-0 rounded-full bg-[#151922] shadow-2xl border-4 border-[#0f1219]"
        style={{
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
        }} />


      {/* Center Label / Decoration */}
      <div className="absolute z-0 w-32 h-32 rounded-full bg-[#1a1f2e] flex items-center justify-center border border-[#d4a574]/10">
        <div className="w-24 h-24 rounded-full border border-[#d4a574]/20 opacity-50" />
        <div className="absolute text-[#d4a574]/20 font-serif text-xs tracking-widest uppercase">
          Midnight
        </div>
      </div>

      {/* The Rotating Dial */}
      <motion.div
        animate={controls}
        className="absolute inset-0 z-10 rounded-full pointer-events-none"
        style={{
          background:
          'radial-gradient(transparent 55%, rgba(212, 165, 116, 0.05) 56%, rgba(20, 24, 32, 0.95) 60%)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>

        {/* Render Emoji Slots */}
        {EMOJIS.map((emoji, index) => {
          const angle = getSlotAngle(index);
          // Convert polar to cartesian
          // x = r * cos(theta)
          // y = r * sin(theta)
          const rad = angle * Math.PI / 180;
          const x = Math.cos(rad) * RADIUS;
          const y = Math.sin(rad) * RADIUS;
          return (
            <motion.button
              key={emoji.char}
              onClick={() => handleSlotClick(emoji, index)}
              className="absolute w-14 h-14 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer group focus:outline-none"
              style={{
                left: `calc(50% + ${x}px - ${SLOT_RADIUS}px)`,
                top: `calc(50% + ${y}px - ${SLOT_RADIUS}px)`
              }}
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.95
              }}
              aria-label={`Dial ${emoji.label} emoji`}
              disabled={isLocked || isRotating}>

              {/* Slot Background (Hole) */}
              <div className="absolute inset-0 rounded-full bg-[#0f1219] border-2 border-[#d4a574]/30 shadow-inner group-hover:border-[#d4a574] group-hover:shadow-[0_0_15px_rgba(212,165,116,0.3)] transition-all duration-300" />

              {/* Emoji */}
              <span className="relative z-10 text-2xl filter drop-shadow-md group-hover:brightness-110 transition-all">
                {emoji.char}
              </span>
            </motion.button>);

        })}
      </motion.div>

      {/* Finger Stop (Static) */}
      <div
        className="absolute z-20 w-8 h-12 bg-gradient-to-b from-[#d4a574] to-[#8c6b4a] rounded-sm shadow-lg"
        style={{
          top: '50%',
          left: '50%',
          transform: `rotate(${STOP_ANGLE}deg) translate(${RADIUS + 15}px, 0) rotate(-${STOP_ANGLE}deg)`
          // Adjust position to be just outside the slots path
        }}>

        <div className="w-full h-full bg-gradient-to-r from-black/20 to-transparent" />
      </div>

      {/* Chrome Ring Detail */}
      <div className="absolute inset-0 rounded-full border border-[#d4a574]/10 pointer-events-none" />
      <div className="absolute inset-2 rounded-full border border-[#ffffff]/5 pointer-events-none" />
    </div>);

}