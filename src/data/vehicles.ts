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
    name: "Land Rover Range Rover",
    year: 2023,
    category: "SUV",
    pricePerDay:500,
    seats: 5,
    luggage: 4,
    airportReady: true,
    highlight: "Terrain response, air suspension, Meridian audio",
    features: ["125 miles/day included", "Twin-turbo V8 performance", "All-wheel drive", "Panoramic roof", "Meridian premium surround sound system", "Apple CarPlay & Android Auto", "GPS navigation"],
    overview: "The 2023 Range Rover SE P530 represents the pinnacle of modern luxury SUV design, combining effortless V8 performance with an exceptionally refined and commanding driving experience. With its minimalist high-end interior, smooth air suspension ride, and unmistakable presence on the road, the Range Rover delivers true executive-level comfort whether you’re arriving in Atlanta for business, special occasions, airport travel, or weekend escapes. Blending cutting-edge technology with timeless luxury, the P530 offers one of the most prestigious SUV experiences available today.",
    deposit: "$750 refundable deposit",
    insuranceRequirement: "Full coverage required; premium policy recommended",
    turoURL: "https://turo.com/us/en/host/31653198"
  },
  {
    id: "mercedes-gle-2024",
    name: "Mercedes-Benz GLE Coupe",
    year: 2025,
    category: "SUV",
    pricePerDay:325,
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
    name: "Chevrolet Corvette Convertible",
    year: 2023,
    category: "Sports Cars",
    pricePerDay:300,
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
    pricePerDay:275,
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
    name: "BMW X6",
    year: 2022,
    category: "SUV",
    pricePerDay:225,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "M Sport, heads-up display, adaptive cruise",
    features: ["150 miles/day included", "xDrive all-wheel drive", "Panoramic sunroof", "Head-up display", "Apple CarPlay & Android Auto", "Blind spot monitoring", "Premium interior ambient lighting"],
    overview: "The 2022 BMW X6 xDrive40i blends luxury SUV practicality with bold coupe-inspired styling and unmistakable road presence. Powered by a turbocharged inline-6 producing 335 horsepower, the X6 delivers smooth acceleration, confident all-wheel drive handling, and a driving experience that feels both refined and athletic. With its premium interior, aggressive styling, and commanding presence on the road, the X6 offers the perfect balance of luxury, technology, comfort, and performance.",
    deposit: "$400 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/bmw/x6/2943656"
  },
  {
    id: "mercedes-benz-glc-2025",
    name: "Mercedes-Benz GLC Coupe",
    year: 2025,
    category: "SUV",
    pricePerDay:200,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Executive rear seats, 4D surround, AR nav",
    features: ["150 miles/day included", "AMG Line package", "Energizing Comfort", "Panoramic sunroof", "Premium Michelin tires", "Apple CarPlay & Android Auto", "All-wheel drive (4MATIC)"],
    overview: "The 2025 Mercedes-Benz GLC 300 Coupe blends sleek coupe-inspired styling with modern luxury and everyday SUV practicality. Featuring the AMG Line and Night Package, this GLC Coupe delivers a sporty and refined driving experience with premium interior finishes, smooth turbocharged performance, and signature Mercedes-Benz comfort throughout. Whether you’re traveling for business, heading to the airport, or enjoying a night out in Atlanta, the GLC Coupe offers upscale styling and comfort with unmistakable road presence.",
    deposit: "$750 refundable deposit",
    insuranceRequirement: "Full coverage required; premium policy recommended",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/mercedes-benz/glc-class/3361316"
  },
  {
    id: "porsche-mecan-2025",
    name: "Porsche Macan",
    year: 2025,
    category: "SUV",
    pricePerDay:200,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Porsche all-wheel drive system, Panoramic sunroof, BOSE surround sound system",
    features: ["150 miles/day included", "Porsche all-wheel drive system", "Panoramic sunroof", "Bose surround sound system", "Apple CarPlay & Android Auto", "Adaptive cruise control", "GPS navigation"],
    overview: "The 2025 Porsche Macan delivers the signature Porsche driving experience in a refined and versatile luxury SUV package. With sharp handling, premium craftsmanship, and an unmistakably sporty character, the Macan stands out as one of the most engaging SUVs in its class. Finished with premium interior details and advanced technology throughout, this Macan is perfect for business travel, weekend trips, airport pickups, or anyone looking for a luxury SUV that feels both athletic and upscale.",
    deposit: "$400 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/porsche/macan/3618427"
  },
  {
    id: "porsche-mecan-2023",
    name: "Porsche Macan",
    year: 2023,
    category: "SUV",
    pricePerDay:200,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Porsche all-wheel drive system, Panoramic sunroof, Apple CarPlay & Android Auto",
    features: ["150 miles/day included", "Porsche all-wheel drive system", "Panoramic sunroof", "Apple CarPlay & Android Auto", "Adaptive cruise control", "GPS navigation"],
    overview: "The 2023 Porsche Macan combines Porsche performance, luxury craftsmanship, and everyday practicality into one of the most refined compact SUVs on the road. With responsive handling, a premium interior, and sleek understated styling, the Macan delivers a driving experience that feels sporty without sacrificing comfort. Whether you’re navigating Atlanta, traveling for business, or heading out for a weekend getaway, the Macan offers the perfect blend of luxury, technology, and versatility.",
    deposit: "$600 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/porsche/macan/3412905"
  },
  {
    id: "kia-telluride",
    name: "Kia Telluride",
    year: 2022,
    category: "SUV",
    pricePerDay:135,
    seats: 7,
    luggage: 4,
    airportReady: true,
    highlight: "Sunroof, Apple CarPlay & Android Auto, Adaptive cruise control",
    features: ["200 miles/day included", "Sunroof", "Apple CarPlay & Android Auto", "Adaptive cruise control", "Lane keeping assist", "GPS navigation", "Rear window sunshades"],
    overview: "The 2022 Kia Telluride EX is a spacious and upscale SUV designed to deliver comfort, practicality, and modern technology for every type of trip. With seating for up to 7 passengers, a refined interior, and smooth driving dynamics, the Telluride is ideal for family vacations, airport travel, business trips, or exploring Atlanta comfortably. Widely known for its premium feel and spacious cabin, this SUV offers an elevated experience with excellent versatility and everyday usability.",
    deposit: "$300 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/kia/telluride/3125159"
  },

  {
    id: "mercedes-benz-glc-2022",
    name: "Mercedes-Benz GLC Coupe",
    year: 2022,
    category: "SUV",
    pricePerDay:200,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "AMG Line package, Panoramic sunroof, Apple CarPlay & Android Auto",
    features: ["200 miles/day included", "AMG Line package", "Panoramic sunroof", "Apple CarPlay & Android Auto", "All-wheel drive (4MATIC)"],
    overview: "The 2022 Mercedes-Benz GLC 300 Coupe combines luxury SUV practicality with sleek coupe-inspired styling and premium Mercedes-Benz comfort. Featuring the AMG Line package, a refined interior, and smooth turbocharged performance, the GLC Coupe offers an upscale driving experience that feels both sporty and elegant. Perfect for business travel, airport trips, date nights, or exploring Atlanta in style, this SUV delivers comfort, technology, and standout road presence in one premium package.",
    deposit: "$450 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/mercedes-benz/glc-class/1947668"
  },
  {
    id: "ford-explorer-2023",
    name: "Ford Explorer",
    year: 2023,
    category: "SUV",
    pricePerDay:145,
    seats: 6,
    luggage: 4,
    airportReady: true,
    highlight: "All-wheel drive, Heated front seats, Panoramic sunroof",
    features: ["200 miles/day included", "All-wheel drive", "Panoramic sunroof", "Heated front seats", "Heated steering wheel", "Leather interior", "Apple CarPlay & Android Auto", "Lane keeping assist", "Lane departure warning", "GPS navigation"],
    overview: "The 2023 Ford Explorer XLT offers spacious comfort, modern technology, and everyday versatility in a refined midsize SUV package. With seating for up to 6 passengers, smooth all-wheel drive capability, and a well-appointed interior, the Explorer is perfect for family trips, airport travel, business travel, or exploring Atlanta comfortably. Combining practicality with premium features and a commanding road presence, this SUV is built to handle both daily driving and longer journeys with ease.",
    deposit: "$400 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/ford/explorer/3351936"
  },

  {
    id: "ford-bronco-sport-2024",
    name: "Ford Bronco Sport",
    year: 2024,
    category: "SUV",
    pricePerDay:125,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Heated steering wheel, All-wheel drive, Leather interior",
    features: ["200 miles/day included", "All-wheel drive", "Heated steering wheel", "Leather interior", "Premium Michelin tires", "Apple CarPlay & Android Auto","Lane keeping assist","GPS navigation"],
    overview: "The 2024 Ford Bronco Sport Outer Banks combines rugged styling, modern technology, and everyday comfort into a versatile SUV built for both city driving and weekend adventures. With its premium Outer Banks trim, smooth all-wheel drive capability, and refined interior, the Bronco Sport offers a unique blend of practicality and personality. Whether you're exploring Atlanta, heading out on a road trip, or simply looking for an SUV with standout styling and comfort, the Bronco Sport delivers a confident and enjoyable driving experience.",
    deposit: "$400 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/ford/bronco-sport/3416097"
  },

  {
    id: "bmw-3-series-2023",
    name: "BMW 330i",
    year: 2023,
    category: "Sedan",
    pricePerDay:150,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Panoramic sunroof, Head-up display, Apple CarPlay & Android Auto",
    features: ["200 miles/day included", "Panoramic sunroof", "Head-up display", "Apple CarPlay & Android Auto", "GPS navigation"],
    overview: "The 2023 BMW 330i delivers the perfect balance of luxury, performance, and everyday comfort in a sleek executive sedan package. Known for its smooth driving dynamics, refined interior, and upscale styling, the 330i offers a premium experience whether you’re traveling for business, exploring Atlanta, or simply enjoying the drive. With responsive turbocharged performance and modern technology throughout, this BMW blends sportiness and sophistication effortlessly.",
    deposit: "$700 refundable deposit",
    insuranceRequirement: "Full coverage required; premium policy recommended",
    turoURL: "https://turo.com/us/en/car-rental/united-states/atlanta-ga/bmw/3-series/3344731"
  },
  {
    id: "kia-sorento-2025",
    name: "Kia Sorento",
    year: 2025,
    category: "SUV",
    pricePerDay:135,
    seats: 7,
    luggage: 4,
    airportReady: true,
    highlight: "Heated front seats, Panoramic sunroof, Leather interior",
    features: ["200 miles/day included", "Heated front seats", "Panoramic sunroof", "Leather interior", "Apple CarPlay & Android Auto", "Adaptive cruise control","Lane keeping assist", "GPS navigation"],
    overview: "The 2025 Kia Sorento S offers the perfect combination of comfort, practicality, and modern technology in a stylish midsize SUV package. With seating for up to 7 passengers, a refined interior, and advanced driver assistance features throughout, the Sorento is ideal for family trips, airport travel, business travel, or everyday driving around Atlanta. Its smooth ride, spacious cabin, and premium touches make it a versatile SUV that feels elevated well beyond its class.",
    deposit: "$300 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/kia/sorento/3335929"
  },
  {
    id: "kia-k4-2025",
    name: "Kia K4",
    year: 2025,
    category: "Sedan",
    pricePerDay:100,
    seats: 5,
    luggage: 4,
    airportReady: true,
    highlight: "Sunroof, Apple CarPlay & Android Auto, Adaptive cruise control",
    features: ["200 miles/day included", "Sunroof", "Apple CarPlay & Android Auto", "Adaptive cruise control", "Lane keeping assist", "Blind spot monitoring"],
    overview: "The 2025 Kia K4 GT-Line delivers modern styling, impressive efficiency, and advanced technology in a sleek and comfortable sedan package. With its sporty GT-Line design, smooth driving experience, and premium interior touches, the K4 is perfect for daily driving, airport travel, business trips, or exploring Atlanta in comfort. Combining practicality with a sharp, upscale look, this sedan offers an elevated experience well beyond the typical compact car.",
    deposit: "$300 refundable deposit",
    insuranceRequirement: "Full coverage required",
    turoURL: "https://turo.com/us/en/car-rental/united-states/atlanta-ga/kia/k4/3360917"
  },
  {
    id: "mercedes-benz-glc-2024",
    name: "Mercedes-Benz GLC",
    year: 2024,
    category: "SUV",
    pricePerDay:175,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "Apple CarPlay & Android Auto, Cruise control, Cargo trunk cover",
    features: ["200 miles/day included", "Apple CarPlay & Android Auto", "Cruise control", "Cargo trunk cover"],
    overview: "The 2024 Mercedes-Benz GLC 300 delivers modern luxury, smooth performance, and everyday versatility in one of the most refined compact SUVs on the road. Featuring a sleek updated design, premium interior craftsmanship, and advanced technology throughout, the GLC offers a comfortable and upscale driving experience whether you’re traveling for business, heading to the airport, or exploring Atlanta. Combining comfort, efficiency, and signature Mercedes-Benz styling, this SUV is built for effortless luxury driving.",
    deposit: "$750 refundable deposit",
    insuranceRequirement: "Full coverage required; premium policy recommended",
    turoURL: "https://turo.com/us/en/suv-rental/united-states/atlanta-ga/mercedes-benz/glc-class/3500638"
  },
  {
    id: "mercedes-benz-e-350-2024",
    name: "Mercedes-Benz E-Class",
    year: 2024,
    category: "Sedan",
    pricePerDay:225,
    seats: 5,
    luggage: 3,
    airportReady: true,
    highlight: "All-wheel drive (4MATIC), Burmester 4D surround sound system, Nappa leather steering wheel",
    features: ["150 miles/day included", "All-wheel drive (4MATIC)","Panoramic sunroof", "Burmester 4D surround sound system", "Nappa leather steering wheel", "19\" Twin Multi-Spoke wheels", "Apple CarPlay & Android Auto", "GPS navigation"],
    overview: "The 2024 Mercedes-Benz E 350 Sedan delivers next-generation luxury, technology, and refinement in one of the most sophisticated executive sedans on the road. Featuring an elegant modern design, premium craftsmanship throughout the cabin, and an exceptionally smooth driving experience, the E-Class is built for effortless comfort and upscale travel. Whether you're arriving in Atlanta for business, heading to dinner, or simply looking for a premium luxury sedan experience, the E 350 blends advanced technology with timeless Mercedes-Benz luxury.",
    deposit: "$750 refundable deposit",
    insuranceRequirement: "Full coverage required; premium policy recommended",
    turoURL: "https://turo.com/us/en/car-rental/united-states/atlanta-ga/mercedes-benz/e-class/3640936"
  },
];
