import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Customize from "./pages/Customize";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminPanel from "./pages/AdminPanel";
import LandingPage from "./pages/LandingPage";
import PromoCatalog from "./pages/PromoCatalog";
import GiftPage from "./pages/GiftPage"; // ✅ Nueva página
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookieConsent from "./components/CookieConsent"; // ✅ Banner cookies

const App = () => {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundImage: "url('/assets/pattern-bg.png')",
          backgroundSize: "600px",
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed",
          backgroundColor: "#f9fafa",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/customize" element={<Customize />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/promo" element={<LandingPage />} />
            <Route path="/promo-catalog" element={<PromoCatalog />} />
            <Route path="/gift" element={<GiftPage />} /> {/* ✅ Agregado */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent /> {/* ✅ Banner de cookies */}
      </div>
    </Router>
  );
};

export default App;
