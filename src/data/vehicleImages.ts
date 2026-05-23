import manifest from "./vehicleImageManifest.json";

//includes updated images for all vehicles
export const vehicleImages: Record<string, Record<string, string>> = {
  "mercedes-gle-2024": {
    "Cover Image": "/vehicles/mercedes-benz-amg-gle-53-coupe-cover-image.png",
    "Exterior — Front": "/vehicles/mercedes-benz-amg-gle-53-coupe-front-view.jpg",
    "Exterior — Rear": "/vehicles/mercedes-benz-amg-gle-53-coupe-rear-view.jpg",
    "Exterior — Wheel": "/vehicles/mercedes-benz-amg-gle-53-coupe-close-up-wheel-image.jpg",
    "Interior — Dashboard": "/vehicles/mercedes-benz-amg-gle-53-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "/vehicles/mercedes-benz-amg-gle-53-seats-image.jpg",
  },

  "chevrolet-corvette-2025": {
    "Cover Image": "/vehicles/chevrolet-corvette-stringray-2lt-convertible-2023-cover-image.png",
    "Exterior — Front": "/vehicles/chevrolet-corvette-stringray-2lt-convertible-2023-front-view.png",
    "Exterior — Rear": "/vehicles/chevrolet-corvette-stringray-2lt-convertible-2023-rear-view.jpg",
    "Exterior — Wheel": "/vehicles/chevrolet-corvette-stringray-2lt-convertible-2023-close-up-wheel-image.jpg",
    "Interior — Dashboard": "/vehicles/chevrolet-corvette-stringray-2lt-convertible-2023-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "/vehicles/chevrolet-corvette-stringray-2lt-convertible-2023-seats-image.jpg",
  },

  "porsche-cayenne-2023": {
    "Cover Image": "/vehicles/porsche-cayenne-2023-cover-image.png",
    "Exterior — Front": "/vehicles/porsche-cayenne-2023-front-view.jpg",
    "Exterior — Rear": "/vehicles/porsche-cayenne-2023-rear-view.jpg",
    "Exterior — Wheel": "/vehicles/porsche-cayenne-2023-close-up-wheel-image.jpg",
    "Interior — Dashboard": "/vehicles/porsche-cayenne-2023-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "/vehicles/porsche-cayenne-2023-seats-image.jpg",
  },

  "bmw-x6-2022": {
    "Cover Image": "/vehicles/bmw-x6-xdrive40i-2022-cover-image.png", 
    "Exterior — Front": "/vehicles/bmw-x6-xdrive40i-2022-front-view.jpg",
    "Exterior — Rear": "/vehicles/bmw-x6-xdrive40i-2022-rear-view.jpg",
    "Exterior — Wheel": "/vehicles/bmw-x6-xdrive40i-2022-close-up-wheel-image.jpg",
    "Interior — Dashboard": "/vehicles/bmw-x6-xdrive40i-2022-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "/vehicles/bmw-x6-xdrive40i-2022-seats-image.jpg",
  },

  "range-rover-hse-2024": {
    "Cover Image": "/vehicles/range-rover-hse-updated-front.jpg",
    "Exterior — Front": "/vehicles/range-rover-hse-updated-front.jpg",
    "Exterior — Side": "/vehicles/range-rover-hse-updated-sideview.jpg",
    "Exterior — Rear": "/vehicles/range-rover-hse-updated-backview.jpg",
    "Interior — Dashboard": "/vehicles/range-rover-hse-updated-dashboard.jpg",
    "Interior — Cabin": "/vehicles/range-rover-hse-updated-interior-front.jpg",
    "Interior — Rear Seats": "/vehicles/range-rover-hse-updated-interior-back.jpg",
  },

  "mercedes-benz-glc-2025": {
    "Cover Image": "/vehicles/mercedes-benz-glc-300-coupe-cover-image.png",
    "Exterior — Front": "/vehicles/mercedes-benz-glc-300-coupe-front-view.jpg",
    "Exterior — Rear": "/vehicles/mercedes-benz-glc-300-coupe-rear-view.jpg",
    "Exterior — Wheel": "/vehicles/mercedes-benz-glc-300-coupe-close-up-wheel-image.jpg",
    "Interior — Dashboard": "/vehicles/mercedes-benz-glc-300-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "/vehicles/mercedes-benz-glc-300-coupe-seats-image.jpg",
  },

  "porsche-mecan-2025": {
    "Cover Image": "/vehicles/porsche-macan-2025-cover-image.png",
    "Exterior — Front": "/vehicles/porsche-macan-2025-front-view.jpg",
    "Exterior — Rear": "/vehicles/porsche-macan-2025-rear-view.jpg",
    "Exterior — Wheel": "/vehicles/porsche-macan-2025-close-up-wheel-image.jpg",
    "Interior — Dashboard": "/vehicles/porsche-macan-2025-dashboard-interior-image.jpg",
    "Interior — Rear-Seats": "/vehicles/porsche-macan-2025-seats-image.jpg",
  },

  "porsche-mecan-2023": {
    "Cover Image": "/vehicles/porsche-macan-2023-cover-image.png",
    "Exterior — Front": "/vehicles/porsche-macan-2023-front-view.jpg",
    "Exterior — Rear": "/vehicles/porsche-macan-2023-rear-view.jpg",
    "Exterior — Wheel": "/vehicles/porsche-macan-2023-close-up-wheel-image.jpg",
    "Interior — Dashboard": "/vehicles/porsche-macan-2023-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "/vehicles/porsche-macan-2023-seats-image.jpg",
  },

  "kia-telluride": {
    "Cover Image": "/vehicles/kia-telluride-ex-2022-cover-image.png",
    "Exterior — Front": "/vehicles/kia-telluride-ex-2022-front-view.jpg",
    "Exterior — Rear": "/vehicles/kia-telluride-ex-2022-rear-view.jpg",
    "Exterior — Wheel": "/vehicles/kia-telluride-ex-2022-close-up-wheel-image.jpg",
    "Interior — Dashboard": "/vehicles/kia-telluride-ex-2022-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "/vehicles/kia-telluride-ex-2022-seats-image.jpg",
  },

  "mercedes-benz-glc-2022": {
    "Cover Image": "/vehicles/mercedes-benz-glc-300-2022-cover-image.png",
    "Exterior — Front": "/vehicles/mercedes-benz-glc-300-2022-front-view.jpg",
    "Exterior — Rear": "/vehicles/mercedes-benz-glc-300-2022-rear-view.jpg",
    "Exterior — Wheel": "/vehicles/mercedes-benz-glc-300-2022-close-up-wheel-image.jpg",
    "Interior — Dashboard": "/vehicles/mercedes-benz-glc-300-2022-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "/vehicles/mercedes-benz-glc-300-2022-seats-image.jpg",
  },

  "bmw-3-series-2023": {
    "Cover Image": "/vehicles/bmw-330i-2023-cover-image.png",
    "Exterior — Front": "/vehicles/bmw-330i-2023-front-view.jpg",
    "Exterior — Rear": "/vehicles/bmw-330i-2023-rear-view.jpg",
    "Exterior — Wheel": "/vehicles/bmw-330i-2023-close-up-wheel-image.jpg",
    "Interior — Dashboard": "/vehicles/bmw-330i-2023-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "/vehicles/bmw-330i-2023-seats-image.jpg",
  },

  "ford-explorer-2023": {
    "Cover Image": "/vehicles/ford-explorer-xlt-2023-cover-image.png",
    "Exterior — Front": "/vehicles/ford-explorer-xlt-2023-front-view.jpg",
    "Exterior — Rear": "/vehicles/ford-explorer-xlt-2023-rear-view.jpg",
    "Exterior — Wheel": "/vehicles/ford-explorer-xlt-2023-close-up-wheel-image.jpg",
    "Interior — Dashboard": "/vehicles/ford-explorer-xlt-2023-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "/vehicles/ford-explorer-xlt-2023-seats-image.jpg",
  },

  "ford-bronco-sport-2024": {
    "Cover Image": "/vehicles/ford-bronco-sport-outer-banks-2024-cover-image.png",
    "Exterior — Front": "/vehicles/ford-bronco-sport-outer-banks-2024-front-view.jpg",
    "Exterior — Rear": "/vehicles/ford-bronco-sport-outer-banks-2024-rear-view.jpg",
    "Exterior — Wheel": "/vehicles/ford-bronco-sport-outer-banks-2024-close-up-wheel-image.jpg",
    "Interior — Dashboard": "/vehicles/ford-bronco-sport-outer-banks-2024-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "/vehicles/ford-bronco-sport-outer-banks-2024-seats-image.jpg",
  },

  "kia-sorento-2025": {
    "Cover Image": "/vehicles/kia-sorento-s-2025-cover-image.png",
    "Exterior — Front": "/vehicles/kia-sorento-s-2025-front-view.jpg",
    "Exterior — Rear": "/vehicles/kia-sorento-s-2025-rear-view.jpg",
    "Exterior — Wheel": "/vehicles/kia-sorento-s-2025-close-up-wheel-image.jpg",
    "Interior — Dashboard": "/vehicles/kia-sorento-s-2025-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "/vehicles/kia-sorento-s-2025-seats-image.jpg",
  },

  "kia-k4-2025": {
    "Cover Image": "/vehicles/kia-gt-line-2025-cover-image.png",
    "Exterior — Front": "/vehicles/kia-gt-line-2025-front-view.jpg",
    "Exterior — Rear": "/vehicles/kia-gt-line-2025-rear-view.jpg",
    "Exterior — Wheel": "/vehicles/kia-gt-line-2025-close-up-wheel-image.jpg",
    "Interior — Dashboard": "/vehicles/kia-gt-line-2025-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "/vehicles/kia-gt-line-2025-seats-image.jpg",
  },

  "mercedes-benz-glc-2024": {
    "Cover Image": "/vehicles/mercedes-benz-glc-300-cover-image.png",
    "Exterior — Front": "/vehicles/mercedes-benz-glc-300-front-view.jpg",
    "Exterior — Rear": "/vehicles/mercedes-benz-glc-300-rear-view.jpg",
    "Exterior — Wheel": "/vehicles/mercedes-benz-glc-300-close-up-wheel-image.jpg",
    "Interior — Dashboard": "/vehicles/mercedes-benz-glc-300-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "/vehicles/mercedes-benz-glc-300-seats-image.jpg",
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