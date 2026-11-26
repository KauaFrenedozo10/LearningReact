import { Link, useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductImage from "../components/ProductImage";
import StockBadge from "../components/StockBadge";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { useFetch } from "../hooks/useFetch";
import { usePageTitle } from "../hooks/usePageTitle";
import { productService } from "../services/productService";
import { formatCurrency } from "../utils/formatters";

/** Detalhes de um produto (rota dinâmica /produtos/:id) com indicação de estoque. */
export default function ProductDetailPage() {
  const { id } = useParams();
  const {
    data: product,
    loading,
    error,
    reload,
  } = useFetch(() => productService.getById(id), [id]);
  const { addItem } = useCart();
  const { showToast } = useToast();
  usePageTitle(product?.nome ?? "Produto");

  if (loading) return <LoadingSpinner label="Carregando produto..." />;
  if (error) {
    return (
      <>
        <ErrorMessage error={error} onRetry={reload} />
        <Link to="/">Voltar ao catálogo</Link>
      </>
    );
  }

  function handleAddToCart() {
    addItem(product);
    showToast(`${product.nome} foi adicionado ao carrinho.`);
  }

  return (
    <article className="row g-4">
      <div className="col-md-5">
        <ProductImage product={product} className="rounded" />
      </div>
      <div className="col-md-7">
        <h1>{product.nome}</h1>
        <p className="text-muted">{product.categoria}</p>
        <p>{product.descricao}</p>
        <p className="display-6">{formatCurrency(product.preco)}</p>
        <p>
          <StockBadge stock={product.estoque} />
        </p>
        <button
          type="button"
          className="btn btn-primary me-2"
          disabled={product.estoque <= 0}
          onClick={handleAddToCart}
        >
          Adicionar ao carrinho
        </button>
        <Link to="/" className="btn btn-outline-secondary">
          Voltar ao catálogo
        </Link>
      </div>
    </article>
  );
}
