// src/data/lamps.ts

import zuzuImage from "../assets/leon.png"; // Cambio de variable: zazaImage → zuzuImage
import kikiImage from "../assets/koala.png";
import nonoImage from "../assets/perro.png";
import { Lamp } from "../types/Lamp";

const lamps: Lamp[] = [
  {
    id: "1",
    name: "Zuzu", // <- Aquí está el cambio principal
    description:
      "Ideal para mesas de noche, escritorios y repisas. Personalización en acrílico para un toque único.",
    price: 900,
    imageUrl: zuzuImage,
  },
  {
    id: "2",
    name: "Kiki",
    description:
      "Perfecto para espacios de juegos, estanterías y cuartos infantiles. Personalización en acrílico para un toque único.",
    price: 900,
    imageUrl: kikiImage,
  },
  {
    id: "3",
    name: "Nono",
    description:
      "Genial para acompañar la mesita de noche, el estudio o el rincón de lectura. Personalización en acrílico para un toque único.",
    price: 900,
    imageUrl: nonoImage,
  },
];

export default lamps;
