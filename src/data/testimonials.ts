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
    name: "Sarah M.",
    rating: 5,
    text: "Absolutely the best spa experience I've ever had. The aromatherapy session left me feeling completely renewed.",
    service: "Aromatherapy",
  },
  {
    id: "2",
    name: "James L.",
    rating: 5,
    text: "The deep tissue massage was exactly what I needed. Marcus is incredibly skilled — my back pain is finally gone.",
    service: "Deep Tissue Massage",
  },
  {
    id: "3",
    name: "Priya K.",
    rating: 5,
    text: "A truly luxurious experience from start to finish. The atmosphere is serene and the staff is wonderful.",
    service: "Hot Stone Therapy",
  },
  {
    id: "4",
    name: "David W.",
    rating: 5,
    text: "I've been coming here monthly for a year now. The Thai massage keeps me flexible and stress-free. Highly recommend!",
    service: "Thai Massage",
  },
  {
    id: "5",
    name: "Lisa R.",
    rating: 5,
    text: "The perfect escape from the city. Every visit feels like a mini vacation. The Swedish massage is heavenly.",
    service: "Swedish Massage",
  },
];
