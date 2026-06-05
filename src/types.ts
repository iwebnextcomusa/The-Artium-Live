export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  eventDate: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  extendedDesc: string;
  features: string[];
  image: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  thumbnail: string;
  title: string;
  category: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
