import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [product, setProduct] = useState([]); //to store the products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); //to store/trace the current page

  //to fetch the product details from API
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=100");
      const data = await response.json();
      setProduct(data?.products || []);
    } catch (error) {
      setError("Failed to fetch products");
      console.error("Error while fetching data from API", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);//empty dependency array because the products are fetch on every render only

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]); //whenever the page changes scroll to top of the window

  const productsPerPage = 8;
  const totalPages = Math.ceil(product.length / productsPerPage); //required pages to display all products

  return (
    <div className="container">
      <h1 className="heading">🛍️ Product Gallery</h1>
      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      <div className="products">
        {product
          .slice((page - 1) * productsPerPage, page * productsPerPage)
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
