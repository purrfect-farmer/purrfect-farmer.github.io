// Type declarations for vite-imagetools
declare module "*?format=webp" {
  const src: string;
  export default src;
}

declare module "*?format=webp&h=480" {
  const src: string;
  export default src;
}

declare module "*&as=meta:src;width;height" {
  const image: { src: string; width: number; height: number };
  export default image;
}
