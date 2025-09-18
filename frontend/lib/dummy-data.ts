// Dummy data for testing the platform

export interface HazardReport {
  id: string
  type: "tsunami" | "storm_surge" | "flooding" | "high_waves" | "abnormal_sea_behavior" | "coastal_erosion"
  description: string
  location: {
    lat: number
    lng: number
    address: string
  }
  timestamp: string
  severity: "low" | "medium" | "high" | "critical"
  source: "citizen" | "social_media" | "official"
  status: "pending" | "verified" | "false_alarm"
  media?: string[]
  reportedBy: string
}

export interface SocialMediaPost {
  id: string
  platform: "twitter" | "facebook" | "youtube"
  content: string
  author: string
  timestamp: string
  location?: {
    lat: number
    lng: number
    address: string
  }
  sentiment: "positive" | "negative" | "neutral"
  keywords: string[]
  engagement: {
    likes: number
    shares: number
    comments: number
  }
}

export const dummyHazardReports: HazardReport[] = [
  {
    id: "1",
    type: "high_waves",
    description:
      "Unusually high waves observed at Marina Beach, approximately 4-5 meters high. Waves are crashing over the promenade and flooding nearby roads. Local fishermen have moved their boats to safety.",
    location: {
      lat: 13.0475,
      lng: 80.2824,
      address: "Marina Beach, Chennai, Tamil Nadu",
    },
    timestamp: "2024-01-15T10:30:00Z",
    severity: "high",
    source: "citizen",
    status: "verified",
    media: ["/high-waves-at-beach.jpg"],
    reportedBy: "Rajesh Kumar - Local Fisherman",
  },
  {
    id: "2",
    type: "flooding",
    description:
      "Coastal flooding in low-lying areas due to high tide combined with strong winds. Water has entered shops and homes near the beach road. Traffic is being diverted.",
    location: {
      lat: 11.9416,
      lng: 79.8083,
      address: "Puducherry Promenade, Puducherry",
    },
    timestamp: "2024-01-15T08:15:00Z",
    severity: "medium",
    source: "official",
    status: "verified",
    reportedBy: "INCOIS Puducherry Station",
  },
  {
    id: "3",
    type: "abnormal_sea_behavior",
    description:
      "Sea water receding unusually far from shore, exposing coral reefs that are normally underwater. Local residents are concerned about potential tsunami activity.",
    location: {
      lat: 8.0883,
      lng: 77.5385,
      address: "Kanyakumari Beach, Tamil Nadu",
    },
    timestamp: "2024-01-15T06:45:00Z",
    severity: "critical",
    source: "citizen",
    status: "pending",
    media: ["/receding-sea-water.jpg"],
    reportedBy: "Murugan S - Local Fisherman",
  },
  {
    id: "4",
    type: "storm_surge",
    description:
      "Storm surge affecting coastal areas, water levels rising rapidly due to cyclonic activity. Waves reaching 6-7 meters height at Juhu Beach.",
    location: {
      lat: 19.076,
      lng: 72.8777,
      address: "Juhu Beach, Mumbai, Maharashtra",
    },
    timestamp: "2024-01-14T22:30:00Z",
    severity: "high",
    source: "social_media",
    status: "verified",
    reportedBy: "Mumbai Weather Updates",
  },
  {
    id: "5",
    type: "tsunami",
    description:
      "Small tsunami waves observed following underwater seismic activity. Waves approximately 1-2 meters above normal high tide level. Coastal areas evacuated as precaution.",
    location: {
      lat: 11.7401,
      lng: 92.6586,
      address: "Port Blair, Andaman and Nicobar Islands",
    },
    timestamp: "2024-01-15T14:20:00Z",
    severity: "critical",
    source: "official",
    status: "verified",
    reportedBy: "INCOIS Tsunami Warning Center",
  },
  {
    id: "6",
    type: "high_waves",
    description:
      "Extremely high waves due to monsoon winds. Fishing activities suspended. Waves breaking over sea walls and flooding coastal roads.",
    location: {
      lat: 15.2993,
      lng: 74.124,
      address: "Panaji Beach, Goa",
    },
    timestamp: "2024-01-15T12:45:00Z",
    severity: "high",
    source: "citizen",
    status: "verified",
    media: ["/goa-high-waves.jpg"],
    reportedBy: "Antonio D'Silva - Beach Resort Owner",
  },
  {
    id: "7",
    type: "coastal_erosion",
    description:
      "Severe coastal erosion observed after recent storms. Beach has receded by approximately 15 meters. Several coconut trees have fallen into the sea.",
    location: {
      lat: 10.8505,
      lng: 76.2711,
      address: "Fort Kochi Beach, Kerala",
    },
    timestamp: "2024-01-14T16:30:00Z",
    severity: "medium",
    source: "citizen",
    status: "pending",
    media: ["/sea-foam-puri.jpg"],
    reportedBy: "Priya Nair - Environmental Activist",
  },
  {
    id: "8",
    type: "flooding",
    description:
      "Tidal flooding in low-lying fishing village. Water has entered homes and damaged fishing nets. Community seeking immediate assistance.",
    location: {
      lat: 16.216,
      lng: 81.804,
      address: "Kakinada Beach, Andhra Pradesh",
    },
    timestamp: "2024-01-15T07:20:00Z",
    severity: "medium",
    source: "citizen",
    status: "verified",
    reportedBy: "Venkata Rao - Village Head",
  },
  {
    id: "9",
    type: "abnormal_sea_behavior",
    description:
      "Unusual sea foam and discoloration observed. Strong sulfur smell reported. Marine life appearing distressed. Possible underwater volcanic activity.",
    location: {
      lat: 20.2961,
      lng: 85.8245,
      address: "Puri Beach, Odisha",
    },
    timestamp: "2024-01-15T09:15:00Z",
    severity: "high",
    source: "citizen",
    status: "pending",
    media: ["/sea-foam-puri.jpg"],
    reportedBy: "Dr. Subash Panda - Marine Biologist",
  },
  {
    id: "10",
    type: "storm_surge",
    description:
      "Storm surge from Bay of Bengal cyclone. Waves overtopping embankments. Emergency evacuation of coastal villages in progress.",
    location: {
      lat: 13.6288,
      lng: 79.4192,
      address: "Mahabalipuram, Tamil Nadu",
    },
    timestamp: "2024-01-15T11:45:00Z",
    severity: "critical",
    source: "official",
    status: "verified",
    reportedBy: "Tamil Nadu Disaster Management",
  },
  {
    id: "11",
    type: "high_waves",
    description:
      "Massive waves hitting the lighthouse area. Spray reaching up to 20 meters height. Tourists advised to maintain safe distance from shore.",
    location: {
      lat: 22.4707,
      lng: 69.7725,
      address: "Dwarka Lighthouse, Gujarat",
    },
    timestamp: "2024-01-15T13:30:00Z",
    severity: "medium",
    source: "citizen",
    status: "verified",
    reportedBy: "Ramesh Patel - Lighthouse Keeper",
  },
  {
    id: "12",
    type: "flooding",
    description:
      "King tide flooding combined with heavy rainfall. Water logging in Colaba area. Marine Drive partially submerged.",
    location: {
      lat: 18.9067,
      lng: 72.8147,
      address: "Marine Drive, Mumbai, Maharashtra",
    },
    timestamp: "2024-01-15T05:45:00Z",
    severity: "medium",
    source: "social_media",
    status: "verified",
    reportedBy: "Mumbai Traffic Police",
  },
  {
    id: "13",
    type: "tsunami",
    description:
      "Minor tsunami waves detected by deep ocean sensors. Wave height 0.5-1 meter above normal. Coastal monitoring stations on high alert.",
    location: {
      lat: 12.2958,
      lng: 76.6394,
      address: "Mangalore Coast, Karnataka",
    },
    timestamp: "2024-01-15T15:10:00Z",
    severity: "high",
    source: "official",
    status: "verified",
    reportedBy: "INCOIS Deep Ocean Monitoring",
  },
  {
    id: "14",
    type: "coastal_erosion",
    description:
      "Rapid beach erosion following cyclone. Sand dunes completely washed away. Coastal highway under threat.",
    location: {
      lat: 19.6176,
      lng: 85.2799,
      address: "Chandipur Beach, Odisha",
    },
    timestamp: "2024-01-14T18:20:00Z",
    severity: "high",
    source: "citizen",
    status: "pending",
    reportedBy: "Bikash Mohanty - Local Resident",
  },
  {
    id: "15",
    type: "abnormal_sea_behavior",
    description:
      "Sea turning unusual reddish color with dead fish washing ashore. Possible algal bloom or pollution incident. Foul smell reported.",
    location: {
      lat: 17.6868,
      lng: 83.2185,
      address: "Visakhapatnam Beach, Andhra Pradesh",
    },
    timestamp: "2024-01-15T08:50:00Z",
    severity: "medium",
    source: "citizen",
    status: "pending",
    media: ["/red-sea-vizag.jpg"],
    reportedBy: "Lakshmi Devi - Fish Vendor",
  },
  {
    id: "16",
    type: "high_waves",
    description:
      "Dangerous waves at popular surfing spot. Several surfers rescued by coast guard. Beach closed for public safety.",
    location: {
      lat: 8.3869,
      lng: 76.956,
      address: "Kovalam Beach, Kerala",
    },
    timestamp: "2024-01-15T14:15:00Z",
    severity: "high",
    source: "official",
    status: "verified",
    reportedBy: "Kerala Coast Guard",
  },
  {
    id: "17",
    type: "flooding",
    description:
      "Backwater flooding due to high tide and heavy rains. Houseboat operations suspended. Water entering ground floor of waterfront buildings.",
    location: {
      lat: 9.4981,
      lng: 76.3388,
      address: "Alleppey Backwaters, Kerala",
    },
    timestamp: "2024-01-15T06:30:00Z",
    severity: "medium",
    source: "citizen",
    status: "verified",
    reportedBy: "Thomas Joseph - Houseboat Operator",
  },
  {
    id: "18",
    type: "storm_surge",
    description:
      "Severe storm surge from Arabian Sea depression. Waves reaching 8 meters. Fishing harbor completely flooded.",
    location: {
      lat: 21.8974,
      lng: 70.202,
      address: "Porbandar Harbor, Gujarat",
    },
    timestamp: "2024-01-14T20:45:00Z",
    severity: "critical",
    source: "official",
    status: "verified",
    reportedBy: "Gujarat Maritime Board",
  },
  {
    id: "19",
    type: "abnormal_sea_behavior",
    description:
      "Unusual whirlpool formation observed 2 km from shore. Strong underwater currents detected. Fishing boats advised to avoid the area.",
    location: {
      lat: 14.0426,
      lng: 74.9956,
      address: "Karwar Coast, Karnataka",
    },
    timestamp: "2024-01-15T10:20:00Z",
    severity: "high",
    source: "citizen",
    status: "pending",
    reportedBy: "Captain Suresh Naik - Fishing Vessel",
  },
  {
    id: "20",
    type: "coastal_erosion",
    description:
      "Accelerated erosion threatening ancient temple complex. Sea has advanced 50 meters inland in past month. Archaeological site at risk.",
    location: {
      lat: 12.6186,
      lng: 80.1919,
      address: "Mamallapuram Shore Temple, Tamil Nadu",
    },
    timestamp: "2024-01-15T12:00:00Z",
    severity: "high",
    source: "official",
    status: "verified",
    reportedBy: "Archaeological Survey of India",
  },
]

