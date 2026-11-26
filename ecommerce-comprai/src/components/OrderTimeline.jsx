import { ORDER_STATUS, ORDER_STATUS_FLOW, ORDER_STATUS_LABELS } from "../config";

/**
 * Linha do tempo do pedido: pendente -> pago -> enviado -> entregue.
 * Pedido cancelado mostra apenas um aviso.
 * @param {{ status: string }} props - status atual do pedido.
 */
export default function OrderTimeline({ status }) {
  if (status === ORDER_STATUS.CANCELED) {
    return <div className="alert alert-danger">Este pedido foi cancelado.</div>;
  }

  const currentIndex = ORDER_STATUS_FLOW.indexOf(status);

  return (
    <ol className="list-group list-group-horizontal-md" aria-label="Linha do tempo do pedido">
      {ORDER_STATUS_FLOW.map((step, index) => {
        const isDone = index <= currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <li
            key={step}
            aria-current={isCurrent ? "step" : undefined}
            className={`list-group-item flex-fill ${isDone ? "list-group-item-success" : ""} ${isCurrent ? "fw-bold" : ""}`}
          >
            {isDone ? "✓ " : ""}
            {ORDER_STATUS_LABELS[step]}
          </li>
        );
      })}
    </ol>
  );
}
