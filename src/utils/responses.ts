export type EmojiType = 'positive' | 'negative' | 'neutral' | 'chaotic';

export interface EmojiDef {
  char: string;
  type: EmojiType;
  label: string;
}

export const EMOJIS: EmojiDef[] = [
{ char: '🙂', type: 'positive', label: 'Smile' },
{ char: '😔', type: 'negative', label: 'Pensive' },
{ char: '😤', type: 'negative', label: 'Frustrated' },
{ char: '😵‍💫', type: 'chaotic', label: 'Dizzy' },
{ char: '😴', type: 'neutral', label: 'Sleepy' },
{ char: '✨', type: 'positive', label: 'Sparkles' },
{ char: '🌧️', type: 'negative', label: 'Rain' },
{ char: '🔥', type: 'positive', label: 'Fire' },
{ char: '💭', type: 'neutral', label: 'Thought' }];


const RESPONSES = {
  positive: [
  'That spark in your eye? The whole room can feel it.',
  'Some nights just hit different. This is one of the good ones.',
  "You're glowing brighter than the neon outside.",
  'Keep that fire burning. It looks good on you.',
  'The universe is winking back at you tonight.',
  'Savor this feeling like the last sip of good coffee.'],

  negative: [
  'The best conversations happen after midnight. Your feelings are valid.',
  'Every storm runs out of rain. Sit with it a while longer.',
  "The diner stays open all night. You don't have to figure it out right now.",
  "It's okay to not be okay. The stars shine brightest in the dark.",
  'Let it rain. Flowers need water to grow tomorrow.',
  "Heavy hearts make for deep roots. You're stronger than you know."],

  neutral: [
  "Life's a late-night playlist — some tracks hit hard, some make you dance.",
  'The best stories have a little rain and a little fire.',
  'Drifting is just another way of moving forward.',
  'Sometimes the best answer is just a comfortable silence.',
  "You're right where you need to be. Just breathe."],

  chaotic: [
  "The jukebox is playing your song, even if you can't quite hear it yet.",
  'Chaos is just order waiting to be understood.',
  'Spin the wheel again. The night is still young.',
  'Everything is spinning, but your feet are on the ground.']

};

export function getResponse(dialedEmojis: string[]): string {
  if (dialedEmojis.length === 0) return 'The line is silent...';

  let score = 0;
  let chaoticCount = 0;

  dialedEmojis.forEach((char) => {
    const def = EMOJIS.find((e) => e.char === char);
    if (!def) return;

    if (def.type === 'positive') score += 1;
    if (def.type === 'negative') score -= 1;
    if (def.type === 'chaotic') chaoticCount += 1;
  });

  // Determine category
  let category: keyof typeof RESPONSES = 'neutral';

  if (chaoticCount >= 2) {
    category = 'chaotic';
  } else if (score > 1) {
    category = 'positive';
  } else if (score < -1) {
    category = 'negative';
  } else {
    category = 'neutral';
  }

  // Get random response from category
  const options = RESPONSES[category];
  return options[Math.floor(Math.random() * options.length)];
}