export const dummySocialMediaPosts: SocialMediaPost[] = [
  {
    id: "1",
    platform: "twitter",
    content:
      "Massive waves hitting Chennai coast! Never seen anything like this before #ChennaiFloods #Tsunami #HighWaves",
    author: "@chennai_local",
    timestamp: "2024-01-15T11:00:00Z",
    location: {
      lat: 13.0475,
      lng: 80.2824,
      address: "Chennai, Tamil Nadu",
    },
    sentiment: "negative",
    keywords: ["waves", "Chennai", "tsunami", "floods", "massive"],
    engagement: {
      likes: 245,
      shares: 89,
      comments: 34,
    },
  },
  {
    id: "2",
    platform: "facebook",
    content:
      "Water levels rising in Puducherry. Authorities should take immediate action. Promenade completely flooded!",
    author: "Coastal Watch Group",
    timestamp: "2024-01-15T09:30:00Z",
    location: {
      lat: 11.9416,
      lng: 79.8083,
      address: "Puducherry",
    },
    sentiment: "negative",
    keywords: ["water levels", "Puducherry", "authorities", "action", "flooded"],
    engagement: {
      likes: 156,
      shares: 67,
      comments: 23,
    },
  },
  {
    id: "3",
    platform: "twitter",
    content:
      "🌊 URGENT: Sea receding rapidly at Kanyakumari! This looks exactly like 2004 tsunami warning signs. Everyone please move to higher ground immediately! #TsunamiAlert #Kanyakumari",
    author: "@tsunami_watch_india",
    timestamp: "2024-01-15T07:00:00Z",
    location: {
      lat: 8.0883,
      lng: 77.5385,
      address: "Kanyakumari, Tamil Nadu",
    },
    sentiment: "negative",
    keywords: ["sea receding", "tsunami", "Kanyakumari", "urgent", "warning"],
    engagement: {
      likes: 892,
      shares: 456,
      comments: 123,
    },
  },
  {
    id: "4",
    platform: "youtube",
    content:
      "Live footage of storm surge hitting Mumbai coastline. Waves are massive! Stay safe everyone. #MumbaiStorm #StormSurge",
    author: "Mumbai Weather Live",
    timestamp: "2024-01-14T23:15:00Z",
    location: {
      lat: 19.076,
      lng: 72.8777,
      address: "Mumbai, Maharashtra",
    },
    sentiment: "negative",
    keywords: ["storm surge", "Mumbai", "waves", "massive", "live footage"],
    engagement: {
      likes: 1234,
      shares: 567,
      comments: 89,
    },
  },
  {
    id: "5",
    platform: "facebook",
    content:
      "Port Blair experiencing unusual wave activity. Tsunami warning sirens activated. All coastal residents please evacuate immediately as per disaster management protocol.",
    author: "Andaman Nicobar Administration",
    timestamp: "2024-01-15T14:30:00Z",
    location: {
      lat: 11.7401,
      lng: 92.6586,
      address: "Port Blair, Andaman and Nicobar Islands",
    },
    sentiment: "negative",
    keywords: ["Port Blair", "tsunami warning", "evacuate", "wave activity", "sirens"],
    engagement: {
      likes: 445,
      shares: 234,
      comments: 67,
    },
  },
  {
    id: "6",
    platform: "twitter",
    content:
      "Goa beaches closed due to dangerous waves. Monsoon fury at its peak! 🌊⚠️ #GoaWeather #HighWaves #MonsoonAlert",
    author: "@goa_tourism_official",
    timestamp: "2024-01-15T13:00:00Z",
    location: {
      lat: 15.2993,
      lng: 74.124,
      address: "Panaji, Goa",
    },
    sentiment: "negative",
    keywords: ["Goa", "beaches closed", "dangerous waves", "monsoon", "peak"],
    engagement: {
      likes: 678,
      shares: 234,
      comments: 45,
    },
  },
  {
    id: "7",
    platform: "facebook",
    content:
      "Coastal erosion in Fort Kochi is getting worse every day. We're losing our beautiful beach. Government needs to take action before it's too late!",
    author: "Save Kerala Coasts",
    timestamp: "2024-01-14T17:45:00Z",
    location: {
      lat: 10.8505,
      lng: 76.2711,
      address: "Fort Kochi, Kerala",
    },
    sentiment: "negative",
    keywords: ["coastal erosion", "Fort Kochi", "losing beach", "government action", "worse"],
    engagement: {
      likes: 234,
      shares: 89,
      comments: 56,
    },
  },
  {
    id: "8",
    platform: "twitter",
    content:
      "Kakinada fishing community needs help! Tidal flooding has destroyed our nets and boats. #KakinadaFloods #FishermanHelp #AndhraPradesh",
    author: "@kakinada_fishermen",
    timestamp: "2024-01-15T08:30:00Z",
    location: {
      lat: 16.216,
      lng: 81.804,
      address: "Kakinada, Andhra Pradesh",
    },
    sentiment: "negative",
    keywords: ["Kakinada", "fishing community", "tidal flooding", "destroyed", "help needed"],
    engagement: {
      likes: 345,
      shares: 123,
      comments: 78,
    },
  },
  {
    id: "9",
    platform: "youtube",
    content:
      "Strange sea foam at Puri beach! Never seen anything like this. The smell is terrible. What's happening to our ocean? #PuriBeach #SeaFoam #OceanPollution",
    author: "Odisha Coastal Vlogs",
    timestamp: "2024-01-15T10:00:00Z",
    location: {
      lat: 20.2961,
      lng: 85.8245,
      address: "Puri, Odisha",
    },
    sentiment: "negative",
    keywords: ["sea foam", "Puri beach", "strange", "terrible smell", "ocean pollution"],
    engagement: {
      likes: 567,
      shares: 234,
      comments: 89,
    },
  },
  {
    id: "10",
    platform: "twitter",
    content:
      "Cyclone impact at Mahabalipuram! Ancient monuments at risk from storm surge. UNESCO site needs protection! #Mahabalipuram #CycloneAlert #HeritageAtRisk",
    author: "@heritage_watch_tn",
    timestamp: "2024-01-15T12:15:00Z",
    location: {
      lat: 13.6288,
      lng: 79.4192,
      address: "Mahabalipuram, Tamil Nadu",
    },
    sentiment: "negative",
    keywords: ["cyclone", "Mahabalipuram", "monuments at risk", "storm surge", "UNESCO"],
    engagement: {
      likes: 789,
      shares: 345,
      comments: 123,
    },
  },
]

export const hazardTypes = [
  { value: "tsunami", label: "Tsunami" },
  { value: "storm_surge", label: "Storm Surge" },
  { value: "flooding", label: "Coastal Flooding" },
  { value: "high_waves", label: "High Waves" },
  { value: "abnormal_sea_behavior", label: "Abnormal Sea Behavior" },
  { value: "coastal_erosion", label: "Coastal Erosion" },
]

export const severityLevels = [
  { value: "low", label: "Low", color: "text-green-600" },
  { value: "medium", label: "Medium", color: "text-yellow-600" },
  { value: "high", label: "High", color: "text-orange-600" },
  { value: "critical", label: "Critical", color: "text-red-600" },
]
