/**
 * High-speed Kruti Dev 010 / Devlys to Unicode Devanagari Hindi Converter
 */

const KRUTI_MODIFIED_MAP: [string, string][] = [
  ["ñ", "Z"],
  ["ò", "T"],
  ["ó", "S"],
  ["ô", "R"],
  ["õ", "Q"],
  ["ù", "W"],
  ["ø", "O"],
  ["÷", "X"],
  ["ö", "V"],
  ["ï", "I"],
  ["î", "H"],
  ["í", "G"],
  ["ì", "F"],
  ["ë", "E"],
  ["ê", "D"],
  ["é", "C"],
  ["è", "B"],
  ["ç", "A"],
  ["æ", "P"],
  ["å", "M"],
  ["ä", "L"],
  ["ã", "K"],
  ["â", "J"],
  ["á", "N"],
  ["à", "U"],
];

const KRUTI_TO_UNICODE_MAP: [string, string][] = [
  // Compound characters & halants
  ["‘", "'"],
  ["’", "'"],
  ["“", '"'],
  ["”", '"'],
  ["„", '"'],
  ["…", "..."],
  ["‰", "%"],
  ["‡", "ddh"],
  ["ˆ", "tt"],
  ["Š", "k"],
  ["Œ", "d"],
  ["Ž", "dd"],
  [" ", " "],
  ["!", "!"],
  ['"', '"'],
  ["#", "#"],
  ["$", "$"],
  ["%", "%"],
  ["&", "&"],
  ["'", "'"],
  ["(", "("],
  [")", ")"],
  ["*", "*"],
  ["+", "+"],
  [",", ","],
  ["-", "-"],
  [".", "."],
  ["/", "/"],
  ["0", "०"],
  ["1", "१"],
  ["2", "२"],
  ["3", "३"],
  ["4", "४"],
  ["5", "५"],
  ["6", "६"],
  ["7", "७"],
  ["8", "८"],
  ["9", "९"],
  [":", ":"],
  [";", ";"],
  ["<", "<"],
  ["=", "="],
  [">", ">"],
  ["?", "?"],
  ["@", "@"],

  // Consonants & Vowels
  ["k", "ा"],
  ["i", "ि"],
  ["h", "ी"],
  ["q", "ु"],
  ["w", "ू"],
  ["`", "ृ"],
  ["s", "े"],
  ["S", "ै"],
  ["a", "ं"],
  ["A", "ँ"],
  ["्", "्"],
  ["d", "क"],
  ["D", "क्"],
  ["[k", "ख"],
  ["[", "ख्"],
  ["x", "ग"],
  ["X", "ग्"],
  ["?k", "घ"],
  ["?", "घ्"],
  ["M", "ङ"],
  ["p", "च"],
  ["P", "च्"],
  ["N", "छ"],
  ["t", "ज"],
  ["T", "ज्"],
  ["T+", "ज़"],
  ["÷", "झ्"],
  ["÷k", "झ"],
  ["¥", "ञ"],
  ["V", "ट"],
  ["B", "ठ"],
  ["M+", "ड"],
  ["<+", "ढ"],
  [".", "."],
  ["M", "ड"],
  ["<", "ढ"],
  [".", "."],
  [";", "ण"],
  ["r", "त"],
  ["R", "त्"],
  ["F", "थ"],
  ["Fk", "थ"],
  ["n", "द"],
  ["/k", "ध"],
  ["/", "ध्"],
  ["u", "न"],
  ["U", "न्"],
  ["i", "ि"],
  ["i+", "ि"],
  ["iQ", "फ"],
  ["iQ+", "फ़"],
  ["iQ", "फ"],
  ["Q", "फ्"],
  ["c", "ब"],
  ["C", "ब्"],
  ["H", "भ"],
  ["Hk", "भ"],
  ["e", "म"],
  ["E", "म्"],
  [";", "य"],
  ["Y", "य्"],
  ["j", "र"],
  ["y", "ल"],
  ["Y", "ल्"],
  ["o", "व"],
  ["O", "व्"],
  ["'k", "श"],
  ["'", "श्"],
  ["\"", "ष्"],
  ["\"k", "ष"],
  ["l", "स"],
  ["L", "स्"],
  ["g", "ह"],
  ["{k", "क्ष"],
  ["{", "क्ष्"],
  ["=k", "त्र"],
  ["=", "त्र्"],
  ["K", "ज्ञ"],
  ["vk", "आ"],
  ["v", "अ"],
  ["b", "इ"],
  ["bZ", "ई"],
  ["m", "उ"],
  ["Å", "ऊ"],
  ["_k", "ऋ"],
  ["_", "ऋ"],
  ["G", "ऐ"],
  ["vks", "ओ"],
  ["vkS", "औ"],
  ["vks+", "ऑ"],
];

