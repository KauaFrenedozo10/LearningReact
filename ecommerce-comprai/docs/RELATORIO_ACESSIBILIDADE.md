# Relatório de acessibilidade

## Medidas já implementadas no código (referência: WCAG 2.1)

| Diretriz                     | O que foi feito                                                                                                                        |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| HTML semântico               | `header`, `nav`, `main`, `footer`, `section`, `article`, tabelas com `caption` e `th scope`, títulos em ordem (h1 por página)          |
| Textos alternativos          | Toda imagem de produto tem `alt` com o nome do produto                                                                                 |
| Rótulos em formulários       | Todo campo tem `label` ligado por `htmlFor`/`id`; erros ligados por `aria-describedby` e `aria-invalid`; grupos em `fieldset`/`legend` |
| Teclado                      | Tudo é alcançável por Tab; link "Ir para o conteúdo" no início; modal prende o foco, fecha com Esc e devolve o foco                    |
| Foco visível                 | Contorno amarelo de 3 px em links, botões e campos (`index.css`)                                                                       |
| Anúncio de mudanças          | Mensagens em região `aria-live`; contagem de resultados do catálogo com `aria-live`; spinner com `role="status"`                       |
| Menu responsivo              | Botão com `aria-expanded`, `aria-controls` e `aria-label`                                                                              |
| Cor não é a única informação | Status do pedido tem texto além da cor                                                                                                 |
| Título da página             | `document.title` muda a cada rota                                                                                                      |

## Auditoria automatizada

> **Preencha com os resultados reais.** A auditoria precisa ser rodada por você no navegador; não há números aqui de propósito.

**Como rodar:** `npm run build && npm run preview`, abra o app no Chrome → DevTools → aba **Lighthouse** → categoria **Accessibility** → **Analyze page load**. Repita nas páginas: catálogo, carrinho, checkout, cadastro de cliente e pedidos. Opcional: extensão **axe DevTools**.

| Página              | Nota Lighthouse (antes) | Problemas encontrados | Correção feita | Nota (depois) |
| ------------------- | ----------------------- | --------------------- | -------------- | ------------- |
| Catálogo            |                         |                       |                |               |
| Carrinho            |                         |                       |                |               |
| Checkout            |                         |                       |                |               |
| Cadastro de cliente |                         |                       |                |               |
| Pedidos             |                         |                       |                |               |

## Teste manual de teclado (marque ao testar)

- [ ] Tab percorre menu, filtros e botões na ordem visual
- [ ] Enter/Espaço ativam botões
- [ ] Modal de exclusão: foco entra, Tab não escapa, Esc fecha
- [ ] Formulário com erro: mensagens aparecem e são lidas por leitor de tela (NVDA)
