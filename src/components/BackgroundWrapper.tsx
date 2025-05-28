// src/components/BackgroundWrapper.tsx
import React from "react";
import bgPattern from "../assets/bg-patern.png";

const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgPattern})`,
        backgroundSize: "600px",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundWrapper;
