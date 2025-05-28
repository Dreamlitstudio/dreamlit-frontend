// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import "./assets/fonts/fonts.css";
import "./App.css"; // ✅ Fondo global

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <CartProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </CartProvider>
    </ChakraProvider>
  </React.StrictMode>
);
