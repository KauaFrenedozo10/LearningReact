import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import FormField from "../components/FormField";
import LoadingSpinner from "../components/LoadingSpinner";
import { useToast } from "../contexts/ToastContext";
import { useFetch } from "../hooks/useFetch";
import { useForm } from "../hooks/useForm";
import { usePageTitle } from "../hooks/usePageTitle";
import { productService } from "../services/productService";
import { validateProduct } from "../utils/formRules";

const EMPTY_PRODUCT = { nome: "", descricao: "", categoria: "", preco: "", estoque: "" };

/** Cadastro (/admin/produtos/novo) e edição (/admin/produtos/:id/editar) de produto. */
export default function ProductFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  usePageTitle(isEditing ? "Editar produto" : "Novo produto");

  // No cadastro não há nada para buscar; na edição carregamos o produto antes de mostrar o formulário.
  const {
    data: product,
    loading,
    error,
    reload,
  } = useFetch(
    () => (isEditing ? productService.getById(id) : Promise.resolve(EMPTY_PRODUCT)),
    [id]
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={reload} />;
  return <ProductForm product={product} productId={id} isEditing={isEditing} />;
}

function ProductForm({ product, productId, isEditing }) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      nome: product.nome,
      descricao: product.descricao,
      categoria: product.categoria,
      preco: String(product.preco),
      estoque: String(product.estoque),
    },
    validateProduct
  );

  async function saveProduct(formValues) {
    const payload = {
      nome: formValues.nome.trim(),
      descricao: formValues.descricao.trim(),
      categoria: formValues.categoria.trim(),
      preco: Number(formValues.preco),
      estoque: Number(formValues.estoque),
    };
    setIsSaving(true);
    try {
      if (isEditing) await productService.update(productId, payload);
      else await productService.create(payload);
      showToast(isEditing ? "Produto atualizado com sucesso." : "Produto cadastrado com sucesso.");
      navigate("/admin/produtos");
    } catch (saveError) {
      showToast(saveError.message, "danger");
      setIsSaving(false);
    }
  }

  return (
    <section>
      <h1>{isEditing ? "Editar produto" : "Novo produto"}</h1>
      <form onSubmit={handleSubmit(saveProduct)} noValidate className="col-lg-8">
        <FormField
          name="nome"
          label="Nome"
          value={values.nome}
          error={errors.nome}
          onChange={handleChange}
        />
        <FormField
          name="descricao"
          label="Descrição"
          type="textarea"
          value={values.descricao}
          error={errors.descricao}
          onChange={handleChange}
        />
        <FormField
          name="categoria"
          label="Categoria"
          value={values.categoria}
          error={errors.categoria}
          onChange={handleChange}
        />
        <div className="row">
          <div className="col-md-6">
            <FormField
              name="preco"
              label="Preço (R$)"
              type="number"
              min="0"
              step="0.01"
              value={values.preco}
              error={errors.preco}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <FormField
              name="estoque"
              label="Estoque (unidades)"
              type="number"
              min="0"
              step="1"
              value={values.estoque}
              error={errors.estoque}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary me-2" disabled={isSaving}>
          {isSaving ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate("/admin/produtos")}
        >
          Cancelar
        </button>
      </form>
    </section>
  );
}
