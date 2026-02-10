export interface Therapist {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  experience: string;
  bio: string;
}

export const therapists: Therapist[] = [
  {
    id: "1",
    name: "Elena Rivera",
    title: "Senior Massage Therapist",
    specialties: ["Swedish Massage", "Aromatherapy"],
    experience: "12 years",
    bio: "Elena brings a gentle, intuitive approach to massage therapy, creating a deeply calming experience for every guest.",
  },
  {
    id: "2",
    name: "Marcus Chen",
    title: "Deep Tissue Specialist",
    specialties: ["Deep Tissue", "Sports Massage"],
    experience: "10 years",
    bio: "Marcus combines precise technique with a holistic understanding of the body to deliver transformative results.",
  },
  {
    id: "3",
    name: "Amara Osei",
    title: "Holistic Wellness Expert",
    specialties: ["Hot Stone Therapy", "Aromatherapy"],
    experience: "8 years",
    bio: "Amara's treatments focus on restoring balance between body, mind, and spirit using ancient healing traditions.",
  },
  {
    id: "4",
    name: "Suki Tanaka",
    title: "Thai Massage Master",
    specialties: ["Thai Massage", "Stretching Therapy"],
    experience: "15 years",
    bio: "Trained in Chiang Mai, Suki is a master of traditional Thai techniques that restore energy and flexibility.",
  },
];
