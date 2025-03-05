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
      description: "Transparent, whitish cloud veil of fibrous or smooth appearance",
      altitude: "High altitude: 20,000-40,000 ft",
      characteristics: [
        "Often produces halo phenomena",
        "Indicates approaching precipitation",
        "Covers entire sky"
      ],
      colorClass: "text-blue-800",
      position: { top: "5%", right: "20%" }
    },
    "Cirrus": {
      name: "Cirrus (Ci)",
      description: "Detached clouds of delicate and fibrous appearance",
      altitude: "High altitude: 20,000-40,000 ft",
      characteristics: [
        "Often called mare's tails",
        "Made of ice crystals",
        "Indicates fair weather"
      ],
      colorClass: "text-blue-300",
      position: { top: "22%", left: "30%" }
    },
    "Cirrocumulus": {
      name: "Cirrocumulus (Cc)",
      description: "Thin, white patch of clouds without shadows",
      altitude: "High altitude: 20,000-40,000 ft",
      characteristics: [
        "Rippled pattern",
        "Small rounded puffs",
        "Rare cloud type"
      ],
      colorClass: "text-blue-300",
      position: { top: "25%", right: "10%" }
    },
    "Altostratus": {
      name: "Altostratus (As)",
      description: "Grayish or bluish cloud sheets",
      altitude: "Middle altitude: 6,500-20,000 ft",
      characteristics: [
        "Sun appears dimly visible",
        "Often produces precipitation",
        "Covers large areas"
      ],
      colorClass: "text-orange-800",
      position: { top: "50%", right: "20%" }
    },
    "Nimbostratus": {
      name: "Nimbostratus (Ns)",
      description: "Dark gray, wet looking cloudy layer",
      altitude: "Middle altitude: 6,500-20,000 ft",
      characteristics: [
        "Continuous rain or snow",
        "Very thick and dark",
        "Sun completely hidden"
      ],
      colorClass: "text-orange-800",
      position: { top: "65%", left: "30%" }
    },
    "Altocumulus": {
      name: "Altocumulus (Ac)",
      description: "White or gray patches of clouds",
      altitude: "Middle altitude: 6,500-20,000 ft",
      characteristics: [
        "Composed of water droplets",
        "Regularly arranged elements",
        "May indicate thunderstorm development"
      ],
      colorClass: "text-orange-800",
      position: { bottom: "30%", right: "10%" }
    },
    "Cumulonimbus": {
      name: "Cumulonimbus (Cb)",
      description: "Heavy and dense cloud, considerable vertical extent",
      altitude: "Low altitude: surface-6,500 ft",
      characteristics: [
        "Thunderstorm cloud",
        "Produces heavy precipitation",
        "May have anvil-shaped top"
      ],
      colorClass: "text-green-800",
      position: { bottom: "10%", left: "1%" }
    },
    "Stratus": {
      name: "Stratus (St)",
      description: "Uniform grayish cloud layer",
      altitude: "Low altitude: surface-6,500 ft",
      characteristics: [
        "May produce drizzle",
        "Creates overcast conditions",
        "Often appears in morning"
      ],
      colorClass: "text-green-200",
      position: { bottom: "1%", left: "35%" }
    },
    "Cumulus": {
      name: "Cumulus (Cu)",
      description: "Detached, dense clouds with sharp outlines",
      altitude: "Low altitude: surface-6,500 ft",
      characteristics: [
        "Fair weather clouds",
        "Cotton-like appearance",
        "Develops during heating of day"
      ],
      colorClass: "text-green-800",
      position: { bottom: "1%", right: "30%" }
    },
    "Stratocumulus": {
      name: "Stratocumulus (Sc)",
      description: "Gray or whitish cloud patches or layers",
      altitude: "Low altitude: surface-6,500 ft",
      characteristics: [
        "Often appears as cellular pattern",
        "May produce light precipitation",
        "Common in winter"
      ],
      colorClass: "text-green-800",
      position: { bottom: "5%", right: "07%" }
    }
  };