import React from "react";

export default function PageWrapper({ children, maxWidth = 780, style = {} }) {
  return (
    <div style={{
      maxWidth,
      margin: "0 auto",
      padding: "40px 24px 80px",
      ...style,
    }}>
      {children}
    </div>
  );
}
