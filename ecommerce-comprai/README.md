# Comprai — Front-end do Sistema de Gestão de Pedidos

Interface web em React para cadastro de produtos e clientes, catálogo, carrinho, checkout com pagamento simulado e acompanhamento de pedidos.

**Aluno:** Kauã Henrique Frenedozo
**Link da aplicação publicada:** _(preencher depois do deploy)_
**Repositório:** _(preencher)_

## Tecnologias

React 18, Vite, React Router, Bootstrap 5 (via NPM), Context API + useReducer, Vitest + React Testing Library, Playwright, ESLint, Prettier e GitHub Actions.

## Como rodar

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script             | O que faz                                        |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Servidor de desenvolvimento                      |
| `npm run build`    | Gera a versão de produção em `dist/`             |
| `npm run preview`  | Serve a versão de produção localmente            |
| `npm run lint`     | ESLint                                           |
| `npm run format`   | Prettier (formata) / `format:check` (só confere) |
| `npm test`         | Testes de componentes e de serviços (Vitest)     |
| `npm run test:e2e` | Testes de fluxo no navegador (Playwright)        |

Para os testes e2e na primeira vez: `npx playwright install chromium`.

## API simulada e API real

Por padrão o app usa uma **API simulada** (dados no `localStorage` do navegador), que segue o contrato de referência (`/api/produtos`, `/api/clientes`, `/api/pedidos`, `/api/pagamentos`). Para usar a API real, copie `.env.example` para `.env` e ajuste:

```
VITE_USE_MOCK=false
VITE_API_URL=http://localhost:8080/api
```

Nenhuma outra alteração é necessária: só o arquivo `src/services/httpClient.js` decide entre as duas.

Regras do pagamento simulado: **Pix** é aprovado, **boleto** fica pendente, **cartão** é aprovado, exceto números terminados em `0000` (recusado).

## Estrutura

```
src/
  components/   componentes reutilizáveis (FormField, ConfirmModal, ProductCard, Navbar...)
  pages/        uma página por rota
  services/     camada de API (httpClient, serviços por recurso, API simulada)
  contexts/     CartContext (carrinho) e ToastContext (mensagens)
  hooks/        useFetch, useForm, usePageTitle
  utils/        validações, máscaras, formatadores, filtros
  config.js     constantes centrais
  test/         configuração dos testes
e2e/            testes ponta a ponta (Playwright)
docs/           manual, relatórios e guia de Git/deploy
```

## Rotas

| Rota                                      | Página                                      |
| ----------------------------------------- | ------------------------------------------- |
| `/`                                       | Catálogo (busca, categoria, faixa de preço) |
| `/produtos/:id`                           | Detalhes do produto                         |
| `/admin/produtos`, `/novo`, `/:id/editar` | Gestão de produtos                          |
| `/clientes`, `/novo`, `/:id/editar`       | Gestão de clientes                          |
| `/carrinho`, `/checkout`                  | Carrinho e compra                           |
| `/pedidos`, `/pedidos/:id`                | Pedidos e detalhes                          |
| `*`                                       | Página 404                                  |

## Documentação

- [Manual do usuário](docs/MANUAL_DO_USUARIO.md)
- [Relatório técnico](docs/RELATORIO_TECNICO.md)
- [Relatório de acessibilidade](docs/RELATORIO_ACESSIBILIDADE.md)
- [Guia de Git, CI e deploy](docs/GUIA_GIT_E_DEPLOY.md)
