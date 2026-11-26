import { ORDER_STATUS_BADGE, ORDER_STATUS_LABELS } from "../config";

/** Selo colorido com o status do pedido (o texto garante que a cor não é a única informação). */
export default function StatusBadge({ status }) {
  return (
    <span className={`badge ${ORDER_STATUS_BADGE[status]}`}>{ORDER_STATUS_LABELS[status]}</span>
  );
}
