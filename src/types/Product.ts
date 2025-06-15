export interface Product {
  name: string;
  customName: string;
  imageUrl: string;
  price: number;
  shippingType: "standard" | "express";
}
