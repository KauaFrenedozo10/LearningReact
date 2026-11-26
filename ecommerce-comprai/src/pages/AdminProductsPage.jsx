import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { useToast } from "../contexts/ToastContext";
import { useFetch } from "../hooks/useFetch";
import { usePageTitle } from "../hooks/usePageTitle";
import { productService } from "../services/productService";
import { formatCurrency } from "../utils/formatters";

/** Área administrativa: lista de produtos com editar e excluir (com confirmação). */
export default function AdminProductsPage() {
  usePageTitle("Administrar produtos");
  const { data: products, loading, error, reload } = useFetch(productService.list);
  const [productToDelete, setProductToDelete] = useState(null);
  const { showToast } = useToast();

  async function handleConfirmDelete() {
    try {
      await productService.remove(productToDelete.id);
      showToast(`Produto "${productToDelete.nome}" excluído.`);
      reload();
    } catch (deleteError) {
      showToast(deleteError.message, "danger");
    } finally {
      setProductToDelete(null);
    }
  }

  if (loading) return <LoadingSpinner label="Carregando produtos..." />;
  if (error) return <ErrorMessage error={error} onRetry={reload} />;

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Administrar produtos</h1>
        <Link to="/admin/produtos/novo" className="btn btn-primary">
          Novo produto
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <caption className="visually-hidden">Lista de produtos cadastrados</caption>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Categoria</th>
              <th scope="col">Preço</th>
              <th scope="col">Estoque</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.nome}</td>
                <td>{product.categoria}</td>
                <td>{formatCurrency(product.preco)}</td>
                <td>{product.estoque}</td>
                <td className="text-nowrap">
                  <Link
                    to={`/admin/produtos/${product.id}/editar`}
                    className="btn btn-sm btn-outline-primary me-2"
                    aria-label={`Editar ${product.nome}`}
                  >
                    Editar
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    aria-label={`Excluir ${product.nome}`}
                    onClick={() => setProductToDelete(product)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {productToDelete && (
        <ConfirmModal
          title="Excluir produto"
          message={`Tem certeza que deseja excluir "${productToDelete.nome}"? Esta ação não pode ser desfeita.`}
          confirmLabel="Excluir"
          onConfirm={handleConfirmDelete}
          onCancel={() => setProductToDelete(null)}
        />
      )}
    </section>
  );
}
