export const canUseDOM = typeof window !== "undefined";
export const supportsLocalStorage = canUseDOM && "localStorage" in window;
