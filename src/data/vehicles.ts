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
    name: "Land Rover Range Rover SE P530",
    year: 2023,
    category: "SUV",
    pricePerDay: 500,
    seats: 5,
    luggage: 4,
    airportReady: true,
    highlight: "Terrain response, air suspension, Meridian audio",
    features: ["125 miles/day included", "Twin-turbo V8 performance", "All-wheel drive", "Panoramic roof", "Meridian premium surround sound system", "Apple CarPlay & Android Auto", "GPS navigation"],
    overview: "The 2023 Range Rover SE P530 represents the pinnacle of modern luxury SUV design, combining effortless V8 performance with an exceptionally refined and commanding driving experience. With its minimalist high-end interior, smooth air suspension ride, and unmistakable presence on the road, the Range Rover delivers true executive-level comfort whether you’re arriving in Atlanta for business, special occasions, airport travel, or weekend escapes. Blending cutting-edge technology with timeless luxury, the P530 offers one of the most prestigious SUV experiences available today.",
    deposit: "$750 refundable deposit",
    insuranceRequirement: "Full coverage required; premium policy recommended",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/land-rover/range-rover/"
  },
  {
    id: "mercedes-gle-2024",
    name: "Mercedes-Benz GLE 53 AMG Coupe",
    year: 2025,
    category: "SUV",
    pricePerDay: 325,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "MBUX infotainment, adaptive air suspension, panoramic roof",
    features: ["125 miles/day included", "AMG Performance Package", "AMG Nappa leather interior with diamond stitching", "64-color ambient lighting", "Driver assistance package", "Burmester Surround Sound System", "Panoramic sunroof", "Heated front seats", "Apple CarPlay & Android Auto", "AMG forged cross-spoke wheels", "All-wheel drive (4MATIC+)", "GPS navigation"],
    overview: "The 2025 Mercedes-Benz AMG GLE 53 Coupe combines luxury SUV comfort with true AMG performance and unmistakable road presence. Powered by a 429-horsepower AMG-enhanced turbocharged inline-6, the GLE 53 delivers exhilarating performance while maintaining the smooth refinement expected from a flagship Mercedes-Benz SUV. Finished with aggressive AMG styling, diamond-stitched AMG Nappa leather, 64-color ambient lighting, and premium materials throughout, this SUV offers the perfect balance of performance, technology, luxury, and everyday usability.",
    deposit: "$650 refundable deposit",
    insuranceRequirement: "Full coverage required; premium policy recommended",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/mercedes-benz/gle-class/3676077"
  },
  {
    id: "chevrolet-corvette-2025",
    name: "Chevrolet Corvette 2LT Convertible",
    year: 2023,
    category: "Sports Cars",
    pricePerDay: 300,
    seats: 2,
    luggage: 3,
    airportReady: true,
    highlight: "Sport Chrono, PASM suspension, sport seats",
    features: ["125 miles/day included", "Convertible hardtop", "Z51 Performance Package", "Performance exhaust system", "GT2 bucket seats", "BOSE Surround Sound System", "Heated seats", "Heated steering wheel", "Head-up display", "Apple CarPlay & Android Auto", "GPS navigation", "Keyless entry"],
    overview: "The 2023 Chevrolet Corvette Stingray 2LT Convertible delivers exotic-level styling, thrilling performance, and open-top driving in one of the most exciting sports cars on the road today. Powered by a naturally aspirated 6.2L V8 producing 495 horsepower with the Z51 Performance Package, this mid-engine Corvette delivers supercar-level acceleration and unmistakable road presence. Combined with its premium interior, aggressive styling, and driver-focused cockpit, the C8 Corvette blends raw performance with everyday usability like few cars on the road today.",
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
    features: ["150 miles/day included", "Porsche all-wheel drive system", "Panoramic sunroof", "Bose surround sound system", "Head-up display", "Apple CarPlay & Android Auto", "GPS navigation"],
    overview: "The 2023 Porsche Cayenne delivers luxury SUV comfort with unmistakable Porsche performance and refinement. Powered by a turbocharged engine producing 348 horsepower, the Cayenne offers sharp handling, smooth acceleration, and one of the most balanced driving experiences in its class. Finished with upscale interior details, advanced technology, and signature Porsche styling throughout, this SUV blends performance, luxury, and everyday practicality effortlessly.",
    deposit: "$600 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/porsche/cayenne/3617052"
  },
  {
    id: "bmw-x6-2022",
    name: "BMW X6 xDrive40i",
    year: 2022,
    category: "SUV",
    pricePerDay: 225,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "M Sport, heads-up display, adaptive cruise",
    features: ["150 miles/day included", "xDrive all-wheel drive", "Panoramic sunroof", "Head-up display", "Apple CarPlay & Android Auto", "Blind spot monitoring", "Premium interior ambient lighting"],
    overview: "The 2022 BMW X6 xDrive40i blends luxury SUV practicality with bold coupe-inspired styling and unmistakable road presence. Powered by a turbocharged inline-6 producing 335 horsepower, the X6 delivers smooth acceleration, confident all-wheel drive handling, and a driving experience that feels both refined and athletic. With its premium interior, aggressive styling, and commanding presence on the road, the X6 offers the perfect balance of luxury, technology, comfort, and performance.",
    deposit: "$400 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/bmw/x6/2943656?endDate=04%2F11%2F2026&endTime=10%3A00&startDate=04%2F08%2F2026&startTime=10%3A00"
  },
  {
    id: "mercedes-benz-glc-2025",
    name: "Mercedes-Benz GLC 300 Coupe",
    year: 2025,
    category: "SUV",
    pricePerDay: 200,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Executive rear seats, 4D surround, AR nav",
    features: ["150 miles/day included", "AMG Line package", "Energizing Comfort", "Panoramic sunroof", "Premium Michelin tires", "Apple CarPlay & Android Auto", "All-wheel drive (4MATIC)"],
    overview: "The 2025 Mercedes-Benz GLC 300 Coupe blends sleek coupe-inspired styling with modern luxury and everyday SUV practicality. Featuring the AMG Line and Night Package, this GLC Coupe delivers a sporty and refined driving experience with premium interior finishes, smooth turbocharged performance, and signature Mercedes-Benz comfort throughout. Whether you’re traveling for business, heading to the airport, or enjoying a night out in Atlanta, the GLC Coupe offers upscale styling and comfort with unmistakable road presence.",
    deposit: "$750 refundable deposit",
    insuranceRequirement: "Full coverage required; premium policy recommended",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/mercedes-benz/glc-class/1947668"
  },
  {
    id: "porsche-mecan-2025",
    name: "Porsche Macan",
    year: 2025,
    category: "SUV",
    pricePerDay: 200,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Sport Chrono, PASM suspension, sport seats",
    features: ["Sport Chrono package", "PASM adaptive suspension", "14-way power sport seats", "Bose surround sound", "Panoramic roof", "Porsche Active Suspension Management"],
    overview: "Athletic precision in a luxury SUV. The Porsche Macan is for those who want performance without compromise and luxury without apology.",
    deposit: "$400 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/porsche/macan/3618427"
  },
  {
    id: "porsche-mecan-2023",
    name: "Porsche Macan",
    year: 2023,
    category: "SUV",
    pricePerDay: 175,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Sport Chrono, PASM suspension, sport seats",
    features: ["Sport Chrono package", "PASM adaptive suspension", "14-way power sport seats", "Bose surround sound", "Panoramic roof", "Porsche Active Suspension Management"],
    overview: "Athletic precision in a luxury SUV. The Porsche Macan is for those who want performance without compromise and luxury without apology.",
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
    name: "Mercedes-Benz GLC 300 Coupe",
    year: 2022,
    category: "SUV",
    pricePerDay: 150,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "AMG Line, Burmester audio, ambient lighting",
    features: ["AMG Line exterior", "Burmester sound system", "Ambient lighting", "MBUX infotainment", "Driver assistance package", "Heated steering wheel"],
    overview: "Refined elegance meets advanced technology. The Mercedes-Benz GLC 300 Coupe offers a serene driving experience for those who expect nothing less.",
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
    name: "Ford Bronco Sport",
    year: 2024,
    category: "SUV",
    pricePerDay: 115,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Lexicon audio, quilted leather, 3D cluster",
    features: ["Lexicon 21-speaker audio", "Quilted Nappa leather", "3D instrument cluster", "Highway Driving Assist II", "Rear comfort package", "Electromechanical suspension"],
    overview: "The Ford Bronco Sport redefines capability with extraordinary craftsmanship, advanced safety, and a ride quality that rivals the best in class.",
    deposit: "$400 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/ford/bronco-sport/3416097?endDate=04%2F06%2F2026&endTime=10%3A00&startDate=04%2F03%2F2026&startTime=10%3A00"
  },

  {
    id: "bmw-3-series-2023",
    name: "BMW 330i",
    year: 2023,
    category: "Sedan",
    pricePerDay: 135,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Refined luxury, advanced safety, smooth ride",
    features: ["Leather upholstery", "Premium audio", "Ambient interior lighting", "Wireless Apple CarPlay", "Adaptive cruise control", "Heated seats"],
    overview: "The BMW 330i delivers polished performance and executive comfort in a premium compact sedan. Every ride is refined, smooth, and prepared for Atlanta city cruising.",
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
    name: "Kia K4",
    year: 2025,
    category: "Sedan",
    pricePerDay: 100,
    seats: 5,
    luggage: 4,
    airportReady: true,
    highlight: "Leather, panoramic sunroof, Bose surround",
    features: ["Premium leather interior", "Panoramic sunroof", "Wireless Apple CarPlay", "360° camera system", "Heated & ventilated seats", "Bose surround sound"],
    overview: "Command the road in the Kia K4. Spacious, refined, and unmistakably premium — ideal for airport arrivals, executive travel, or making an impression.",
    deposit: "$300 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/car-rental/united-states/atlanta-ga/kia/k4/3360917?endDate=04%2F09%2F2026&endTime=10%3A00&startDate=04%2F06%2F2026&startTime=10%3A00"
  },
  {
    id: "mercedes-benz-glc-2024",
    name: "Mercedes-Benz GLC 300 SUV",
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
