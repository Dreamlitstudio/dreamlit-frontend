// src/data/lamps.ts

import zazaImage from "../assets/leon.png";
import kikiImage from "../assets/koala.png";
import nonoImage from "../assets/perro.png";
import { Lamp } from "../types/Lamp"; // ✅ Ruta correcta

const lamps: Lamp[] = [
  {
    id: "1",
    name: "Zaza",
    description: "Ideal para mesas de noche, escritorios y repisas. Personalización en acrílico para un toque único.",
    price: 5,
    imageUrl: zazaImage,
  },
  {
    id: "2",
    name: "Kiki",
    description: "Perfecto para espacios de juegos, estanterías y cuartos infantiles. Personalización en acrílico para un toque único.",
    price: 900,
    imageUrl: kikiImage,
  },
  {
    id: "3",
    name: "Nono",
    description: "Genial para acompañar la mesita de noche, el estudio o el rincón de lectura. Personalización en acrílico para un toque único.",
    price: 900,
    imageUrl: nonoImage,
  },
];

export default lamps;
