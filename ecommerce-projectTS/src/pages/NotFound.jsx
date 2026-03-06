import React from "react";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <p style={{ color: "red", fontWeight: "bold" }}>ERROR 404 (NOT FOUND)</p>
    </div>
  );
}
