interface Html2CanvasOptions {
  backgroundColor?: string | null;
  logging?: boolean;
  useCORS?: boolean;
  scale?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  scrollX?: number;
  scrollY?: number;
  windowWidth?: number;
  windowHeight?: number;
  ignoreElements?: (element: Element) => boolean;
}

interface Window {
  html2canvas?: (element: HTMLElement, options?: Html2CanvasOptions) => Promise<HTMLCanvasElement>;
}