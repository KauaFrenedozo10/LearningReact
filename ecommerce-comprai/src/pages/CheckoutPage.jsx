import { useState } from "react";
import { Link } from "react-router-dom";
import AddressFields from "../components/AddressFields";
import ErrorMessage from "../components/ErrorMessage";
import FormField from "../components/FormField";
import LoadingSpinner from "../components/LoadingSpinner";
import { PAYMENT_METHODS, PAYMENT_METHOD_LABELS, PAYMENT_RESULT } from "../config";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { useFetch } from "../hooks/useFetch";
import { useForm } from "../hooks/useForm";
import { usePageTitle } from "../hooks/usePageTitle";
import { customerService } from "../services/customerService";
import { placeOrder } from "../services/checkoutService";
import { validateCheckout } from "../utils/formRules";
import { formatCurrency } from "../utils/formatters";
import { maskCard } from "../utils/masks";

const INITIAL_VALUES = {
  clienteId: "",
  useOtherAddress: false,
  cep: "",
  endereco: "",
  numero: "",
  cidade: "",
  uf: "",
  paymentMethod: PAYMENT_METHODS.PIX,
  cardNumber: "",
};

const RESULT_MESSAGES = {
  [PAYMENT_RESULT.APPROVED]: {
    variant: "success",
    text: "Pagamento aprovado! Seu pedido está pago.",
  },
  [PAYMENT_RESULT.DECLINED]: {
    variant: "danger",
    text: "Pagamento recusado. O pedido foi cancelado.",
  },
  [PAYMENT_RESULT.PENDING]: {
    variant: "warning",
    text: "Pagamento pendente. O pedido aguarda a confirmação.",
  },
};

const pickAddress = ({ endereco, numero, cidade, cep, uf }) => ({
  endereco,
  numero,
  cidade,
  cep,
  uf,
});

/** Checkout: cliente, endereço, forma de pagamento e resultado simulado. */
export default function CheckoutPage() {
  usePageTitle("Finalizar compra");
  const { items, total, clearCart } = useCart();
  const { data: customers, loading, error, reload } = useFetch(customerService.list);
  const { showToast } = useToast();
  const [outcome, setOutcome] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useForm(INITIAL_VALUES, validateCheckout);

  if (outcome) return <PaymentResult outcome={outcome} />;
  if (items.length === 0) {
    return (
      <section>
        <h1>Finalizar compra</h1>
        <p>Seu carrinho está vazio.</p>
        <Link to="/">Voltar ao catálogo</Link>
      </section>
    );
  }
  if (loading) return <LoadingSpinner label="Carregando clientes..." />;
  if (error) return <ErrorMessage error={error} onRetry={reload} />;

  const customer = customers.find((candidate) => String(candidate.id) === values.clienteId);

  async function submitOrder(formValues) {
    setIsSubmitting(true);
    try {
      const result = await placeOrder({
        customer,
        address: pickAddress(formValues.useOtherAddress ? formValues : customer),
        items,
        paymentMethod: formValues.paymentMethod,
        cardNumber: formValues.cardNumber,
      });
      clearCart();
      setOutcome(result);
    } catch (orderError) {
      showToast(orderError.message, "danger");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h1>Finalizar compra</h1>
      <p>
        {items.length} item(ns) — total <strong>{formatCurrency(total)}</strong>
      </p>

      <form onSubmit={handleSubmit(submitOrder)} noValidate className="col-lg-8">
        <fieldset className="mb-4">
          <legend className="h5">Cliente e endereço de entrega</legend>
          <FormField
            name="clienteId"
            label="Cliente"
            type="select"
            placeholder="Escolha o cliente"
            options={customers.map((item) => ({ value: String(item.id), label: item.nome }))}
            value={values.clienteId}
            error={errors.clienteId}
            onChange={handleChange}
          />
          {customer && (
            <p className="text-muted">
              Endereço cadastrado: {customer.endereco}, {customer.numero} — {customer.cidade}/
              {customer.uf} — CEP {customer.cep}
            </p>
          )}
          <div className="form-check mb-3">
            <input
              id="useOtherAddress"
              type="checkbox"
              className="form-check-input"
              checked={values.useOtherAddress}
              onChange={(event) => handleChange("useOtherAddress", event.target.checked)}
            />
            <label htmlFor="useOtherAddress" className="form-check-label">
              Entregar em outro endereço
            </label>
          </div>
          {values.useOtherAddress && (
            <AddressFields values={values} errors={errors} onChange={handleChange} />
          )}
        </fieldset>

        <fieldset className="mb-4">
          <legend className="h5">Forma de pagamento</legend>
          {Object.values(PAYMENT_METHODS).map((method) => (
            <div className="form-check" key={method}>
              <input
                id={`payment-${method}`}
                type="radio"
                name="paymentMethod"
                className="form-check-input"
                value={method}
                checked={values.paymentMethod === method}
                onChange={() => handleChange("paymentMethod", method)}
              />
              <label htmlFor={`payment-${method}`} className="form-check-label">
                {PAYMENT_METHOD_LABELS[method]}
              </label>
            </div>
          ))}
          {values.paymentMethod === PAYMENT_METHODS.CARD && (
            <div className="mt-3">
              <FormField
                name="cardNumber"
                label="Número do cartão"
                value={values.cardNumber}
                error={errors.cardNumber}
                onChange={handleChange}
                mask={maskCard}
                inputMode="numeric"
                autoComplete="cc-number"
                hint="Simulação: cartões terminados em 0000 são recusados."
              />
            </div>
          )}
        </fieldset>

        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
          {isSubmitting ? "Processando pagamento..." : "Pagar"}
        </button>
      </form>
    </section>
  );
}

function PaymentResult({ outcome }) {
  const message = RESULT_MESSAGES[outcome.payment.status];
  return (
    <section>
      <h1>Resultado do pagamento</h1>
      <div className={`alert alert-${message.variant}`} role="status">
        {message.text}
      </div>
      <p>Pedido nº {outcome.order.id}</p>
      <Link to={`/pedidos/${outcome.order.id}`} className="btn btn-primary me-2">
        Ver pedido
      </Link>
      <Link to="/" className="btn btn-outline-secondary">
        Continuar comprando
      </Link>
    </section>
  );
}
