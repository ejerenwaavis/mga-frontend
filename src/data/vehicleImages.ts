import manifest from "./vehicleImageManifest.json";

//includes updated images for all vehicles
export const vehicleImages: Record<string, Record<string, string>> = {
  "mercedes-gle-2024": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287343/mga/vehicles/mercedes-benz-amg-gle-53-coupe-cover-image.jpg",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287344/mga/vehicles/mercedes-benz-amg-gle-53-coupe-front-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287345/mga/vehicles/mercedes-benz-amg-gle-53-coupe-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287342/mga/vehicles/mercedes-benz-amg-gle-53-coupe-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287344/mga/vehicles/mercedes-benz-amg-gle-53-coupe-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287346/mga/vehicles/mercedes-benz-amg-gle-53-coupe-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287347/mga/vehicles/mercedes-benz-amg-gle-53-coupe-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287341/mga/vehicles/mercedes-benz-amg-gle-53-coupe-close-up-front-view.jpg",
  },

  "chevrolet-corvette-2025": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287247/mga/vehicles/chevrolet-corvette-stringray-2lt-convertible-2023-cover-image.jpg",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287250/mga/vehicles/chevrolet-corvette-stringray-2lt-convertible-2023-front-view.png",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287250/mga/vehicles/chevrolet-corvette-stringray-2lt-convertible-2023-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287246/mga/vehicles/chevrolet-corvette-stringray-2lt-convertible-2023-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287247/mga/vehicles/chevrolet-corvette-stringray-2lt-convertible-2023-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287252/mga/vehicles/chevrolet-corvette-stringray-2lt-convertible-2023-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287252/mga/vehicles/chevrolet-corvette-stringray-2lt-convertible-2023-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287245/mga/vehicles/chevrolet-corvette-stringray-2lt-convertible-2023-close-up-front-view.jpg",
  },

  "porsche-cayenne-2023": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287394/mga/vehicles/porsche-cayenne-2023-cover-image.png",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287396/mga/vehicles/porsche-cayenne-2023-front-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287399/mga/vehicles/porsche-cayenne-2023-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287392/mga/vehicles/porsche-cayenne-2023-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287395/mga/vehicles/porsche-cayenne-2023-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287401/mga/vehicles/porsche-cayenne-2023-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287404/mga/vehicles/porsche-cayenne-2023-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287391/mga/vehicles/porsche-cayenne-2023-close-up-front-view.jpg",
  },

  "bmw-x6-2022": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287238/mga/vehicles/bmw-x6-xdrive40i-2022-cover-image.png", 
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287240/mga/vehicles/bmw-x6-xdrive40i-2022-front-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287241/mga/vehicles/bmw-x6-xdrive40i-2022-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287237/mga/vehicles/bmw-x6-xdrive40i-2022-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287239/mga/vehicles/bmw-x6-xdrive40i-2022-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287241/mga/vehicles/bmw-x6-xdrive40i-2022-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287242/mga/vehicles/bmw-x6-xdrive40i-2022-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287236/mga/vehicles/bmw-x6-xdrive40i-2022-close-up-rear-view.jpg",
  },

  "range-rover-hse-2024": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287430/mga/vehicles/range-rover-hse-updated-cover-image.jpg",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287432/mga/vehicles/range-rover-hse-updated-front-view.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287435/mga/vehicles/range-rover-hse-updated-side-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287434/mga/vehicles/range-rover-hse-updated-rear-view.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287431/mga/vehicles/range-rover-hse-updated-dashboard.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287433/mga/vehicles/range-rover-hse-updated-interior-back.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287429/mga/vehicles/range-rover-hse-updated-close-up-wheel-image.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287428/mga/vehicles/range-rover-hse-updated-close-up-front-view.jpg",

  },

  "mercedes-benz-glc-2025": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287371/mga/vehicles/mercedes-benz-glc-300-coupe-cover-image.png",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287365/mga/vehicles/mercedes-benz-glc-300-2025-coupe-front-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287366/mga/vehicles/mercedes-benz-glc-300-2025-coupe-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287363/mga/vehicles/mercedes-benz-glc-300-2025-coupe-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287364/mga/vehicles/mercedes-benz-glc-300-2025-coupe-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287367/mga/vehicles/mercedes-benz-glc-300-2025-coupe-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287367/mga/vehicles/mercedes-benz-glc-300-2025-coupe-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287362/mga/vehicles/mercedes-benz-glc-300-2025-coupe-close-up-rear-view.jpg",
  },

  "porsche-mecan-2025": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287415/mga/vehicles/porsche-macan-2025-cover-image.png",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287417/mga/vehicles/porsche-macan-2025-front-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287417/mga/vehicles/porsche-macan-2025-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287414/mga/vehicles/porsche-macan-2025-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287416/mga/vehicles/porsche-macan-2025-dashboard-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287418/mga/vehicles/porsche-macan-2025-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287418/mga/vehicles/porsche-macan-2025-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287413/mga/vehicles/porsche-macan-2025-close-up-front-view.jpg",
  },

  "porsche-mecan-2023": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287408/mga/vehicles/porsche-macan-2023-cover-image.png",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287410/mga/vehicles/porsche-macan-2023-front-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287411/mga/vehicles/porsche-macan-2023-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287406/mga/vehicles/porsche-macan-2023-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287409/mga/vehicles/porsche-macan-2023-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287412/mga/vehicles/porsche-macan-2023-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287413/mga/vehicles/porsche-macan-2023-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287405/mga/vehicles/porsche-macan-2023-close-up-rear-view.jpg",
  },

  "kia-telluride": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287333/mga/vehicles/kia-telluride-ex-2022-cover-image.png",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287335/mga/vehicles/kia-telluride-ex-2022-front-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287335/mga/vehicles/kia-telluride-ex-2022-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287332/mga/vehicles/kia-telluride-ex-2022-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287334/mga/vehicles/kia-telluride-ex-2022-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287336/mga/vehicles/kia-telluride-ex-2022-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287337/mga/vehicles/kia-telluride-ex-2022-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287332/mga/vehicles/kia-telluride-ex-2022-close-up-rear-view.jpg",
  },

  "mercedes-benz-glc-2022": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287359/mga/vehicles/mercedes-benz-glc-300-2022-cover-image.png",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287373/mga/vehicles/mercedes-benz-glc-300-coupe-front-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287373/mga/vehicles/mercedes-benz-glc-300-coupe-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287370/mga/vehicles/mercedes-benz-glc-300-coupe-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287360/mga/vehicles/mercedes-benz-glc-300-2022-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287362/mga/vehicles/mercedes-benz-glc-300-2022-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287374/mga/vehicles/mercedes-benz-glc-300-coupe-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287369/mga/vehicles/mercedes-benz-glc-300-coupe-close-up-rear-view.jpg",
  },

  "bmw-3-series-2023": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287223/mga/vehicles/bmw-330i-2023-cover-image.png",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287225/mga/vehicles/bmw-330i-2023-front-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287226/mga/vehicles/bmw-330i-2023-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287221/mga/vehicles/bmw-330i-2023-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287224/mga/vehicles/bmw-330i-2023-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287229/mga/vehicles/bmw-330i-2023-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287229/mga/vehicles/bmw-330i-2023-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287220/mga/vehicles/bmw-330i-2023-close-up-front-view.jpg",
  },

  "ford-explorer-2023": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287297/mga/vehicles/ford-explorer-xlt-2023-cover-image.png",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287299/mga/vehicles/ford-explorer-xlt-2023-front-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287300/mga/vehicles/ford-explorer-xlt-2023-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287296/mga/vehicles/ford-explorer-xlt-2023-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287298/mga/vehicles/ford-explorer-xlt-2023-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287300/mga/vehicles/ford-explorer-xlt-2023-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287301/mga/vehicles/ford-explorer-xlt-2023-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287296/mga/vehicles/ford-explorer-xlt-2023-close-up-front-view.jpg",
  },

  "ford-bronco-sport-2024": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287287/mga/vehicles/ford-bronco-sport-outer-banks-2024-cover-image.png",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287289/mga/vehicles/ford-bronco-sport-outer-banks-2024-front-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287290/mga/vehicles/ford-bronco-sport-outer-banks-2024-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287285/mga/vehicles/ford-bronco-sport-outer-banks-2024-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287288/mga/vehicles/ford-bronco-sport-outer-banks-2024-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287291/mga/vehicles/ford-bronco-sport-outer-banks-2024-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287292/mga/vehicles/ford-bronco-sport-outer-banks-2024-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287284/mga/vehicles/ford-bronco-sport-outer-banks-2024-close-up-front-view.jpg",
  },

  "kia-sorento-2025": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287328/mga/vehicles/kia-sorento-s-2025-cover-image.png",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287330/mga/vehicles/kia-sorento-s-2025-front-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287330/mga/vehicles/kia-sorento-s-2025-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287327/mga/vehicles/kia-sorento-s-2025-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287328/mga/vehicles/kia-sorento-s-2025-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287331/mga/vehicles/kia-sorento-s-2025-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287331/mga/vehicles/kia-sorento-s-2025-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287326/mga/vehicles/kia-sorento-s-2025-close-up-front-view.jpg",
  },

  "kia-k4-2025": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287311/mga/vehicles/kia-gt-line-2025-cover-image.png",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287312/mga/vehicles/kia-gt-line-2025-front-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287314/mga/vehicles/kia-gt-line-2025-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287309/mga/vehicles/kia-gt-line-2025-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287312/mga/vehicles/kia-gt-line-2025-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287315/mga/vehicles/kia-gt-line-2025-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287316/mga/vehicles/kia-gt-line-2025-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287309/mga/vehicles/kia-gt-line-2025-close-up-front-view.jpg",
  },

  "mercedes-benz-glc-2024": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287376/mga/vehicles/mercedes-benz-glc-300-cover-image.png",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287377/mga/vehicles/mercedes-benz-glc-300-front-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287378/mga/vehicles/mercedes-benz-glc-300-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287369/mga/vehicles/mercedes-benz-glc-300-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287376/mga/vehicles/mercedes-benz-glc-300-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287379/mga/vehicles/mercedes-benz-glc-300-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287380/mga/vehicles/mercedes-benz-glc-300-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287368/mga/vehicles/mercedes-benz-glc-300-close-up-front-view.jpg",
  },

  "mercedes-benz-e-350-2024": {
    "Cover Image": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287349/mga/vehicles/mercedes-benz-e-350-2024-cover-image.png",
    "Exterior — Front": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287350/mga/vehicles/mercedes-benz-e-350-2024-front-view.jpg",
    "Exterior — Rear": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287351/mga/vehicles/mercedes-benz-e-350-2024-rear-view.jpg",
    "Exterior — Wheel": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287347/mga/vehicles/mercedes-benz-e-350-2024-close-up-wheel-image.jpg",
    "Interior — Dashboard": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287349/mga/vehicles/mercedes-benz-e-350-2024-dash-board-interior-image.jpg",
    "Interior — Rear-Seats": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287351/mga/vehicles/mercedes-benz-e-350-2024-seats-image.jpg",
    "Exterior — Side": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287352/mga/vehicles/mercedes-benz-e-350-2024-side-view.jpg",
    "Detail Shot": "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287350/mga/vehicles/mercedes-benz-e-350-2024-detail-shot.jpg",
  },
};







type ImageSize = "thumbnail" | "display";

/**
 * Returns the optimized WebP path for a given original image path.
 * Falls back to the original path if the optimized version isn't in the manifest.
 *
 * @param originalPath  e.g. "https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287235/mga/vehicles/BMW-X6-2022-side-exterior.jpg"
 * @param size          "thumbnail" (grid slots) | "display" (main viewer)
 */
export function getOptimizedImageUrl(originalPath: string, size: ImageSize): string {
  const fileName = originalPath.split("/").pop(); // e.g. "BMW-X6-2022-side-exterior.jpg"
  if (!fileName) return originalPath;

  const entry = (manifest as Record<string, Record<string, string>>)[fileName];
  return entry?.[size] ?? originalPath; // graceful fallback to original
}