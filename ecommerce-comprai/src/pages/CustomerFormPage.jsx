import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddressFields from "../components/AddressFields";
import ErrorMessage from "../components/ErrorMessage";
import FormField from "../components/FormField";
import LoadingSpinner from "../components/LoadingSpinner";
import { useToast } from "../contexts/ToastContext";
import { useFetch } from "../hooks/useFetch";
import { useForm } from "../hooks/useForm";
import { usePageTitle } from "../hooks/usePageTitle";
import { customerService } from "../services/customerService";
import { validateCustomer } from "../utils/formRules";
import { maskCpf, maskPhone } from "../utils/masks";

const EMPTY_CUSTOMER = {
  nome: "",
  email: "",
  cpf: "",
  telefone: "",
  cep: "",
  endereco: "",
  numero: "",
  cidade: "",
  uf: "",
};

/** Cadastro (/clientes/novo) e edição (/clientes/:id/editar) de cliente. */
export default function CustomerFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  usePageTitle(isEditing ? "Editar cliente" : "Novo cliente");

  const {
    data: customer,
    loading,
    error,
    reload,
  } = useFetch(
    () => (isEditing ? customerService.getById(id) : Promise.resolve(EMPTY_CUSTOMER)),
    [id]
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={reload} />;
  return <CustomerForm customer={customer} customerId={id} isEditing={isEditing} />;
}

function CustomerForm({ customer, customerId, isEditing }) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useForm(customer, validateCustomer);

  async function saveCustomer(formValues) {
    setIsSaving(true);
    try {
      if (isEditing) await customerService.update(customerId, formValues);
      else await customerService.create(formValues);
      showToast(isEditing ? "Cliente atualizado com sucesso." : "Cliente cadastrado com sucesso.");
      navigate("/clientes");
    } catch (saveError) {
      showToast(saveError.message, "danger");
      setIsSaving(false);
    }
  }

  return (
    <section>
      <h1>{isEditing ? "Editar cliente" : "Novo cliente"}</h1>
      <form onSubmit={handleSubmit(saveCustomer)} noValidate className="col-lg-9">
        <fieldset>
          <legend className="h5">Dados pessoais</legend>
          <FormField
            name="nome"
            label="Nome completo"
            value={values.nome}
            error={errors.nome}
            onChange={handleChange}
            autoComplete="name"
          />
          <div className="row">
            <div className="col-md-6">
              <FormField
                name="email"
                label="E-mail"
                type="email"
                value={values.email}
                error={errors.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            <div className="col-md-3">
              <FormField
                name="cpf"
                label="CPF"
                value={values.cpf}
                error={errors.cpf}
                onChange={handleChange}
                mask={maskCpf}
                inputMode="numeric"
                hint="000.000.000-00"
              />
            </div>
            <div className="col-md-3">
              <FormField
                name="telefone"
                label="Telefone"
                type="tel"
                value={values.telefone}
                error={errors.telefone}
                onChange={handleChange}
                mask={maskPhone}
                autoComplete="tel"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="h5">Endereço</legend>
          <AddressFields values={values} errors={errors} onChange={handleChange} />
        </fieldset>

        <button type="submit" className="btn btn-primary me-2" disabled={isSaving}>
          {isSaving ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate("/clientes")}
        >
          Cancelar
        </button>
      </form>
    </section>
  );
}
