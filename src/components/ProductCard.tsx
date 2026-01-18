import { useCart } from "../context/cartContext";
import type { Product } from "../types/products";
import "./productCard.css";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />

      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>

      <button
        disabled={!product.inStock}
        onClick={() => addToCart(product)}
        className={`product-button ${
          product.inStock ? "in-stock" : "out-of-stock"
        }`}
      >
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
};

export default ProductCard;
