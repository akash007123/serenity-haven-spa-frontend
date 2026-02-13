export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    rating: 5,
    text: "I visited Tripod Wellness after a long week of work, and the experience was amazing. The ambiance is calm, the staff is professional, and the massage was very relaxing. I felt completely refreshed. Highly recommended for anyone looking for quality spa service in Ujjain",
    service: "Aromatherapy",
  },
  {
    id: "2",
    name: "Amit Verma",
    rating: 5,
    text: "One of the best spa experiences I’ve had. The hygiene level at Tripod Wellness is excellent. The therapist was well-trained and understood exactly where I had muscle tension. I will definitely visit again.",
    service: "Deep Tissue Massage",
  },
  {
    id: "3",
    name: "Sandeep Patel",
    rating: 5,
    text: "I booked a deep tissue massage and it was worth every rupee. The staff is polite and the environment is peaceful. Perfect place to relieve stress. Tripod Wellness is truly professional.",
    service: "Hot Stone Therapy",
  },
  {
    id: "4",
    name: "Vikas Tiwari",
    rating: 5,
    text: "Very clean and well-maintained spa. I appreciate their privacy and customer care. The massage therapy helped reduce my back pain significantly. Great service and reasonable pricing.",
    service: "Thai Massage",
  },
  {
    id: "5",
    name: "Rohit Singh",
    rating: 5,
    text: "The best spa in the Nanakheda area. From booking to completion, everything was smooth. The therapist was experienced and respectful. I left feeling relaxed and energized.",
    service: "Swedish Massage",
  },

  {
    id: "6",
    name: "Manish Dubey",
    rating: 4,
    text: "I was impressed with the professionalism at Tripod Wellness. The aroma therapy session was extremely calming. It’s a perfect place for stress relief and relaxation.",
    service: "Swedish Massage",
  },
  {
    id: "7",
    name: "Rohit Singh",
    rating: 5,
    text: "The best spa in the Nanakheda area. From booking to completion, everything was smooth. The therapist was experienced and respectful. I left feeling relaxed and energized.",
    service: "Swedish Massage",
  },
];
