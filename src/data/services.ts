export interface ServiceListing {
  id: string;
  slug: string;
  title: string;
  shortName: string;
  metaDescription: string;
  heroImage: string;
  heroImagePosition?: string;
  imagePosition: "left" | "right";
  location?: string;
  description: string;
  shortDescription?: string;
  body: string;
  features: string[];
  faq?: { q: string; a: string }[];
}

export const serviceTypes: ServiceListing[] = [
  {
    id: "general-rentals",
    slug: "general-rentals",
    title: "Luxury Car Rentals in Atlanta",
    shortName: "General Rentals",
    metaDescription: "At Mead Green Autos, luxury extends beyond the vehicle. From exceptional customer service to impeccably cleaned and professionally prepared vehicles...",
    heroImage: "/vehicles/standard-rental-cover-image.webp",
    heroImagePosition: "object-center",
    imagePosition: "left",
    location: "Atlanta, GA",
    description: "At Mead Green Autos, luxury extends beyond the vehicle. From exceptional customer service to impeccably cleaned and professionally prepared vehicles, every detail is designed to deliver a first-class rental experience. Whether you're traveling for business, a special occasion, or everyday luxury, we're committed to providing an experience that exceeds expectations.",
    shortDescription: "Premium vehicles with transparent pricing, flexible rental terms, and professionally maintained standards for everyday rental needs.",
    body: "",
    features: []
  },
  {
    id: "airport",
    slug: "airport-service",
    title: "Luxury Airport Car Rental in Atlanta",
    shortName: "Airport Service",
    metaDescription: "Skip the long rental lines and enjoy the most seamless way to rent a luxury vehicle at Hartsfield-Jackson Atlanta International Airport.",
    heroImage: "/vehicles/areoplane.webp",
    heroImagePosition: "object-center",
    imagePosition: "right",
    location: "Hartsfield-Jackson Atlanta International Airport (ATL)",
    description: "Skip the long rental lines and enjoy the most seamless way to rent a luxury vehicle at Hartsfield-Jackson Atlanta International Airport. Mead Green Autos offers a streamlined airport pickup and return process designed to get you on the road quickly, without the hassle of traditional rental counters. From your arrival to your return, our focus is on exceptional customer service, professionally prepared vehicles, and a premium rental experience tailored around your schedule.",
    shortDescription: "Convenient vehicle pickup and drop-off at Hartsfield–Jackson Atlanta International Airport, designed for a fast and seamless arrival or departure.",
    body: "",
    features: []
  },
  {
    id: "vehicle-delivery",
    slug: "vehicle-delivery",
    title: "Luxury Vehicle Delivery in Atlanta",
    shortName: "Vehicle Delivery",
    metaDescription: "Enjoy the convenience of having your luxury rental delivered directly to your home, hotel, office, or event venue anywhere throughout Metro Atlanta.",
    heroImage: "/vehicles/custom-delivery-cover-image.webp",
    heroImagePosition: "object-center",
    imagePosition: "left",
    location: "Metro Atlanta",
    description: "Enjoy the convenience of having your luxury rental delivered directly to your home, hotel, office, or event venue anywhere throughout Metro Atlanta. Mead Green Autos provides professional vehicle delivery designed around your schedule, allowing you to enjoy a seamless rental experience without visiting a rental location. With flexible scheduling, exceptional customer service, and professionally prepared vehicles, we bring luxury directly to you.",
    shortDescription: "Vehicle delivery and pickup tailored to your location and schedule throughout Atlanta for added convenience.",
    body: "",
    features: []
  },
  {
    id: "corporate-services",
    slug: "corporate-services",
    title: "Executive & Corporate Car Rentals in Atlanta",
    shortName: "Corporate Services",
    metaDescription: "Mead Green Autos provides premium rental solutions for businesses throughout Metro Atlanta.",
    heroImage: "/vehicles/corporate-services-cover-image.webp",
    heroImagePosition: "object-center",
    imagePosition: "right",
    location: "Metro Atlanta",
    description: "Mead Green Autos provides premium rental solutions for businesses throughout Metro Atlanta. Whether you need executive transportation, employee travel, client transportation, temporary fleet vehicles, or long-term business rentals, our professionally maintained fleet delivers the comfort, reliability, and professionalism your organization expects. Flexible rental options, dedicated customer support, and a luxury fleet ensure every business trip leaves a lasting impression.",
    shortDescription: "Professional rental solutions for employee travel, client transportation, and short-term business vehicle needs.",
    body: "",
    features: []
  }
];

