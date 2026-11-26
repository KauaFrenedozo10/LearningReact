import { beforeEach, describe, expect, it } from "vitest";
import { ApiError } from "./ApiError";
import { handleMockRequest, resetMockDb } from "./mockApi";

beforeEach(() => resetMockDb());

describe("API simulada", () => {
  it("lista produtos e detalha um deles", () => {
    expect(handleMockRequest("GET", "/produtos").length).toBeGreaterThan(0);
    expect(handleMockRequest("GET", "/produtos/1").nome).toBe("Notebook Aurora 14");
  });

  it("devolve 404 para registro inexistente", () => {
    expect(() => handleMockRequest("GET", "/produtos/999")).toThrow(ApiError);
  });

  it("cria, edita e exclui um produto", () => {
    const created = handleMockRequest("POST", "/produtos", {
      nome: "Teste",
      preco: 10,
      estoque: 1,
    });
    handleMockRequest("PUT", `/produtos/${created.id}`, { nome: "Teste 2", preco: 20, estoque: 2 });
    expect(handleMockRequest("GET", `/produtos/${created.id}`).nome).toBe("Teste 2");
    handleMockRequest("DELETE", `/produtos/${created.id}`);
    expect(() => handleMockRequest("GET", `/produtos/${created.id}`)).toThrow(ApiError);
  });

  it("desconta o estoque ao criar pedido e recusa quando falta estoque", () => {
    const item = { produtoId: 1, nome: "Notebook Aurora 14", preco: 3499.9, quantidade: 2 };
    handleMockRequest("POST", "/pedidos", { itens: [item], total: 7000 });
    expect(handleMockRequest("GET", "/produtos/1").estoque).toBe(6);

    const tooMany = { ...item, quantidade: 100 };
    expect(() => handleMockRequest("POST", "/pedidos", { itens: [tooMany] })).toThrow(
      /Estoque insuficiente/
    );
  });

  it("simula o resultado do pagamento por forma de pagamento", () => {
    const pay = (metodo, numeroCartao) =>
      handleMockRequest("POST", "/pagamentos", { pedidoId: 1, metodo, numeroCartao }).status;
    expect(pay("pix")).toBe("aprovado");
    expect(pay("boleto")).toBe("pendente");
    expect(pay("cartao", "4111 1111 1111 1111")).toBe("aprovado");
    expect(pay("cartao", "4111 1111 1111 0000")).toBe("recusado");
  });
});
