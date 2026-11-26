import { Link, useLocation } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

/** Rota coringa: mostra o caminho digitado e um link para o catálogo. */
export default function NotFoundPage() {
  usePageTitle("Página não encontrada");
  const { pathname } = useLocation();

  return (
    <section className="text-center py-5">
      <h1>Página não encontrada (404)</h1>
      <p>
        O endereço <code>{pathname}</code> não existe.
      </p>
      <Link to="/" className="btn btn-primary">
        Voltar ao catálogo
      </Link>
    </section>
  );
}
