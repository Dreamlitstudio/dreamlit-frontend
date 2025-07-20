// src/types/Lamp.ts

export type LampName = "Zaza" | "Kiki" | "Nono";

export interface Lamp {
  id: string;
  name: LampName;
  description: string;
  price: number;
  imageUrl: string;
}

// ✅ Producto completo con personalización y envío
export interface Product extends Lamp {
  customName: string;
  shippingType: "standard" | "express";
}
