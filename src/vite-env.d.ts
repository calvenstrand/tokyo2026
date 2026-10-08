/// <reference types="svelte" />
/// <reference types="vite/client" />

// vite-imagetools query imports (e.g. `photo.jpeg?w=280;560&format=webp&as=srcset`)
// resolve to a URL or a srcset string. The package ships no client typings.
declare module '*as=srcset' {
  const srcset: string
  export default srcset
}

declare module '*format=webp' {
  const src: string
  export default src
}
