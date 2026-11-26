import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { useFetch } from "../hooks/useFetch";
import { usePageTitle } from "../hooks/usePageTitle";
import { customerService } from "../services/customerService";

/** Lista de clientes com link para editar. */
export default function CustomersPage() {
  usePageTitle("Clientes");
  const { data: customers, loading, error, reload } = useFetch(customerService.list);

  if (loading) return <LoadingSpinner label="Carregando clientes..." />;
  if (error) return <ErrorMessage error={error} onRetry={reload} />;

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Clientes</h1>
        <Link to="/clientes/novo" className="btn btn-primary">
          Novo cliente
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <caption className="visually-hidden">Lista de clientes cadastrados</caption>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">Telefone</th>
              <th scope="col">Cidade</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.nome}</td>
                <td>{customer.email}</td>
                <td>{customer.telefone}</td>
                <td>
                  {customer.cidade}/{customer.uf}
                </td>
                <td>
                  <Link
                    to={`/clientes/${customer.id}/editar`}
                    className="btn btn-sm btn-outline-primary"
                    aria-label={`Editar ${customer.nome}`}
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
