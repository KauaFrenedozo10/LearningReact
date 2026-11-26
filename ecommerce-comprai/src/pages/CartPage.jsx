import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { formatCurrency } from "../utils/formatters";

/** Carrinho: alterar quantidades, remover itens e ver subtotais e total. */
export default function CartPage() {
  usePageTitle("Carrinho");
  const { items, total, setQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <section>
        <h1>Carrinho</h1>
        <p>Seu carrinho está vazio.</p>
        <Link to="/" className="btn btn-primary">
          Ver catálogo
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Carrinho</h1>
      <div className="table-responsive">
        <table className="table align-middle">
          <caption className="visually-hidden">Itens do carrinho</caption>
          <thead>
            <tr>
              <th scope="col">Produto</th>
              <th scope="col">Preço</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Subtotal</th>
              <th scope="col">
                <span className="visually-hidden">Remover</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.produtoId}>
                <td>{item.nome}</td>
                <td>{formatCurrency(item.preco)}</td>
                <td>
                  <input
                    type="number"
                    className="form-control quantity-input"
                    min="1"
                    max={item.estoque}
                    value={item.quantidade}
                    aria-label={`Quantidade de ${item.nome}`}
                    onChange={(event) => setQuantity(item.produtoId, Number(event.target.value))}
                  />
                </td>
                <td>{formatCurrency(item.preco * item.quantidade)}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    aria-label={`Remover ${item.nome} do carrinho`}
                    onClick={() => removeItem(item.produtoId)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan={3} className="text-end">
                Total
              </th>
              <td colSpan={2} className="fw-bold fs-5">
                {formatCurrency(total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Link to="/checkout" className="btn btn-success">
        Finalizar compra
      </Link>
    </section>
  );
}
