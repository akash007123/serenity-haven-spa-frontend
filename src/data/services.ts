export interface ServiceDuration {
  minutes: number;
  price: string;
}

export interface ServiceBenefit {
  label: string;
  icon?: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  duration: string;
  durations: ServiceDuration[];
  price: string;
  priceRange: {
    min: number;
    max: number;
  };
  image: string;
  category: string;
  featured: boolean;
  popular: boolean;
  benefits: string[];
  benefitDetails: ServiceBenefit[];
  whatToExpect: string[];
  contraindications?: string[];
  preparationTips?: string[];
  rating?: number;
  reviewCount?: number;
  color?: string;
  gradient?: string;
}

export const services: Service[] = [
  {
    id: "swedish",
    slug: "swedish-massage",
    name: "Swedish Massage",
    shortDescription: "A classic full-body massage using long, flowing strokes to ease tension.",
    description: "A classic full-body massage using long, flowing strokes to ease tension, improve circulation, and promote deep relaxation. This traditional technique is perfect for those new to massage therapy.",
    duration: "60 / 90 min",
    durations: [
      { minutes: 60, price: "$95" },
      { minutes: 90, price: "$125" },
    ],
    price: "From $95",
    priceRange: { min: 95, max: 125 },
    image: "swedish",
    category: "Classic",
    featured: true,
    popular: true,
    benefits: ["Stress relief", "Improved circulation", "Muscle relaxation", "Better sleep"],
    benefitDetails: [
      { label: "Reduces stress hormones" },
      { label: "Increases oxygen flow" },
      { label: "Eases muscle tension" },
      { label: "Promotes relaxation" },
    ],
    whatToExpect: [
      "Arrive 15 minutes early for consultation",
      "Your therapist will discuss your needs",
      "You'll be draped comfortably throughout",
      "Relaxing music and aromatherapy included",
    ],
    preparationTips: [
      "Avoid heavy meals 2 hours before",
      "Stay hydrated after your session",
      "Wear comfortable clothing",
    ],
    rating: 4.9,
    reviewCount: 1250,
    color: "#7c9885",
    gradient: "from-green-100 to-emerald-50",
  },
  {
    id: "deep-tissue",
    slug: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    shortDescription: "Targeted pressure on deep muscle layers to release chronic tension.",
    description: "Targeted pressure on deep muscle layers to release chronic tension, knots, and adhesions for lasting pain relief. Ideal for athletes and those with persistent muscle issues.",
    duration: "60 / 90 min",
    durations: [
      { minutes: 60, price: "$115" },
      { minutes: 90, price: "$145" },
    ],
    price: "From $115",
    priceRange: { min: 115, max: 145 },
    image: "deep-tissue",
    category: "Therapeutic",
    featured: true,
    popular: true,
    benefits: ["Pain relief", "Injury recovery", "Posture improvement", "Chronic tension release"],
    benefitDetails: [
      { label: "Releases muscle knots" },
      { label: "Improves posture" },
      { label: "Speeds recovery" },
      { label: "Reduces inflammation" },
    ],
    whatToExpect: [
      "More intense pressure than Swedish",
      "You may feel some discomfort",
      "Communicate with your therapist",
      "Deep breathing helps release tension",
    ],
    preparationTips: [
      "Communicate pressure preferences",
      "Stay hydrated before and after",
      "Avoid strenuous activity post-session",
    ],
    contraindications: ["Recent injuries", "Blood clots", "Osteoporosis"],
    rating: 4.8,
    reviewCount: 980,
    color: "#8b7355",
    gradient: "from-amber-100 to-orange-50",
  },
  {
    id: "aromatherapy",
    slug: "aromatherapy-massage",
    name: "Aromatherapy",
    shortDescription: "A soothing massage enhanced with premium essential oils.",
    description: "A soothing massage enhanced with premium essential oils, carefully blended to restore balance to body and mind. Choose from our signature oil blends for your specific needs.",
    duration: "75 min",
    durations: [
      { minutes: 75, price: "$120" },
    ],
    price: "$120",
    priceRange: { min: 120, max: 120 },
    image: "aromatherapy",
    category: "Wellness",
    featured: true,
    popular: false,
    benefits: ["Emotional balance", "Enhanced mood", "Skin nourishment", "Deep relaxation"],
    benefitDetails: [
      { label: "Calms the nervous system" },
      { label: "Uplifts mood naturally" },
      { label: "Nourishes skin" },
      { label: "Reduces anxiety" },
    ],
    whatToExpect: [
      "Consultation on oil preferences",
      "Custom oil blend prepared",
      "Gentle, flowing massage strokes",
      "Extended relaxation time",
    ],
    preparationTips: [
      "Share any allergies",
      "Specify preferred scents",
      "Arrive relaxed",
    ],
    rating: 4.9,
    reviewCount: 756,
    color: "#b8860b",
    gradient: "from-amber-100 to-yellow-50",
  },
  {
    id: "hot-stone",
    slug: "hot-stone-therapy",
    name: "Hot Stone Therapy",
    shortDescription: "Heated basalt stones placed on key energy points.",
    description: "Heated basalt stones placed on key energy points while warm oil massage melts away deep-seated tension. The combination of heat and massage creates profound relaxation.",
    duration: "90 min",
    durations: [
      { minutes: 90, price: "$135" },
    ],
    price: "$135",
    priceRange: { min: 135, max: 135 },
    image: "hot-stone",
    category: "Therapeutic",
    featured: true,
    popular: true,
    benefits: ["Deep muscle relaxation", "Improved blood flow", "Stress reduction", "Energy balancing"],
    benefitDetails: [
      { label: "Muscles warm quickly" },
      { label: "Circulation improves" },
      { label: "Stress melts away" },
      { label: "Energy flows freely" },
    ],
    whatToExpect: [
      "Stones heated to comfortable temperature",
      "Stones placed on key points",
      "Warm oil massage between placements",
      "Deep warmth throughout body",
    ],
    preparationTips: [
      "Stay hydrated",
      "Avoid heavy meals",
      "Notify of any medical conditions",
    ],
    contraindications: ["Heart conditions", "Diabetes", "Skin sensitivities"],
    rating: 4.9,
    reviewCount: 890,
    color: "#cd853f",
    gradient: "from-orange-100 to-red-50",
  },
  {
    id: "thai",
    slug: "thai-massage",
    name: "Thai Massage",
    shortDescription: "Ancient healing art combining acupressure and stretching.",
    description: "An ancient healing art combining acupressure, stretching, and yoga-like movements to restore flexibility and energy flow. Performed on a mat with loose clothing.",
    duration: "90 / 120 min",
    durations: [
      { minutes: 90, price: "$125" },
      { minutes: 120, price: "$155" },
    ],
    price: "From $125",
    priceRange: { min: 125, max: 155 },
    image: "thai",
    category: "Traditional",
    featured: false,
    popular: false,
    benefits: ["Increased flexibility", "Energy restoration", "Joint mobility", "Holistic healing"],
    benefitDetails: [
      { label: "Increases flexibility" },
      { label: "Energizes body" },
      { label: "Improves range of motion" },
      { label: "Balances energy" },
    ],
    whatToExpect: [
      "Performed on a floor mat",
      "Wearing comfortable clothing",
      "Combination of stretching and pressure",
      "No oil used",
    ],
    preparationTips: [
      "Wear loose, comfortable clothes",
      "Eat lightly beforehand",
      "Be prepared for movement",
    ],
    rating: 4.8,
    reviewCount: 654,
    color: "#daa520",
    gradient: "from-yellow-100 to-amber-50",
  },
  {
    id: "reflexology",
    slug: "reflexology",
    name: "Reflexology",
    shortDescription: "Pressure therapy focusing on feet, hands, and ears.",
    description: "A targeted pressure therapy that focuses on specific points in your feet, hands, and ears corresponding to different body organs and systems.",
    duration: "45 / 60 min",
    durations: [
      { minutes: 45, price: "$65" },
      { minutes: 60, price: "$85" },
    ],
    price: "From $65",
    priceRange: { min: 65, max: 85 },
    image: "reflexology",
    category: "Targeted",
    featured: false,
    popular: false,
    benefits: ["Whole-body relaxation", "Improved circulation", "Stress relief", "Pain reduction"],
    benefitDetails: [
      { label: "Balances body systems" },
      { label: "Reduces foot pain" },
      { label: "Promotes overall wellness" },
      { label: "Enhances sleep" },
    ],
    whatToExpect: [
      "Sit comfortably in a recliner",
      "Focus on feet (or hands)",
      "Gentle to firm pressure",
      "Extremely relaxing experience",
    ],
    preparationTips: [
      "Remove nail polish if foot focus",
      "Communicate pressure preference",
      "Relax and breathe deeply",
    ],
    rating: 4.7,
    reviewCount: 432,
    color: "#20b2aa",
    gradient: "from-teal-100 to-cyan-50",
  },
  {
    id: "sports",
    slug: "sports-massage",
    name: "Sports Massage",
    shortDescription: "Specialized massage for athletes and active individuals.",
    description: "Specialized massage techniques designed for athletes and active individuals to enhance performance, prevent injuries, and speed recovery between training sessions.",
    duration: "30 / 60 / 90 min",
    durations: [
      { minutes: 30, price: "$55" },
      { minutes: 60, price: "$105" },
      { minutes: 90, price: "$145" },
    ],
    price: "From $55",
    priceRange: { min: 55, max: 145 },
    image: "sports",
    category: "Therapeutic",
    featured: true,
    popular: true,
    benefits: ["Performance enhancement", "Injury prevention", "Faster recovery", "Flexibility"],
    benefitDetails: [
      { label: "Prevents injuries" },
      { label: "Speeds recovery" },
      { label: "Improves flexibility" },
      { label: "Enhances performance" },
    ],
    whatToExpect: [
      "Focus on problem areas",
      "May include stretching",
      "Adjustable intensity",
      "Pre or post-event options",
    ],
    preparationTips: [
      "Share your training schedule",
      "Communicate any injuries",
      "Hydrate well before and after",
    ],
    contraindications: ["Acute injuries", "Inflamed joints"],
    rating: 4.8,
    reviewCount: 567,
    color: "#4682b4",
    gradient: "from-blue-100 to-sky-50",
  },
  {
    id: "prenatal",
    slug: "prenatal-massage",
    name: "Prenatal Massage",
    shortDescription: "Gentle massage designed for expecting mothers.",
    description: "A gentle, nurturing massage specifically designed for the unique needs of pregnancy. Helps relieve common discomforts while promoting wellness for both mother and baby.",
    duration: "60 / 90 min",
    durations: [
      { minutes: 60, price: "$95" },
      { minutes: 90, price: "$125" },
    ],
    price: "From $95",
    priceRange: { min: 95, max: 125 },
    image: "prenatal",
    category: "Specialty",
    featured: false,
    popular: false,
    benefits: ["Reduced back pain", "Better sleep", "Swelling relief", "Relaxation"],
    benefitDetails: [
      { label: "Eases back pain" },
      { label: "Reduces swelling" },
      { label: "Improves sleep" },
      { label: "Calms anxiety" },
    ],
    whatToExpect: [
      "Side-lying position for comfort",
      "Pregnancy-safe techniques",
      "Adjustable positioning",
      "Relaxing atmosphere",
    ],
    preparationTips: [
      "Consult your doctor first",
      "Stay hydrated",
      "Arrive with comfortable clothes",
    ],
    contraindications: ["High-risk pregnancy", "Certain conditions (consult doctor)"],
    rating: 4.9,
    reviewCount: 345,
    color: "#db7093",
    gradient: "from-pink-100 to-rose-50",
  },
];

export const categories = [
  { id: "all", name: "All Services", icon: "sparkles" },
  { id: "classic", name: "Classic", icon: "heart" },
  { id: "therapeutic", name: "Therapeutic", icon: "shield" },
  { id: "wellness", name: "Wellness", icon: "leaf" },
  { id: "traditional", name: "Traditional", icon: "star" },
  { id: "specialty", name: "Specialty", icon: "award" },
];

export const getServicesByCategory = (category: string) => {
  if (category === "all") return services;
  return services.filter((service) => service.category.toLowerCase() === category.toLowerCase());
};

export const getFeaturedServices = () => {
  return services.filter((service) => service.featured);
};

export const getPopularServices = () => {
  return services.filter((service) => service.popular);
};

export const getServiceBySlug = (slug: string) => {
  return services.find((service) => service.slug === slug);
};
