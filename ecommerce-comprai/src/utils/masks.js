import { CARD_DIGITS, CEP_DIGITS, CPF_DIGITS, PHONE_MAX_DIGITS } from "../config";

const PHONE_AREA_CODE_LENGTH = 2;
const CEP_FIRST_PART_LENGTH = 5;
const CARD_GROUP_SIZE = 4;

/**
 * Remove tudo que não é dígito.
 * @param {string} text
 * @returns {string} apenas os dígitos.
 */
export function onlyDigits(text) {
  return String(text ?? "").replace(/\D/g, "");
}

/**
 * Máscara 000.000.000-00.
 * @param {string} text - texto digitado.
 * @returns {string} CPF parcial ou completo formatado.
 */
export function maskCpf(text) {
  return onlyDigits(text)
    .slice(0, CPF_DIGITS)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

/**
 * Máscara de telefone: (00) 0000-0000 (fixo) ou (00) 00000-0000 (celular).
 * @param {string} text - texto digitado.
 * @returns {string} telefone parcial ou completo formatado.
 */
export function maskPhone(text) {
  const digits = onlyDigits(text).slice(0, PHONE_MAX_DIGITS);
  if (digits.length === 0) return "";
  if (digits.length <= PHONE_AREA_CODE_LENGTH) return `(${digits}`;

  const areaCode = digits.slice(0, PHONE_AREA_CODE_LENGTH);
  const rest = digits.slice(PHONE_AREA_CODE_LENGTH);
  // Celular tem 9 dígitos depois do DDD, então o hífen vem depois do 5º; fixo, depois do 4º.
  const firstPartLength = digits.length === PHONE_MAX_DIGITS ? 5 : 4;
  if (rest.length <= firstPartLength) return `(${areaCode}) ${rest}`;
  return `(${areaCode}) ${rest.slice(0, firstPartLength)}-${rest.slice(firstPartLength)}`;
}

/**
 * Máscara 00000-000.
 * @param {string} text - texto digitado.
 * @returns {string} CEP parcial ou completo formatado.
 */
export function maskCep(text) {
  const digits = onlyDigits(text).slice(0, CEP_DIGITS);
  if (digits.length <= CEP_FIRST_PART_LENGTH) return digits;
  return `${digits.slice(0, CEP_FIRST_PART_LENGTH)}-${digits.slice(CEP_FIRST_PART_LENGTH)}`;
}

/**
 * Máscara 0000 0000 0000 0000.
 * @param {string} text - texto digitado.
 * @returns {string} número de cartão em grupos de 4 dígitos.
 */
export function maskCard(text) {
  const digits = onlyDigits(text).slice(0, CARD_DIGITS);
  const groups = digits.match(new RegExp(`.{1,${CARD_GROUP_SIZE}}`, "g")) ?? [];
  return groups.join(" ");
}
