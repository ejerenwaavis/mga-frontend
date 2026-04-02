import cadillacEscalade from "@/assets/vehicles/cadillac-escalade-2024.jpg";
import bmwX5 from "@/assets/vehicles/bmw-x5-2024.jpg";
import mercedesGle from "@/assets/vehicles/mercedes-gle-2024.jpg";
import chevroletTahoe from "@/assets/vehicles/chevrolet-tahoe-2024.jpg";
import teslaModel3 from "@/assets/vehicles/tesla-model-3-2024.jpg";
import audiA6 from "@/assets/vehicles/audi-a6-2024.jpg";
import lexusEs from "@/assets/vehicles/lexus-es-2024.jpg";
import genesisG80 from "@/assets/vehicles/genesis-g80-2024.jpg";
import mercedesSClass from "@/assets/vehicles/mercedes-s-class-2024.jpg";
import porscheCayenne from "@/assets/vehicles/porsche-cayenne-2024.jpg";
import rangeRoverSport from "@/assets/vehicles/range-rover-sport-2024.jpg";
import bmw7Series from "@/assets/vehicles/bmw-7-series-2024.jpg";


import manifest from "./vehicleImageManifest.json";



export const vehicleImages: Record<string, Record<string, string>> = {
  "chevrolet-corvette-2025": {
    "Exterior — Front": "/vehicles/COVER-IMAGE-Chevrolet-Corvette.jpeg",
    "Exterior — Side": "/vehicles/Chevrolet-Corvette-side-ext.jpeg",
    "Exterior — Rear": "/vehicles/Chevrolet-Corvette-rear-ext.jpeg",
    "Interior — Dashboard": "/vehicles/ChevroletCorvette-dashboard.png",
    "Interior — Cabin": "/vehicles/Chevrolet-Corvette-cabin.jpeg",
    "Interior — Rear Seats": "/vehicles/Chevrolet-Corvette-seats.jpeg",
  },
  "porsche-cayenne-2023": {
    "Exterior — Front": "/vehicles/COVER-IMAGE-Porsche-Cayenne-2023.png",
    "Exterior — Side": "/vehicles/Porsche-Cayenne-2023-Side-Ext.png",
    "Exterior — Rear": "/vehicles/Porsche-Cayenne-2023-Rear-Ext.png",
    "Interior — Dashboard": "/vehicles/Porsche-Cayenne-2023-Dashboard.png",
    "Interior — Cabin": "/vehicles/Porsche-Cayenne-2023-Cabin.png",
    "Interior — Rear Seats": "/vehicles/Porsche-Cayenne-2023-Seats.png",
  },
  "bmw-x6-2022": {
    "Exterior — Front": "/vehicles/COVER-IMAGE-TURO-2022-BMW-X6.png",
    "Exterior — Side": "/vehicles/BMW-X6-2022-side-exterior.jpg",
    "Exterior — Rear": "/vehicles/BMW-X6-2022-rear-exterior.jpg",
    "Interior — Dashboard": "/vehicles/BMW-X6-2022-interior-dashboard.jpg",
    "Interior — Cabin": "/vehicles/BMW-X6-2022-interior-cabin.jpg",
    "Interior — Rear Seats": "/vehicles/BMW-X6-2022-interior-rear-seat.jpg",
  },
  "mercedes-benz-glc-2025": {
    "Exterior — Front": "/vehicles/COVER-IMAGE-TURO-2025-MERCEDES-BENZ-GLC-300-SUV-COUPE.png",
    "Exterior — Side": "/vehicles/mercedes-benz-glc-2025-ext-side.jpg",
    "Exterior — Rear": "/vehicles/mercedes-benz-glc-2025-ext-rear.jpg",
    "Interior — Dashboard": "/vehicles/mercedes-benz-glc-2025-dashboard.jpg",
    "Interior — Cabin": "/vehicles/mercedez-benz-glc-2025-cabin.jpg",
    "Interior — Rear Seats": "/vehicles/mercedez-benz-glc-2025-rear-seat.jpg",
  },
  "porsche-mecan-2025": {
    "Exterior — Front": "/vehicles/COVER-IMAGE-Porsche-Mecan-2025.png",
    "Exterior — Side": "/vehicles/Porsche-Mecan-2025-Side-Ext.png",
    "Exterior — Rear": "/vehicles/Porsche-Mecan-2025-Rear-Ext.png",
    "Interior — Dashboard": "/vehicles/Porsche-Mecan-2025-Dashboard.png",
    "Interior — Cabin": "/vehicles/Porsche-Mecan-2025-Cabin.png",
    "Interior — Rear Seats": "/vehicles/Porsche-Mecan-2025-Seats.png",
  },
  "porsche-mecan-2023": {
    "Exterior — Front": "/vehicles/COVER-IMAGE-TURO-2023-PORSCHE-MACAN.png",
    "Exterior — Side": "/vehicles/porsche-mecan-2023-ext-side.jpg",
    "Exterior — Rear": "/vehicles/porsche-mecan-2023-ext-rear.jpg",
    "Interior — Dashboard": "/vehicles/porsche-mecan-2023-dashboard.jpg",
    "Interior — Cabin": "/vehicles/porsche-mecan-2023-cabin.jpg",
    "Interior — Rear Seats": "/vehicles/porsche-mecan-2023-rear-seats.jpg",
  },
  "kia-telluride": {
    "Exterior — Front": "/vehicles/COVER-IMAGE-TURO-2022-KIA-TELLURIDE.png",
    "Exterior — Side": "/vehicles/kia-2022-teluride-side-exterior.jpg",
    "Exterior — Rear": "/vehicles/kia-2022-teluride-read-exterior.jpg",
    "Interior — Dashboard": "/vehicles/kia-2022-teluride-interior-dashboard.jpg",
    "Interior — Cabin": "/vehicles/kia-2022-teluride-cabin-interior.jpg",
    "Interior — Rear Seats": "/vehicles/kia-2022-teluride-rear-seat-interior.jpg",
  },
  "mercedes-benz-glc-2022": {
    "Exterior — Front": "/vehicles/COVER-IMAGE-TURO-2022-MERCEDES-BENZ-GLC-300-SUV-COUPE.png",
    "Exterior — Side": "/vehicles/benz-glc-2022-side-exterior.jpg",
    "Exterior — Rear": "/vehicles/benz-glc-2022-rear-exterior.jpg",
    "Interior — Dashboard": "/vehicles/benz-glc-2022-interior-dashboard.jpg",
    "Interior — Cabin": "/vehicles/benz-glc-2022-interior-cabin.jpg",
    "Interior — Rear Seats": "/vehicles/benz-glc-2022-rear-seats.jpg.jpg",
  },
  "bmw-3-series-2023": {
    "Exterior — Front": "/vehicles/COVER-IMAGE-TURO-2023-BMW-3-SERIES-330I.png",
    "Exterior — Side": "/vehicles/bmw-3-series-2023-ext-side.jpg",
    "Exterior — Rear": "/vehicles/bmw-3-series-2023-ext-rear.jpg",
    "Interior — Dashboard": "/vehicles/bmw-3-series-2023-dashboard.jpg",
    "Interior — Cabin": "/vehicles/bmw-3-series-2023-int-cabin.jpg",
    "Interior — Rear Seats": "/vehicles/bmw-3-series-2023-rear-seat.jpg",
  },
  "ford-explorer-2023": {
    "Exterior — Front": "/vehicles/COVER-IMAGE-TURO-2023-FORD-EXPLORER.png",
    "Exterior — Side": "/vehicles/ford-explorer-2023-ext-side.jpg",
    "Exterior — Rear": "/vehicles/ford-explorer-2023-ext-rear.jpg",
    "Interior — Dashboard": "/vehicles/ford-explorer-2023-dashboard.jpg",
    "Interior — Cabin": "/vehicles/ford-explorer-2023-int-cabin.jpg",
    "Interior — Rear Seats": "/vehicles/ford-explorer-2023-rear-seats.jpg",
  },
  "ford-bronco-sport-2024": {
    "Exterior — Front": "/vehicles/COVER-IMAGE-TURO-2024-FORD-BRONCO-SPORT.png",
    "Exterior — Side": "/vehicles/ford-bronco-2024-ext-sde.jpg",
    "Exterior — Rear": "/vehicles/ford-bronco-2024-ext-rear.jpg",
    "Interior — Dashboard": "/vehicles/ford-bronco-2024-dashboard.jpg",
    "Interior — Cabin": "/vehicles/ford-bronco-2024-int-cabin.jpg",
    "Interior — Rear Seats": "/vehicles/ford-bronco-2024-rear-seat.jpg",
  },
  "kia-sorento-2025": {
    "Exterior — Front": "/vehicles/COVER-IMAGE-TURO-2025-KIA-SORENTO.png",
    "Exterior — Side": "/vehicles/kia-sorento-2025-ext-side.jpg",
    "Exterior — Rear": "/vehicles/kia-sorento-2025-ext-rear.jpg",
    "Interior — Dashboard": "/vehicles/kia-sorento-2025-dashboard.jpg",
    "Interior — Cabin": "/vehicles/kia-sorento-2025-cabin.jpg",
    "Interior — Rear Seats": "/vehicles/kia-sorento-2025-rear-seat.jpg",
  },

  "kia-k4-2025": {
    "Exterior — Front": "/vehicles/COVER-IMAGE-TURO-2024-KIA-K4.png",
    "Exterior — Side": "/vehicles/kia-k4-2024-ext-side.jpg",
    "Exterior — Rear": "/vehicles/kia-k4-2024-ext-rear.jpg",
    "Interior — Dashboard": "/vehicles/kia-k4-2024-dashboard.jpg",
    "Interior — Cabin": "/vehicles/kia-k4-2024-cabin.jpg",
    "Interior — Rear Seats": "/vehicles/kia-k4-2024-rear-seat.jpg",
  },
  "mercedes-benz-glc-2024": {
    "Exterior — Front": "/vehicles/COVER-IMAGE-TURO -2024-MERCEDES-BENZ-GLC-300-SUV.png",
    "Exterior — Side": "/vehicles/benz-glc-2024-ext-side.jpg",
    "Exterior — Rear": "/vehicles/benz-glc-2024-ext-rear.jpg",
    "Interior — Dashboard": "/vehicles/benz-glc-2024-dashboard.jpg",
    "Interior — Cabin": "/vehicles/benz-glc-2024-cabin.jpg",
    "Interior — Rear Seats": "/vehicles/benz-glc-2024-rear-seat.jpg",
  },
};







type ImageSize = "thumbnail" | "display";

/**
 * Returns the optimized WebP path for a given original image path.
 * Falls back to the original path if the optimized version isn't in the manifest.
 *
 * @param originalPath  e.g. "/vehicles/BMW-X6-2022-side-exterior.jpg"
 * @param size          "thumbnail" (grid slots) | "display" (main viewer)
 */
export function getOptimizedImageUrl(originalPath: string, size: ImageSize): string {
  const fileName = originalPath.split("/").pop(); // e.g. "BMW-X6-2022-side-exterior.jpg"
  if (!fileName) return originalPath;

  const entry = (manifest as Record<string, Record<string, string>>)[fileName];
  return entry?.[size] ?? originalPath; // graceful fallback to original
}