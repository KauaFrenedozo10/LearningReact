/**
 * Filtra produtos por nome, categoria e faixa de preço.
 * Campos de filtro vazios são ignorados.
 * @param {Object[]} products
 * @param {{ search: string, category: string, minPrice: string, maxPrice: string }} filters
 * @returns {Object[]} novo array com os produtos que passam em todos os filtros.
 */
export function filterProducts(products, { search, category, minPrice, maxPrice }) {
  const term = search.trim().toLowerCase();
  const min = minPrice === "" ? 0 : Number(minPrice);
  const max = maxPrice === "" ? Infinity : Number(maxPrice);

  return products.filter(
    (product) =>
      product.nome.toLowerCase().includes(term) &&
      (category === "" || product.categoria === category) &&
      product.preco >= min &&
      product.preco <= max
  );
}

/**
 * @param {Object[]} products
 * @returns {string[]} categorias sem repetição, em ordem alfabética.
 */
export function getCategories(products) {
  return [...new Set(products.map((product) => product.categoria))].sort();
}
