export const TURO_URL = "https://turo.com/us/en/host/31653198";

export interface Vehicle {
  id: string;
  name: string;
  year: number;
  category: "SUV" | "Sedan" | "Sports Cars";
  pricePerDay: number;
  seats: number;
  luggage: number;
  airportReady: boolean;
  highlight: string;
  features: string[];
  overview: string;
  deposit: string;
  insuranceRequirement: string;
  turoURL: string;
}



export const vehicles: Vehicle[] = [
    {
    id: "range-rover-hse-2024",
    name: "Range Rover HSE",
    year: 2024,
    category: "SUV",
    pricePerDay: 500,
    seats: 5,
    luggage: 4,
    airportReady: true,
    highlight: "Terrain response, air suspension, Meridian audio",
    features: ["Adaptive air suspension", "Meridian premium audio", "Terrain Response 2", "Heated and cooled seats", "Panoramic roof", "Advanced driver assistance"],
    overview: "The Range Rover HSE delivers commanding presence, luxurious craftsmanship, and refined capability for Atlanta travel and executive pickup service.",
    deposit: "$750 refundable deposit",
    insuranceRequirement: "Full coverage required; premium policy recommended",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/land-rover/range-rover/"
  },
  {
    id: "mercedes-gle-2024",
    name: "Mercedes-Benz GLE",
    year: 2024,
    category: "SUV",
    pricePerDay: 325,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "MBUX infotainment, adaptive air suspension, panoramic roof",
    features: ["Adaptive air suspension", "MBUX infotainment", "Panoramic sunroof", "Burmester audio", "Heated and ventilated seats", "Driver assistance package"],
    overview: "The 2024 Mercedes-Benz GLE blends refined luxury with advanced technology. It delivers spacious comfort, intelligent safety, and a confident ride for executive travel and premium Atlanta cruising.",
    deposit: "$650 refundable deposit",
    insuranceRequirement: "Full coverage required; premium policy recommended",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/mercedes-benz/gle-class/3676077"
  },
  {
    id: "chevrolet-corvette-2025",
    name: "Chevrolet Corvette",
    year: 2025,
    category: "Sports Cars",
    pricePerDay: 300,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Sport Chrono, PASM suspension, sport seats",
    features: ["Sport Chrono package", "PASM adaptive suspension", "14-way power sport seats", "Bose surround sound", "Panoramic roof", "Porsche Active Suspension Management"],
    overview: "Athletic precision in a luxury sports car. The Chevrolet Corvette is for those who want performance without compromise and luxury without apology.",
    deposit: "$600 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/car-rental/united-states/atlanta-ga/chevrolet/corvette/3626413"
  },
  {
    id: "porsche-cayenne-2023",
    name: "Porsche Cayenne",
    year: 2023,
    category: "SUV",
    pricePerDay: 275,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Sport Chrono, PASM suspension, sport seats",
    features: ["Sport Chrono package", "PASM adaptive suspension", "14-way power sport seats", "Bose surround sound", "Panoramic roof", "Porsche Active Suspension Management"],
    overview: "Athletic precision in a luxury SUV. The Porsche Cayanne is for those who want performance without compromise and luxury without apology.",
    deposit: "$600 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/porsche/cayenne/3617052"
  },
  {
    id: "bmw-x6-2022",
    name: "BMW X6",
    year: 2022,
    category: "Sports Cars",
    pricePerDay: 225,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "M Sport, heads-up display, adaptive cruise",
    features: ["M Sport package", "Leather upholstery", "Heads-up display", "Wireless charging", "Adaptive cruise control", "Harman Kardon audio"],
    overview: "The BMW X6 blends athletic performance with everyday luxury. A confident choice for professionals who value precision and comfort.",
    deposit: "$400 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/bmw/x6/2943656?endDate=04%2F11%2F2026&endTime=10%3A00&startDate=04%2F08%2F2026&startTime=10%3A00"
  },
  {
    id: "mercedes-benz-glc-2025",
    name: "Mercedes-Benz GLC",
    year: 2025,
    category: "SUV",
    pricePerDay: 200,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Executive rear seats, 4D surround, AR nav",
    features: ["Executive rear seating", "MBUX with AR navigation", "Energizing Comfort", "Burmester 4D surround", "Air Balance fragrance", "Night vision assist"],
    overview: "The pinnacle of automotive luxury. The GLC is reserved for those who accept nothing but the absolute finest in comfort, technology, and prestige.",
    deposit: "$750 refundable deposit",
    insuranceRequirement: "Full coverage required; premium policy recommended",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/mercedes-benz/glc-class/1947668"
  },
  {
    id: "porsche-mecan-2025",
    name: "Porsche Mecan",
    year: 2025,
    category: "Sedan",
    pricePerDay: 200,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Sport Chrono, PASM suspension, sport seats",
    features: ["Sport Chrono package", "PASM adaptive suspension", "14-way power sport seats", "Bose surround sound", "Panoramic roof", "Porsche Active Suspension Management"],
    overview: "Athletic precision in a luxury Sedan. The Porsche Mecan is for those who want performance without compromise and luxury without apology.",
    deposit: "$400 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/porsche/macan/3618427"
  },
  {
    id: "porsche-mecan-2023",
    name: "Porsche Mecan",
    year: 2023,
    category: "Sports Cars",
    pricePerDay: 175,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Sport Chrono, PASM suspension, sport seats",
    features: ["Sport Chrono package", "PASM adaptive suspension", "14-way power sport seats", "Bose surround sound", "Panoramic roof", "Porsche Active Suspension Management"],
    overview: "Athletic precision in a luxury SUV. The Porsche Mecan is for those who want performance without compromise and luxury without apology.",
    deposit: "$600 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/porsche/macan/3412905?endDate=04%2F13%2F2026&endTime=10%3A00&startDate=04%2F10%2F2026&startTime=10%3A00"
  },
  {
    id: "kia-telluride",
    name: "Kia Telluride",
    year: 2022,
    category: "SUV",
    pricePerDay: 125,
    seats: 5,
    luggage: 4,
    airportReady: true,
    highlight: "Leather, panoramic sunroof, Bose surround",
    features: ["Premium leather interior", "Panoramic sunroof", "Wireless Apple CarPlay", "360° camera system", "Heated & ventilated seats", "Bose surround sound"],
    overview: "Command the road in the Kia Spacious, refined, and unmistakably premium — ideal for airport arrivals, family travel, or making an impression.",
    deposit: "$300 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/kia/telluride/3125159?endDate=04%2F23%2F2026&endTime=10%3A00&startDate=04%2F20%2F2026&startTime=10%3A00"
  },

  {
    id: "mercedes-benz-glc-2022",
    name: "Mercedes-Benz GLC 2022",
    year: 2022,
    category: "SUV",
    pricePerDay: 150,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "AMG Line, Burmester audio, ambient lighting",
    features: ["AMG Line exterior", "Burmester sound system", "Ambient lighting", "MBUX infotainment", "Driver assistance package", "Heated steering wheel"],
    overview: "Refined elegance meets advanced technology. The Mercedes-Benz GLE offers a serene driving experience for those who expect nothing less.",
    deposit: "$450 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/mercedes-benz/glc-class/1947668?endDate=04%2F09%2F2026&endTime=10%3A00&startDate=04%2F06%2F2026&startTime=10%3A00"
  },
  {
    id: "ford-explorer-2023",
    name: "Ford Explorer",
    year: 2023,
    category: "SUV",
    pricePerDay: 135,
    seats: 5,
    luggage: 4,
    airportReady: true,
    highlight: "5-passenger, magnetic ride, panoramic sunroof",
    features: ["Magnetic Ride Control", "Panoramic sunroof", "10.2-inch touchscreen", "Wireless Apple CarPlay", "Rear-seat entertainment", "Power-folding third row"],
    overview: "The Ford Explorer offers commanding presence and generous space for the entire group. Ideal for large families, events, or corporate shuttles.",
    deposit: "$400 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/ford/explorer/3351936?endDate=04%2F06%2F2026&endTime=10%3A00&startDate=04%2F03%2F2026&startTime=10%3A00"
  },

  {
    id: "ford-bronco-sport-2024",
    name: "Ford Bronco",
    year: 2024,
    category: "SUV",
    pricePerDay: 115,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Lexicon audio, quilted leather, 3D cluster",
    features: ["Lexicon 21-speaker audio", "Quilted Nappa leather", "3D instrument cluster", "Highway Driving Assist II", "Rear comfort package", "Electromechanical suspension"],
    overview: "The Ford Bronco redefines the executive sedan with extraordinary craftsmanship, advanced safety, and a ride quality that rivals the best in class.",
    deposit: "$400 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/ford/bronco-sport/3416097?endDate=04%2F06%2F2026&endTime=10%3A00&startDate=04%2F03%2F2026&startTime=10%3A00"
  },

  {
    id: "bmw-3-series-2023",
    name: "BMW 3 Series",
    year: 2024,
    category: "Sports Cars",
    pricePerDay: 135,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Theatre Screen, executive lounge, B&W audio",
    features: ["31-inch Theatre Screen", "Executive Lounge seating", "Bowers & Wilkins Diamond audio", "Sky Lounge panoramic roof", "Automatic doors", "Highway Assistant"],
    overview: "The BMW 3 Series sets a new standard for the modern luxury flagship. Technology, craftsmanship, and presence converge in a singular driving experience.",
    deposit: "$700 refundable deposit",
    insuranceRequirement: "Full coverage required; premium policy recommended",
    turoURL: "https://turo.com/us/en/car-rental/united-states/atlanta-ga/bmw/3-series/3344731?endDate=04%2F10%2F2026&endTime=10%3A00&startDate=04%2F07%2F2026&startTime=10%3A00"
  },
  {
    id: "kia-sorento-2025",
    name: "Kia Sorento",
    year: 2025,
    category: "SUV",
    pricePerDay: 125,
    seats: 5,
    luggage: 4,
    airportReady: true,
    highlight: "Leather, panoramic sunroof, Bose surround",
    features: ["Premium leather interior", "Panoramic sunroof", "Wireless Apple CarPlay", "360° camera system", "Heated & ventilated seats", "Bose surround sound"],
    overview: "Command the road in the Kia telluride Spacious, refined, and unmistakably premium — ideal for airport arrivals, family travel, or making an impression.",
    deposit: "$300 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/kia/sorento/3335929?endDate=06%2F22%2F2026&endTime=10%3A00&startDate=06%2F19%2F2026&startTime=10%3A00"
  },
  {
    id: "kia-k4-2025",
    name: "Kia k4",
    year: 2025,
    category: "Sedan",
    pricePerDay: 100,
    seats: 5,
    luggage: 4,
    airportReady: true,
    highlight: "Leather, panoramic sunroof, Bose surround",
    features: ["Premium leather interior", "Panoramic sunroof", "Wireless Apple CarPlay", "360° camera system", "Heated & ventilated seats", "Bose surround sound"],
    overview: "Command the road in the Kia telluride Spacious, refined, and unmistakably premium — ideal for airport arrivals, family travel, or making an impression.",
    deposit: "$300 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/car-rental/united-states/atlanta-ga/kia/k4/3360917?endDate=04%2F09%2F2026&endTime=10%3A00&startDate=04%2F06%2F2026&startTime=10%3A00"
  },
  {
    id: "mercedes-benz-glc-2024",
    name: "Mercedes Benz GLC",
    year: 2024,
    category: "SUV",
    pricePerDay: 150,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Executive rear seats, 4D surround, AR nav",
    features: ["Executive rear seating", "MBUX with AR navigation", "Energizing Comfort", "Burmester 4D surround", "Air Balance fragrance", "Night vision assist"],
    overview: "The pinnacle of automotive luxury. The GLC is reserved for those who accept nothing but the absolute finest in comfort, technology, and prestige.",
    deposit: "$750 refundable deposit",
    insuranceRequirement: "Full coverage required; premium policy recommended",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/mercedes-benz/glc-class/3500638?endDate=04%2F16%2F2026&endTime=10%3A00&startDate=04%2F13%2F2026&startTime=10%3A00"
  },

];
