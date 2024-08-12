// Define interfaces for image and raindrop objects
export interface Images {
    src: string;
    name: string;
  }
  
  export interface Raindrop {
    x: number;
    y: number;
    speed: number;
    length: number;
    image: HTMLImageElement;
    layer: number;
  }
  
  export interface Precips {
    src: string;
    name: string;
    enable: boolean;
  }
  