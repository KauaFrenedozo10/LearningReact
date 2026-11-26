# Guia de Git, CI e deploy

## Commits e branches

Faça commits pequenos com mensagem que diga o que foi feito (ex.: `feat: catálogo com filtros`). Use uma branch por funcionalidade e abra um pull request para a `main`:

```bash
git init && git add . && git commit -m "chore: projeto criado com Vite, React e Bootstrap"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/ecommerce-comprai.git
git push -u origin main

git checkout -b feat/catalogo        # trabalha, commita...
git push -u origin feat/catalogo     # abre o Pull Request no GitHub
```

Sugestão de branches: `feat/catalogo`, `feat/produtos-admin`, `feat/clientes`, `feat/carrinho`, `feat/checkout`, `feat/pedidos`, `test/componentes`, `docs/relatorios`.

## Integração contínua

O arquivo `.github/workflows/ci.yml` roda a cada push e pull request: lint, formatação, testes, build e testes e2e. O selo verde aparece no PR.

## Deploy

**Vercel:** importe o repositório em vercel.com → Framework "Vite" → Deploy. O `vercel.json` já faz as rotas funcionarem ao recarregar.
**Netlify:** "Add new site" → importe o repositório → build `npm run build`, pasta `dist`. O arquivo `public/_redirects` já está configurado.

Como o app usa a API simulada por padrão, ele funciona publicado sem back-end. Cole o link no README.
