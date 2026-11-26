// Regras de validação de cada formulário. Cada função recebe os valores e
// devolve um objeto { campo: mensagem }; objeto vazio significa "tudo certo".
import { CARD_DIGITS, MIN_NAME_LENGTH, PAYMENT_METHODS } from "../config";
import { onlyDigits } from "./masks";
import { isValidCep, isValidCpf, isValidEmail, isValidPhone } from "./validators";

const isBlank = (value) => String(value ?? "").trim() === "";

/**
 * Regras do endereço (usadas no cadastro de cliente e no checkout).
 * @param {Object} values - endereco, numero, cidade, cep, uf.
 * @returns {Object} erros por campo.
 */
export function validateAddress(values) {
  const errors = {};
  if (isBlank(values.endereco)) errors.endereco = "Informe o endereço.";
  if (isBlank(values.numero)) errors.numero = "Informe o número.";
  if (isBlank(values.cidade)) errors.cidade = "Informe a cidade.";
  if (!isValidCep(values.cep)) errors.cep = "Informe um CEP válido (00000-000).";
  if (isBlank(values.uf)) errors.uf = "Escolha um estado.";
  return errors;
}

/**
 * @param {Object} values - dados do formulário de cliente.
 * @returns {Object} erros por campo.
 */
export function validateCustomer(values) {
  const errors = validateAddress(values);
  if (String(values.nome ?? "").trim().length < MIN_NAME_LENGTH) {
    errors.nome = `O nome deve ter no mínimo ${MIN_NAME_LENGTH} caracteres.`;
  }
  if (!isValidEmail(values.email)) errors.email = "Informe um e-mail válido.";
  if (!isValidCpf(values.cpf)) errors.cpf = "Informe um CPF válido.";
  if (!isValidPhone(values.telefone)) errors.telefone = "Informe um telefone válido com DDD.";
  return errors;
}

/**
 * @param {Object} values - dados do formulário de produto (strings).
 * @returns {Object} erros por campo.
 */
export function validateProduct(values) {
  const errors = {};
  if (String(values.nome ?? "").trim().length < MIN_NAME_LENGTH) {
    errors.nome = `O nome deve ter no mínimo ${MIN_NAME_LENGTH} caracteres.`;
  }
  if (isBlank(values.descricao)) errors.descricao = "Informe a descrição.";
  if (isBlank(values.categoria)) errors.categoria = "Informe a categoria.";
  if (!(Number(values.preco) > 0)) errors.preco = "O preço deve ser maior que zero.";
  const stock = Number(values.estoque);
  if (isBlank(values.estoque) || !Number.isInteger(stock) || stock < 0) {
    errors.estoque = "O estoque deve ser um número inteiro maior ou igual a zero.";
  }
  return errors;
}

/**
 * @param {Object} values - dados do checkout.
 * @returns {Object} erros por campo.
 */
export function validateCheckout(values) {
  const errors = {};
  if (isBlank(values.clienteId)) errors.clienteId = "Escolha o cliente.";
  if (values.useOtherAddress) Object.assign(errors, validateAddress(values));
  if (
    values.paymentMethod === PAYMENT_METHODS.CARD &&
    onlyDigits(values.cardNumber).length !== CARD_DIGITS
  ) {
    errors.cardNumber = `Informe os ${CARD_DIGITS} dígitos do cartão.`;
  }
  return errors;
}
