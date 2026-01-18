import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { getAllProducts, getProductsByCategory } from "./services/product";
import type { Product } from "./types/products";
import "./index.css";
import { useCart } from "./context/cartContext";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart } = useCart();

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const filterByCategory = async (category?: string) => {
    setLoading(true);
    const data = category
      ? await getProductsByCategory(category)
      : await getAllProducts();
    setProducts(data);
    setLoading(false);
  };

  return (
    <div className="app-container">
      <div className="app-wrapper">
        {/* Header */}
        <div className="header">
          <h1>Products</h1>
          <span>Cart: {cart.length}</span>
        </div>

        {/* Filters */}
        <div className="filters">
          <button onClick={() => filterByCategory()}>All</button>
          <button onClick={() => filterByCategory("Apparel")}>Apparel</button>
        </div>

        {/* Products */}
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          <div className="products-grid">
            {products.length > 0 &&
              products.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
