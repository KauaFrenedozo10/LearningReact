import { useEffect } from "react";

const APP_NAME = "Comprai";

/** Atualiza o título da aba; leitores de tela anunciam o título ao trocar de página. */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} — ${APP_NAME}`;
  }, [title]);
}
