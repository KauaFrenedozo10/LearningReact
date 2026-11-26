import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import OrderTimeline from "../components/OrderTimeline";
import StatusBadge from "../components/StatusBadge";
import {
  ORDER_STATUS,
  ORDER_STATUS_FLOW,
  ORDER_STATUS_LABELS,
  PAYMENT_METHOD_LABELS,
} from "../config";
import { useToast } from "../contexts/ToastContext";
import { useFetch } from "../hooks/useFetch";
import { usePageTitle } from "../hooks/usePageTitle";
import { orderService } from "../services/orderService";
import { formatCurrency, formatDate } from "../utils/formatters";

/** @returns {string|null} próximo status do fluxo normal, ou null se o pedido já terminou/foi cancelado. */
function getNextStatus(status) {
  const index = ORDER_STATUS_FLOW.indexOf(status);
  return index === -1 ? null : (ORDER_STATUS_FLOW[index + 1] ?? null);
}

/** Detalhes do pedido (/pedidos/:id): itens, linha do tempo e ações de status. */
export default function OrderDetailPage() {
  const { id } = useParams();
  const { data: order, loading, error, reload } = useFetch(() => orderService.getById(id), [id]);
  const [isCancelling, setIsCancelling] = useState(false);
  const { showToast } = useToast();
  usePageTitle(`Pedido ${id}`);

  async function changeStatus(newStatus) {
    try {
      await orderService.updateStatus(order.id, newStatus);
      showToast(`Status atualizado para "${ORDER_STATUS_LABELS[newStatus]}".`);
      reload();
    } catch (updateError) {
      showToast(updateError.message, "danger");
    }
  }

  if (loading) return <LoadingSpinner label="Carregando pedido..." />;
  if (error) {
    return (
      <>
        <ErrorMessage error={error} onRetry={reload} />
        <Link to="/pedidos">Voltar aos pedidos</Link>
      </>
    );
  }

  const nextStatus = getNextStatus(order.status);
  const canCancel =
    order.status !== ORDER_STATUS.CANCELED && order.status !== ORDER_STATUS.DELIVERED;

  return (
    <section>
      <h1>
        Pedido nº {order.id} <StatusBadge status={order.status} />
      </h1>
      <p>
        Realizado em {formatDate(order.criadoEm)} por <strong>{order.clienteNome}</strong> —
        pagamento: {PAYMENT_METHOD_LABELS[order.formaPagamento]}
      </p>
      <p>
        Entrega: {order.endereco.endereco}, {order.endereco.numero} — {order.endereco.cidade}/
        {order.endereco.uf} — CEP {order.endereco.cep}
      </p>

      <h2 className="h4">Acompanhamento</h2>
      <OrderTimeline status={order.status} />

      <h2 className="h4 mt-4">Itens</h2>
      <div className="table-responsive">
        <table className="table">
          <caption className="visually-hidden">Itens do pedido</caption>
          <thead>
            <tr>
              <th scope="col">Produto</th>
              <th scope="col">Preço</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.itens.map((item) => (
              <tr key={item.produtoId}>
                <td>{item.nome}</td>
                <td>{formatCurrency(item.preco)}</td>
                <td>{item.quantidade}</td>
                <td>{formatCurrency(item.preco * item.quantidade)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan={3} className="text-end">
                Total
              </th>
              <td className="fw-bold">{formatCurrency(order.total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="d-flex gap-2 flex-wrap">
        {nextStatus && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => changeStatus(nextStatus)}
          >
            Marcar como {ORDER_STATUS_LABELS[nextStatus].toLowerCase()}
          </button>
        )}
        {canCancel && (
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => setIsCancelling(true)}
          >
            Cancelar pedido
          </button>
        )}
        <Link to="/pedidos" className="btn btn-outline-secondary">
          Voltar aos pedidos
        </Link>
      </div>

      {isCancelling && (
        <ConfirmModal
          title="Cancelar pedido"
          message={`Deseja cancelar o pedido nº ${order.id}?`}
          confirmLabel="Cancelar pedido"
          onConfirm={() => {
            setIsCancelling(false);
            changeStatus(ORDER_STATUS.CANCELED);
          }}
          onCancel={() => setIsCancelling(false)}
        />
      )}
    </section>
  );
}
