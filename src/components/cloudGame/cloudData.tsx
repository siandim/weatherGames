export interface CloudData {
  name: string;
  description: string;
  altitude: string;
  characteristics: string[];
  colorClass: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

export const cloudData: Record<string, CloudData> = {
  "Cirrostratus": {
    name: "Cirrostratus (Cs)",
    description: "Thin, wispy clouds that cover the sky like a blanket.",
    altitude: "High up: 20,000-40,000 ft",
    characteristics: [
      "Can make a glowing ring around the sun or moon",
      "Means rain or snow might be coming",
      "Spreads across the whole sky"
    ],
    colorClass: "text-blue-800",
    position: { top: "5%", right: "20%" }
  },
  "Cirrus": {
    name: "Cirrus (Ci)",
    description: "Thin, feathery clouds high in the sky.",
    altitude: "High up: 20,000-40,000 ft",
    characteristics: [
      "Look like horse tails in the sky",
      "Made of tiny ice crystals",
      "Usually means nice weather"
    ],
    colorClass: "text-blue-300",
    position: { top: "22%", left: "30%" }
  },
  "Cirrocumulus": {
    name: "Cirrocumulus (Cc)",
    description: "Small, puffy clouds high in the sky.",
    altitude: "High up: 20,000-40,000 ft",
    characteristics: [
      "Look like ripples or fish scales",
      "Made of ice crystals",
      "Not very common"
    ],
    colorClass: "text-blue-300",
    position: { top: "25%", right: "10%" }
  },
  "Altostratus": {
    name: "Altostratus (As)",
    description: "Gray or blue clouds that spread across the sky.",
    altitude: "Middle height: 6,500-20,000 ft",
    characteristics: [
      "Makes the sun look like it's behind frosted glass",
      "Can bring rain or snow",
      "Covers big parts of the sky"
    ],
    colorClass: "text-orange-800",
    position: { top: "50%", right: "20%" }
  },
  "Nimbostratus": {
    name: "Nimbostratus (Ns)",
    description: "Thick, dark clouds that bring steady rain or snow.",
    altitude: "Middle height: 6,500-20,000 ft",
    characteristics: [
      "Brings long periods of rain or snow",
      "Very dark and heavy",
      "Covers the whole sky so you can’t see the sun"
    ],
    colorClass: "text-orange-800",
    position: { top: "65%", left: "30%" }
  },
  "Altocumulus": {
    name: "Altocumulus (Ac)",
    description: "White or gray clouds in small, round shapes.",
    altitude: "Middle height: 6,500-20,000 ft",
    characteristics: [
      "Looks like cotton balls in the sky",
      "Can mean storms might happen later",
      "Made of tiny water droplets"
    ],
    colorClass: "text-orange-800",
    position: { bottom: "30%", right: "10%" }
  },
  "Cumulonimbus": {
    name: "Cumulonimbus (Cb)",
    description: "Huge, tall clouds that bring thunderstorms.",
    altitude: "Low to high: surface-6,500 ft",
    characteristics: [
      "Makes thunder, lightning, and heavy rain",
      "Can grow very tall like a tower",
      "Top can spread out like an anvil"
    ],
    colorClass: "text-green-800",
    position: { bottom: "10%", left: "1%" }
  },
  "Stratus": {
    name: "Stratus (St)",
    description: "Flat, gray clouds that cover the sky like fog.",
    altitude: "Low down: surface-6,500 ft",
    characteristics: [
      "Can bring light rain or drizzle",
      "Makes the sky look dull and gray",
      "Often seen in the morning"
    ],
    colorClass: "text-green-200",
    position: { bottom: "1%", left: "35%" }
  },
  "Cumulus": {
    name: "Cumulus (Cu)",
    description: "Big, fluffy clouds that look like cotton.",
    altitude: "Low down: surface-6,500 ft",
    characteristics: [
      "Usually means nice weather",
      "White and puffy like cotton candy",
      "Forms when the sun heats the ground"
    ],
    colorClass: "text-green-800",
    position: { bottom: "1%", right: "30%" }
  },
  "Stratocumulus": {
    name: "Stratocumulus (Sc)",
    description: "Gray or white clouds in large, lumpy patches.",
    altitude: "Low down: surface-6,500 ft",
    characteristics: [
      "Can look like a honeycomb pattern",
      "Might bring light rain or drizzle",
      "Often seen in the winter"
    ],
    colorClass: "text-green-800",
    position: { bottom: "5%", right: "07%" }
  }
};
