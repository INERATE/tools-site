export interface FontOption {
  name: string;
  family: string;
  category: "popular" | "hindi" | "serif" | "mono" | "display" | "handwriting";
}

export const FONT_CATEGORIES = [
  { id: "popular", label: "⭐ Frequently Used / Popular" },
  { id: "hindi", label: "🇮🇳 Hindi & Indic (हिंदी फॉन्ट्स)" },
  { id: "serif", label: "🖋️ Serif & Editorial" },
  { id: "mono", label: "💻 Monospace & Code" },
  { id: "display", label: "🎨 Display & Modern" },
  { id: "handwriting", label: "✍️ Handwritten & Script" },
] as const;

export const AVAILABLE_FONTS: FontOption[] = [
  // Popular / Sans
  { name: "Poppins", family: "'Poppins', sans-serif", category: "popular" },
  { name: "Inter", family: "'Inter', sans-serif", category: "popular" },
  { name: "Roboto", family: "'Roboto', sans-serif", category: "popular" },
  { name: "Montserrat", family: "'Montserrat', sans-serif", category: "popular" },
  { name: "Open Sans", family: "'Open Sans', sans-serif", category: "popular" },
  { name: "Lato", family: "'Lato', sans-serif", category: "popular" },
  { name: "Helvetica / Arial", family: "Helvetica, Arial, sans-serif", category: "popular" },

  // Hindi & Indic
  { name: "Noto Sans Devanagari", family: "'Noto Sans Devanagari', 'Poppins', sans-serif", category: "hindi" },
  { name: "Tiro Devanagari Hindi", family: "'Tiro Devanagari Hindi', serif", category: "hindi" },
  { name: "Rozha One", family: "'Rozha One', serif", category: "hindi" },
  { name: "Yatra One", family: "'Yatra One', cursive", category: "hindi" },

  // Serif
  { name: "Times New Roman", family: "'Times New Roman', Times, Georgia, serif", category: "serif" },
  { name: "Playfair Display", family: "'Playfair Display', serif", category: "serif" },
  { name: "Merriweather", family: "'Merriweather', serif", category: "serif" },
  { name: "Lora", family: "'Lora', serif", category: "serif" },
  { name: "EB Garamond", family: "'EB Garamond', serif", category: "serif" },
  { name: "Cinzel", family: "'Cinzel', serif", category: "serif" },

  // Mono
  { name: "Fira Code", family: "'Fira Code', monospace", category: "mono" },
  { name: "Roboto Mono", family: "'Roboto Mono', monospace", category: "mono" },
  { name: "JetBrains Mono", family: "'JetBrains Mono', monospace", category: "mono" },
  { name: "Courier New", family: "'Courier New', Courier, monospace", category: "mono" },

  // Display
  { name: "Oswald", family: "'Oswald', sans-serif", category: "display" },
  { name: "Raleway", family: "'Raleway', sans-serif", category: "display" },
  { name: "Bebas Neue", family: "'Bebas Neue', sans-serif", category: "display" },

  // Handwriting
  { name: "Caveat", family: "'Caveat', cursive", category: "handwriting" },
  { name: "Dancing Script", family: "'Dancing Script', cursive", category: "handwriting" },
  { name: "Pacifico", family: "'Pacifico', cursive", category: "handwriting" },
];