/**
 * Checks if a string has strong Kruti Dev patterns
 */
export function isLikelyKrutiDev(text: string): boolean {
  if (!text || text.length < 3) return false;
  const krutiWords = [
    "jktLFkku", // राजस्थान
    "leku", // समान
    "esa", // में
    "dk", // का
    "dh", // की
    "ds", // के
    "gS", // है
    "gSa", // हैं
    "dks", // को
    "fnukad", // दिनांक
    "lafgrk", // संहिता
    "izns'k", // प्रदेश
    "dksVk", // कोटा
    "izeq[k", // प्रमुख
    "vf/kdkjh", // अधिकारी
    "mDr", // उक्त
    "fo'ks" // विशेष
  ];
  return krutiWords.some((w) => text.includes(w));
}

/**
 * Converts legacy Kruti Dev / Devlys text to standard Unicode Devanagari Hindi
 */
export function convertKrutiDevToUnicode(krutiText: string): string {
  if (!krutiText) return "";

  let str = krutiText;

  // Substitute special characters
  for (const [k, u] of KRUTI_MODIFIED_MAP) {
    str = str.split(k).join(u);
  }

  // Handle common Hindi words direct translation for accuracy
  const COMMON_WORDS: [string, string][] = [
    ["jktLFkku", "राजस्थान"],
    ["leku", "समान"],
    ["ukxfjdrk", "नागरिकता"],
    ["lafgrk", "संहिता"],
    ["ykxw", "लागू"],
    ["djus", "करने"],
    ["gsrq", "हेतु"],
    ["QhMcSd", "फीडबैक"],
    ["fhKtokus", "भिजवाने"],
    ["ds", "के"],
    ["dk", "का"],
    ["dh", "की"],
    ["dks", "को"],
    ["esa", "में"],
    ["gS", "है"],
    ["gSa", "हैं"],
    ["fnukad", "दिनांक"],
    ["dksVk", "कोटा"],
    ["laHkkxh;", "संभागीय"],
    ["vk;qDr", "आयुक्त"],
    ["dk;kZy;", "कार्यालय"],
    ["mnns';", "उद्देश्य"],
    ["izns'k", "प्रदेश"],
    ["'kklu", "शासन"],
    ["lfpo", "सचिव"],
    ["izeq[k", "प्रमुख"],
    ["foHkkx", "विभाग"],
    ["vf/kdkjh", "अधिकारी"],
    ["mDr", "उक्त"],
    ["vf/kfu;e", "अधिनियम"],
    ["fu;e", "नियम"],
    ["fuosnu", "निवेदन"],
    ["Hkonh;", "भवदीय"],
    ["gLrk{kj", "हस्ताक्षर"],
  ];

  for (const [kw, uw] of COMMON_WORDS) {
    str = str.split(kw).join(uw);
  }

  // Handle 'i' matra (preceding vowel in Kruti Dev)
  let pos = str.indexOf("f");
  while (pos !== -1 && pos < str.length - 1) {
    const nextChar = str.charAt(pos + 1);
    str = str.substring(0, pos) + nextChar + "ि" + str.substring(pos + 2);
    pos = str.indexOf("f");
  }

  // Replace individual mappings
  for (const [k, u] of KRUTI_TO_UNICODE_MAP) {
    str = str.split(k).join(u);
  }

  return str;
}
