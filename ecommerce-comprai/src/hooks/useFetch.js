import { useCallback, useEffect, useState } from "react";

/**
 * Busca dados e controla carregamento e erro.
 * @param {Function} fetcher - função que devolve uma Promise (ex.: () => productService.list()).
 * @param {Array} [dependencies] - quando mudam, a busca é refeita (ex.: [id]).
 * @returns {{ data: *, loading: boolean, error: Error|null, reload: Function }}
 */
export function useFetch(fetcher, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let isCurrent = true; // evita atualizar o estado se o componente já saiu da tela
    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => isCurrent && setData(result))
      .catch((fetchError) => isCurrent && setError(fetchError))
      .finally(() => isCurrent && setLoading(false));

    return () => {
      isCurrent = false;
    };
    // O fetcher costuma ser uma função nova a cada render; quem controla a busca são as dependências.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, reloadCount]);

  const reload = useCallback(() => setReloadCount((count) => count + 1), []);
  return { data, loading, error, reload };
}
