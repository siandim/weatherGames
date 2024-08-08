// import { useEffect, useRef } from 'react';

// type PrecipitationType = {
//   x: number;
//   y: number;
//   w: number;
//   h: number;
// };

// type BackgroundType = {
//   x: number;
//   y: number;
//   w: number;
//   h: number;
// };

// class PRETClass {
//   // Variables for precipitation types and their properties
//   snowflake: PrecipitationType | undefined;
//   raindrop!: PrecipitationType;
//   drizzle!: PrecipitationType;
//   sleet!: PrecipitationType;
//   snowgrain!: PrecipitationType;
//   supercooled!: PrecipitationType;
//   freezing!: PrecipitationType;
//   background!: BackgroundType[];
//   hydroX!: number[];
//   hydroY!: number[];
//   hydroType!: number[];
//   hydroLayer!: number[];
//   hydroActive!: boolean[];
//   xAccum!: number[];
//   yAccum!: number[];
//   hydroAccum!: number[];
//   inxAccum!: number;
//   dcan!: HTMLCanvasElement;
//   bi!: HTMLImageElement;
//   action: any;
//   ctxe!: CanvasRenderingContext2D;
//   ctx!: CanvasRenderingContext2D;
//   mainCan!: HTMLCanvasElement;

//   // Y positions and X positions for dry and wet bulb temperatures
//   yp = [117., 290., 375., 450.];
//   xpDry = [360., 440., 520., 550.];
//   xpWet = [350., 420., 500., 490.];

//   // Flags and indices for dragging operations
//   previousActiveHydroType = -1;
//   isDragging = false;
//   dragWetBulb = false;
//   dragDryBulb = false;
//   dragIndex = 0;

//   // Constants for different atmospheric layers
//   CLOUD = 0;
//   MID = 1;
//   LOW = 2;
//   GND = 3;
//   GROUND = 440.;
//   CLOUDBASE = 220.;
//   MINX = 320;
//   MAXX = 600;
//   DIST = 20.;
//   MAXHYDROS = 100;
//   YINC = 4;

//   // Constants for precipitation types
//   SNOW = 0;
//   RAIN = 1;
//   DRIZZLE = 2;
//   SLEET = 3;
//   PELLETS = 4;
//   SUPERCOOLED = 5;
//   FREEZING = 6;

//   // Cross-browser requestAnimationFrame
//   requestAnimationFrame = window.requestAnimationFrame ||
//     window.requestAnimationFrame ||
//     window.requestAnimationFrame ||
//     window.requestAnimationFrame ||
//     function (cb: FrameRequestCallback) {
//       setTimeout(cb, 10);
//     };

//   constructor() {
//     this.setup();
//   }

//   // Initial setup function to create canvases and load images
//   setup() {
//     // Initialize arrays for precipitation data
//     this.hydroX = new Array(this.MAXHYDROS);
//     this.hydroY = new Array(this.MAXHYDROS);
//     this.hydroType = new Array(this.MAXHYDROS);
//     this.hydroLayer = new Array(this.MAXHYDROS);
//     this.hydroActive = new Array(this.MAXHYDROS);

//     this.xAccum = new Array(this.MAXHYDROS);
//     this.yAccum = new Array(this.MAXHYDROS);
//     this.hydroAccum = new Array(this.MAXHYDROS);
//     this.inxAccum = -1;

//     // Background image sections
//     this.background = [
//       { x: 638, y: 2, w: 634, h: 475 },
//       { x: 1274, y: 2, w: 634, h: 475 },
//       { x: 2, y: 479, w: 634, h: 475 },
//       { x: 638, y: 479, w: 634, h: 475 },
//       { x: 2, y: 2, w: 634, h: 475 }
//     ];

//     // Initialize images for different precipitation types
//     this.snowflake = { x: 1325, y: 479, w: 17, h: 17 };
//     this.raindrop = { x: 1300, y: 479, w: 12, h: 19 };
//     this.drizzle = { x: 1274, y: 479, w: 5, h: 9 };
//     this.sleet = { x: 1314, y: 479, w: 9, h: 10 };
//     this.snowgrain = { x: 1344, y: 479, w: 9, h: 10 };
//     this.supercooled = { x: 1355, y: 479, w: 5, h: 5 };
//     this.freezing = { x: 1281, y: 479, w: 17, h: 4 };

//     // Create a canvas for drawing precipitation
//     this.dcan = document.createElement("canvas");
//     this.dcan.height = 475;
//     this.dcan.width = 634;
//     this.ctxe = this.dcan.getContext("2d") as CanvasRenderingContext2D;

