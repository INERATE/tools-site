import type Lenis from "lenis";

/** The single Lenis instance SmoothScroll owns — exposed so a modal can pause/resume it, since Lenis hijacks wheel events independently of native `overflow`. */
let instance: Lenis | null = null;

export function setLenisInstance(l: Lenis | null) {
  instance = l;
}

export function getLenisInstance() {
  return instance;
}
