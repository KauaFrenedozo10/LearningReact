/** Indicação de estoque do produto. */
export default function StockBadge({ stock }) {
  if (stock <= 0) return <span className="badge text-bg-secondary">Esgotado</span>;
  return <span className="badge text-bg-success">Em estoque: {stock}</span>;
}
