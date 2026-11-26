import { CEP_DIGITS, CPF_DIGITS, PHONE_MAX_DIGITS, PHONE_MIN_DIGITS } from "../config";
import { onlyDigits } from "./masks";

const FIRST_CHECK_DIGIT_BASE_LENGTH = 9;
const SECOND_CHECK_DIGIT_BASE_LENGTH = 10;
const CPF_MODULUS = 11;
const CPF_REMAINDER_TO_ZERO = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valida o formato de um e-mail (texto@dominio.ext).
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return EMAIL_PATTERN.test(String(email ?? "").trim());
}

/**
 * Calcula um dígito verificador do CPF (pesos decrescentes a partir de baseLength + 1).
 * @param {number[]} digits - dígitos do CPF.
 * @param {number} baseLength - quantos dígitos entram na conta (9 ou 10).
 * @returns {number} dígito esperado.
 */
function calculateCpfCheckDigit(digits, baseLength) {
  const weightedSum = digits
    .slice(0, baseLength)
    .reduce((sum, digit, index) => sum + digit * (baseLength + 1 - index), 0);
  const remainder = (weightedSum * 10) % CPF_MODULUS;
  return remainder === CPF_REMAINDER_TO_ZERO ? 0 : remainder;
}

/**
 * Valida um CPF pelo algoritmo oficial.
 * @param {string} cpf - com ou sem máscara.
 * @returns {boolean}
 */
export function isValidCpf(cpf) {
  const text = onlyDigits(cpf);
  if (text.length !== CPF_DIGITS) return false;
  // 111.111.111-11 passa na conta, mas não é um CPF válido.
  if (/^(\d)\1+$/.test(text)) return false;

  const digits = text.split("").map(Number);
  return (
    calculateCpfCheckDigit(digits, FIRST_CHECK_DIGIT_BASE_LENGTH) === digits[9] &&
    calculateCpfCheckDigit(digits, SECOND_CHECK_DIGIT_BASE_LENGTH) === digits[10]
  );
}

/**
 * @param {string} cep - com ou sem máscara.
 * @returns {boolean} true se tem 8 dígitos.
 */
export function isValidCep(cep) {
  return onlyDigits(cep).length === CEP_DIGITS;
}

/**
 * @param {string} phone - com ou sem máscara.
 * @returns {boolean} true se tem DDD + 8 ou 9 dígitos.
 */
export function isValidPhone(phone) {
  const length = onlyDigits(phone).length;
  return length >= PHONE_MIN_DIGITS && length <= PHONE_MAX_DIGITS;
}
