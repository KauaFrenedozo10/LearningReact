import { useState } from "react";
import FormField from "../components/FormField";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { useFetch } from "../hooks/useFetch";
import { usePageTitle } from "../hooks/usePageTitle";
import { productService } from "../services/productService";
import { filterProducts, getCategories } from "../utils/productFilters";

const EMPTY_FILTERS = { search: "", category: "", minPrice: "", maxPrice: "" };

/** Catálogo: grade de produtos com busca por nome, filtro de categoria e faixa de preço. */
export default function CatalogPage() {
  usePageTitle("Catálogo");
  const { data: products, loading, error, reload } = useFetch(productService.list);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleFilterChange = (name, value) =>
    setFilters((current) => ({ ...current, [name]: value }));

  function handleAddToCart(product) {
    addItem(product);
    showToast(`${product.nome} foi adicionado ao carrinho.`);
  }

  if (loading) return <LoadingSpinner label="Carregando produtos..." />;
  if (error) return <ErrorMessage error={error} onRetry={reload} />;

  const visibleProducts = filterProducts(products, filters);

  return (
    <section>
      <h1>Catálogo de produtos</h1>

      <form
        role="search"
        aria-label="Filtrar produtos"
        className="row g-2 mb-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="col-12 col-md-6 col-lg-4">
          <FormField
            name="search"
            label="Buscar por nome"
            type="search"
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <FormField
            name="category"
            label="Categoria"
            type="select"
            placeholder="Todas"
            options={getCategories(products)}
            value={filters.category}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-6 col-lg-2">
          <FormField
            name="minPrice"
            label="Preço mínimo"
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-6 col-lg-2">
          <FormField
            name="maxPrice"
            label="Preço máximo"
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-12 col-lg-1 d-flex align-items-center">
          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={() => setFilters(EMPTY_FILTERS)}
          >
            Limpar
          </button>
        </div>
      </form>

      <p aria-live="polite">{visibleProducts.length} produto(s) encontrado(s).</p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {visibleProducts.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
    </section>
  );
}
