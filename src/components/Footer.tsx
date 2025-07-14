import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#1e293b",
        color: "#fff",
        padding: "1.5rem 0",
        textAlign: "center",
        marginTop: "2rem",
        borderTop: "2px solid #334155",
      }}
    >
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Momen
          Mohamed
        </p>
      </aside>
    </footer>
  );
}
