export type LampName = "Zuzu" | "Kiki" | "Nono"; // ← Cambio aquí

export interface Lamp {
  id: string;
  name: LampName;
  description: string;
  price: number;
  imageUrl: string;
}

export interface Product extends Lamp {
  customName: string;
  shippingType: "standard" | "express";
}
