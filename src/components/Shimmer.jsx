// Shimmer.js
import React from "react";

function Shimmer() {
  return (
    <div className="container-shimmer">
      <h1 className="heading">🛍️ Product Gallery</h1>
      <div className="products">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="product-card-shimmer" key={index}></div>
        ))}
      </div>
    </div>
  );
}

export default Shimmer;
