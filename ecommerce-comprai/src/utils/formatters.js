const currencyFormatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const dateFormatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" });

/**
 * @param {number} value
 * @returns {string} valor em reais, ex.: "R$ 1.234,50".
 */
export function formatCurrency(value) {
  return currencyFormatter.format(value);
}

/**
 * @param {string} isoDate - data em ISO 8601.
 * @returns {string} data e hora no formato brasileiro.
 */
export function formatDate(isoDate) {
  return dateFormatter.format(new Date(isoDate));
}
