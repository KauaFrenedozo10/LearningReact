import { useState, useEffect } from 'react';

// Custom Hook reutilizável: busca (GET) um JSON e controla loading/erro.
export default function useFetch(url) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json()) // converte a resposta bruta em JSON
      .then((json) => {
        setDados(json);
        setLoading(false);
      })
      .catch(() => {
        setErro('Não foi possível carregar os dados. O JSON Server está rodando?');
        setLoading(false);
      });
  }, []); // array vazio: executa apenas uma vez

  return { dados, setDados, loading, erro };
}