//     // Get the main canvas and its context for drawing
//     this.mainCan = document.getElementById("mycan") as HTMLCanvasElement;
//     this.ctx = this.mainCan.getContext("2d") as CanvasRenderingContext2D;
//     this.ctx.font = "10pt arial";
//     this.ctx.fillStyle = "rgba(100,100,0,1.0)";
//     this.ctx.strokeStyle = "rgba(250,250,0,1.0)";

//     // Initialize dragging functionality
//     // this.action = new PEvs(this.mainCan, null, this.mouseUp, null, this.mouseDrag, null, null);

//     // Load the image for precipitation types
//     this.bi = new Image();
//     this.bi.onload = () => {
//       this.clear();
//     }
//     this.bi.src = "pimages.png";
//   }

//   // Clear the canvas and reset precipitation data
//   clear() {
//     this.initializeAllHydros(); // Reset precipitation data
//     this.run(); // Start the animation
//   }

//   // Initialize all precipitation particles
//   initializeAllHydros() {
//     for (let i = 0; i < this.MAXHYDROS; i++) {
//       this.initializeOneHydro(i); // Initialize each particle
//       this.hydroY[i] = this.CLOUDBASE - this.CLOUDBASE * Math.random(); // Random Y position
//       this.hydroAccum[i] = -1;  // Flag that it is not accumulated
//     }

//     // Reset dragging state
//     this.dragDryBulb = false;
//     this.dragWetBulb = false;
//     this.isDragging = false;
//     this.dragIndex = 0;
//   }

//   // Initialize a single precipitation particle
//   initializeOneHydro(i: number) {
//     this.hydroX[i] = 30. + this.CLOUDBASE * Math.random(); // Random X position
//     this.hydroY[i] = this.CLOUDBASE; // Set Y coordinate
//     this.hydroLayer[i] = 0;
//     this.hydroActive[i] = true;

//     // Determine if the precipitation particle is active based on relative humidity
//     const diff = this.computeRH(0);
//     let rh = diff;
//     if (diff < .97) rh = .40;
//     if (diff < .94) rh = .10;
//     if (diff < .90) rh = 0.0;

//     if (Math.random() >= rh) this.hydroActive[i] = false;

//     // Determine the type of precipitation based on temperature
//     const t = this.xToT(this.xpDry[0]);
//     const tw = this.xToT(this.xpWet[0]);
//     const liq = this.DRIZZLE;

//     if (t < -20.0) {
//       this.hydroType[i] = this.SNOW;
//     } else if (t < -15.0) {
//       this.hydroType[i] = (Math.random() < .9) ? this.SNOW : this.SUPERCOOLED;
//     } else if (t < -10.0) {
//       this.hydroType[i] = (Math.random() < .7) ? this.SNOW : this.SUPERCOOLED;
//     } else if (t < -4.0 && tw < -9.0) {
//       this.hydroType[i] = (Math.random() < .1) ? this.SNOW : this.SUPERCOOLED;
//     } else if (t < 0.) {
//       this.hydroType[i] = this.SUPERCOOLED;
//     } else {
//       this.hydroType[i] = liq;
//     }
//   }

//   // Compute the relative humidity
//   computeRH(i: number) {
//     const e = Math.exp(5423. * (.003663 - 1. / (this.xToT(this.xpWet[i]) + 273.)));
//     const em = Math.exp(5423. * (.003663 - 1. / (this.xToT(this.xpDry[i]) + 273.)));
//     const rh = e / em;
//     return rh;
//   }

//   // Convert X coordinate to temperature
//   xToT(x: number) {
//     const t = (x - this.MINX) * .2 - 60.;
//     return t;
//   }

//   // Handle mouse drag events
//   mouseDrag(x: number, y: number) {
//     // Logic for handling mouse drag events on temperature lines
//   }

//   // Handle mouse up events
//   mouseUp(x: number, y: number) {
//     // Logic for handling mouse up events after dragging
//   }

//   // Start the animation
//   run() {
//     // Logic for starting the animation loop
//     this.requestAnimationFrame(() => this.run());
//   }
// }

// const PRET = new PRETClass();

// const Home = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       PRET.setup();
//     }
//   }, []);

//   return (
//     <div>
//       <canvas id="mycan" ref={canvasRef} width="634" height="475"></canvas>
//     </div>
//   );
// };

// export default Home;
