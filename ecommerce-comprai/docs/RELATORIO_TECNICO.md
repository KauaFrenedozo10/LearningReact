# Relatório técnico — decisões de arquitetura

## Organização de componentes

A pasta `src` é dividida por responsabilidade: `pages` (uma por rota, cuidam de buscar dados e montar a tela), `components` (peças reutilizáveis sem conhecimento de API), `services` (comunicação com a API), `contexts`, `hooks` e `utils`. Componentes reutilizáveis têm props simples: `FormField` (rótulo, input, erro), `AddressFields` (usado no cadastro de cliente e no checkout), `ConfirmModal` (exclusão e cancelamento), `ProductCard`, `StatusBadge`, `OrderTimeline`, `LoadingSpinner` e `ErrorMessage`.

## Gerenciamento de estado

- **Estado do servidor** (listas, detalhes): hook `useFetch`, que controla carregamento e erro em cada tela. Não foi usada biblioteca de cache para manter o projeto simples.
- **Estado compartilhado**: só o carrinho e as mensagens precisam ser vistos em várias telas, então ficam em Context API (`CartContext`, `ToastContext`).
- **Carrinho**: `useReducer` com a lógica em `cartReducer.js` (funções puras, testadas sem React). É salvo no `localStorage` para persistir entre navegações e recarregamentos.
- **Formulários**: hook `useForm` (valores, erros, envio) com regras em `utils/formRules.js`.

## Estrutura de rotas

React Router com rotas estáticas, rotas dinâmicas (`/produtos/:id`, `/pedidos/:id`, `/admin/produtos/:id/editar`, `/clientes/:id/editar`) e rota coringa `*` para a página 404. Telas de cadastro e edição usam a mesma página, decidida pela presença do parâmetro `id`.

## Escolha do framework CSS: Bootstrap 5

Instalado via NPM. Motivos: grade responsiva mobile-first pronta (`row-cols-1 row-cols-sm-2 row-cols-lg-4`), componentes com marcação acessível (tabelas, formulários, navbar, modal, alertas), contraste adequado nas cores padrão e menor custo de aprendizado para a equipe. Só o CSS do Bootstrap é usado; os comportamentos (menu, modal) são feitos em React, o que dá controle de foco e de atributos ARIA. Faixas de tela: celular (< 576 px), tablet (≥ 576 px) e desktop (≥ 992 px).

## Integração com a API

Os componentes nunca chamam `fetch`. O fluxo é: página → serviço do recurso (`productService` etc.) → `httpClient`. O `httpClient` escolhe entre a API real (`fetch` em `VITE_API_URL`) e a API simulada (`mockApi.js`, em `localStorage`) conforme `VITE_USE_MOCK`. Por isso a troca pela API real exige só mudar variáveis de ambiente. Erros viram `ApiError` (com status HTTP) e são exibidos por `ErrorMessage` ou mensagens. O fluxo de compra (criar pedido → pagar → atualizar status) fica isolado em `checkoutService.js`.

**Pontos a alinhar com o back-end:** nomes dos campos (hoje em português: `nome`, `preco`, `estoque`, `clienteId`, `itens`...), formato de erro (`{ message }`), filtros no servidor (hoje feitos no navegador) e as regras de status do pedido após pagamento (aprovado → pago, recusado → cancelado, pendente → pendente).

## Qualidade

ESLint + Prettier, 30 testes automatizados (Vitest + React Testing Library), 3 testes de fluxo em Playwright e pipeline no GitHub Actions (lint, formatação, testes, build e e2e).

## Limitações conhecidas

- Sem login: a "área administrativa" é só um conjunto de rotas, sem controle de acesso.
- Cancelar pedido não devolve o estoque na API simulada (essa regra é do back-end).
- A API simulada guarda os dados no navegador; não há compartilhamento entre usuários.
