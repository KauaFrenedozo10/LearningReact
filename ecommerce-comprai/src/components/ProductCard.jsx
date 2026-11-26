import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatters";
import ProductImage from "./ProductImage";
import StockBadge from "./StockBadge";

/**
 * Cartão de produto do catálogo.
 * @param {{ product: Object, onAddToCart: Function }} props
 *   onAddToCart(product) é chamada ao clicar no botão (o pai decide o que fazer).
 */
export default function ProductCard({ product, onAddToCart }) {
  const isOutOfStock = product.estoque <= 0;

  return (
    <article className="card h-100">
      <ProductImage product={product} className="card-img-top" />
      <div className="card-body d-flex flex-column">
        <h3 className="h5 card-title">
          <Link to={`/produtos/${product.id}`}>{product.nome}</Link>
        </h3>
        <p className="text-muted mb-1">{product.categoria}</p>
        <p className="fs-5 fw-bold mb-2">{formatCurrency(product.preco)}</p>
        <p>
          <StockBadge stock={product.estoque} />
        </p>
        <button
          type="button"
          className="btn btn-primary mt-auto"
          disabled={isOutOfStock}
          aria-label={`Adicionar ${product.nome} ao carrinho`}
          onClick={() => onAddToCart(product)}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}
