import React, { useEffect, useState } from "react";
import "./App.css";
import Shimmer from "./components/Shimmer";
function App() {
  const [product, setProduct] = useState([]); //to store the products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); //to store/trace the current page
  const [totalPages, setTotalPages] = useState(0);
  //to fetch the product details from API
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=8&skip=${page * 8 - 8}`
      );
      const data = await response.json();
      setProduct(data?.products || []);
      setTotalPages(Math.ceil(data?.total / 8));
    } catch (error) {
      setError("Failed to fetch products");
      console.error("Error while fetching data from API", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true)
    fetchProducts();
    window.scrollTo({ top: 0 });
  }, [page]); //empty dependency array because the products are fetch on every render only

  if(loading) return <Shimmer/>
  return (
    <div className="container">
      <h1 className="heading">🛍️ Product Gallery</h1>
      {error && <p className="status error">{error}</p>}

      <div className="products">
        {product
          .map((prod) => (
            <div className="product-card" key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title} />
              <h3>{prod.title}</h3>
              <p>${prod.price}</p>
            </div>
          ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          ◀ Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

export default App;
