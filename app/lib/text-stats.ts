export type TextStats = {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingMinutes: number;
  speakingMinutes: number;
};

const WORDS_PER_MINUTE_READING = 225;
const WORDS_PER_MINUTE_SPEAKING = 130;

export function textStats(text: string): TextStats {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const sentences = trimmed ? (trimmed.match(/[^.!?]+[.!?]+|\S+$/g)?.length ?? 0) : 0;
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;

  return {
    words,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    sentences,
    paragraphs,
    readingMinutes: words / WORDS_PER_MINUTE_READING,
    speakingMinutes: words / WORDS_PER_MINUTE_SPEAKING,
  };
}
