// Teste ponta a ponta (Playwright): percorre o fluxo de compra no navegador de verdade.
// Rodar: npx playwright install chromium && npm run test:e2e
import { expect, test } from "@playwright/test";

test("compra com Pix: catálogo -> carrinho -> checkout -> pedido pago", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Adicionar Mouse sem fio Vento/ }).click();

  await page.getByRole("link", { name: /Carrinho/ }).click();
  await expect(page.getByRole("heading", { name: "Carrinho" })).toBeVisible();

  await page.getByRole("link", { name: "Finalizar compra" }).click();
  await page.getByLabel("Cliente").selectOption({ label: "Maria Souza" });
  await page.getByRole("button", { name: "Pagar" }).click();
  await expect(page.getByText(/Pagamento aprovado/)).toBeVisible();

  await page.getByRole("link", { name: "Ver pedido" }).click();
  await expect(page.getByRole("heading", { name: /Pedido nº/ })).toBeVisible();
});

test("rota inexistente mostra a página 404", async ({ page }) => {
  await page.goto("/qualquer-coisa");
  await expect(page.getByRole("heading", { name: /404/ })).toBeVisible();
});

test("tab chega ao conteúdo pelo link de atalho (navegação por teclado)", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Ir para o conteúdo" })).toBeFocused();
});
