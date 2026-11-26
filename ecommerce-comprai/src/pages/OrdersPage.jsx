import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import FormField from "../components/FormField";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";
import { ORDER_STATUS, ORDER_STATUS_LABELS } from "../config";
import { useFetch } from "../hooks/useFetch";
import { usePageTitle } from "../hooks/usePageTitle";
import { orderService } from "../services/orderService";
import { formatCurrency, formatDate } from "../utils/formatters";

const STATUS_OPTIONS = Object.values(ORDER_STATUS).map((status) => ({
  value: status,
  label: ORDER_STATUS_LABELS[status],
}));

/** Lista de pedidos (mais recentes primeiro) com filtro por status. */
export default function OrdersPage() {
  usePageTitle("Pedidos");
  const { data: orders, loading, error, reload } = useFetch(orderService.list);
  const [statusFilter, setStatusFilter] = useState("");

  if (loading) return <LoadingSpinner label="Carregando pedidos..." />;
  if (error) return <ErrorMessage error={error} onRetry={reload} />;

  const visibleOrders = orders
    .filter((order) => statusFilter === "" || order.status === statusFilter)
    .sort((a, b) => b.id - a.id);

  return (
    <section>
      <h1>Pedidos</h1>
      <div className="col-md-4">
        <FormField
          name="status"
          label="Filtrar por status"
          type="select"
          placeholder="Todos"
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={(_name, value) => setStatusFilter(value)}
        />
      </div>

      {visibleOrders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <caption className="visually-hidden">Lista de pedidos</caption>
            <thead>
              <tr>
                <th scope="col">Nº</th>
                <th scope="col">Data</th>
                <th scope="col">Cliente</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
                <th scope="col">
                  <span className="visually-hidden">Detalhes</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{formatDate(order.criadoEm)}</td>
                  <td>{order.clienteNome}</td>
                  <td>{formatCurrency(order.total)}</td>
                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                  <td>
                    <Link
                      to={`/pedidos/${order.id}`}
                      aria-label={`Ver detalhes do pedido ${order.id}`}
                    >
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
