import { PAYMENT_TO_ORDER_STATUS } from "../config";
import { calculateCartTotal } from "../contexts/cartReducer";
import { orderService } from "./orderService";
import { paymentService } from "./paymentService";

/**
 * Fluxo de compra: cria o pedido, envia o pagamento simulado e atualiza o
 * status do pedido conforme o resultado.
 * @param {Object} params
 * @param {Object} params.customer - cliente que está comprando.
 * @param {Object} params.address - endereço de entrega.
 * @param {Object[]} params.items - itens do carrinho.
 * @param {string} params.paymentMethod - "cartao", "pix" ou "boleto".
 * @param {string} [params.cardNumber] - só para cartão.
 * @returns {Promise<{ order: Object, payment: Object }>} pedido atualizado e resultado do pagamento.
 * @throws {ApiError} se a criação, o pagamento ou a atualização falhar.
 */
export async function placeOrder({ customer, address, items, paymentMethod, cardNumber }) {
  const total = calculateCartTotal(items);

  const order = await orderService.create({
    clienteId: customer.id,
    clienteNome: customer.nome,
    endereco: address,
    itens: items.map(({ produtoId, nome, preco, quantidade }) => ({
      produtoId,
      nome,
      preco,
      quantidade,
    })),
    total,
    formaPagamento: paymentMethod,
  });

  const payment = await paymentService.pay({
    pedidoId: order.id,
    metodo: paymentMethod,
    valor: total,
    numeroCartao: cardNumber,
  });

  const updatedOrder = await orderService.updateStatus(
    order.id,
    PAYMENT_TO_ORDER_STATUS[payment.status]
  );
  return { order: updatedOrder, payment };
}
