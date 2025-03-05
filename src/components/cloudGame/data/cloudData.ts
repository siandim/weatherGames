export interface CloudData {
    name: string
    description: string
    altitude: string
    characteristics: string[]
    colorClass: string
    position: {
      top?: string
      bottom?: string
      left?: string
      right?: string
    }
  }
  
  export const cloudData: Record<string, CloudData> = {
    Cirrostratus: {
      name: "Cirrostratus (Cs)",
      description: "Transparent, whitish cloud veil of fibrous or smooth appearance",
      altitude: "High altitude: 20,000-40,000 ft",
      characteristics: ["Often produces halo phenomena", "Indicates approaching precipitation", "Covers entire sky"],
      colorClass: "text-blue-600",
      position: { top: "5%", left: "20%" },
    },
    Cirrus: {
      name: "Cirrus (Ci)",
      description: "Detached clouds of delicate and fibrous appearance",
      altitude: "High altitude: 20,000-40,000 ft",
      characteristics: ['Often called "mare\'s tails"', "Made of ice crystals", "Indicates fair weather"],
      colorClass: "text-blue-600",
      position: { top: "15%", left: "40%" },
    },
    Cirrocumulus: {
      name: "Cirrocumulus (Cc)",
      description: "Thin, white patch or layer of clouds without shading",
      altitude: "High altitude: 20,000-40,000 ft",
      characteristics: ["Small roundish masses", "Rippled appearance", "Rarely seen in temperate latitudes"],
      colorClass: "text-blue-600",
      position: { top: "10%", right: "15%" },
    },
    Altostratus: {
      name: "Altostratus (As)",
      description: "Grayish or bluish cloud sheets or layers of striated or fibrous appearance",
      altitude: "Middle altitude: 6,500-23,000 ft",
      characteristics: ["Often covers entire sky", "Sun appears dimly visible", "May produce light precipitation"],
      colorClass: "text-orange-600",
      position: { top: "35%", right: "30%" },
    },
    Altocumulus: {
      name: "Altocumulus (Ac)",
      description: "White or gray patch, sheet, or layer of clouds",
      altitude: "Middle altitude: 6,500-23,000 ft",
      characteristics: [
        "Composed of laminae",
        "Sometimes in the form of rounded masses",
        "Elements are smaller than stratocumulus",
      ],
      colorClass: "text-orange-600",
      position: { top: "45%", right: "20%" },
    },
    Nimbostratus: {
      name: "Nimbostratus (Ns)",
      description: "Gray cloud layer, often dark, with a diffuse base",
      altitude: "Low to middle altitude: surface to 10,000 ft",
      characteristics: [
        "Associated with continuous rain or snow",
        "Thick enough to blot out the sun",
        "Often accompanied by lower ragged clouds",
      ],
      colorClass: "text-orange-600",
      position: { top: "45%", left: "30%" },
    },
    Stratocumulus: {
      name: "Stratocumulus (Sc)",
      description: "Gray or whitish patch, sheet, or layer of cloud",
      altitude: "Low altitude: below 6,500 ft",
      characteristics: [
        "Usually in groups, lines, or waves",
        "Composed of rounded masses or rolls",
        "Parts often have darker appearance",
      ],
      colorClass: "text-green-600",
      position: { bottom: "15%", right: "20%" },
    },
    Stratus: {
      name: "Stratus (St)",
      description: "Generally gray cloud layer with a uniform base",
      altitude: "Low altitude: surface to 6,500 ft",
      characteristics: [
        "May produce drizzle, ice prisms, or snow grains",
        "When broken up, blue sky is visible",
        "Sometimes appears in the form of ragged patches",
      ],
      colorClass: "text-green-600",
      position: { bottom: "15%", left: "35%" },
    },
    Cumulus: {
      name: "Cumulus (Cu)",
      description: "Detached, dense clouds with sharp outlines",
      altitude: "Low to middle altitude: 1,000-6,500 ft",
      characteristics: [
        "Vertical development",
        "Flat base and dome-shaped upper part",
        "Often described as 'cotton-like'",
      ],
      colorClass: "text-green-600",
      position: { bottom: "20%", left: "50%" },
    },
    Cumulonimbus: {
      name: "Cumulonimbus (Cb)",
      description: "Heavy and dense cloud with considerable vertical extent",
      altitude: "Low to high altitude: 1,000-50,000 ft",
      characteristics: [
        "Associated with thunderstorms and other extreme weather",
        "Upper part often spreads out in the shape of an anvil",
        "Can produce heavy precipitation, lightning, and sometimes hail",
      ],
      colorClass: "text-green-600",
      position: { bottom: "20%", left: "10%" },
    },
  }
  
  