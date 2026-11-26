import { describe, expect, it } from "vitest";
import { maskCard, maskCep, maskCpf, maskPhone } from "./masks";
import { isValidCep, isValidCpf, isValidEmail, isValidPhone } from "./validators";

describe("validators", () => {
  it("valida e-mail", () => {
    expect(isValidEmail("maria@email.com")).toBe(true);
    expect(isValidEmail("maria@email")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });

  it("valida CPF pelo algoritmo oficial", () => {
    expect(isValidCpf("529.982.247-25")).toBe(true);
    expect(isValidCpf("52998224725")).toBe(true);
    expect(isValidCpf("123.456.789-00")).toBe(false);
    expect(isValidCpf("111.111.111-11")).toBe(false);
  });

  it("valida CEP e telefone", () => {
    expect(isValidCep("13560-000")).toBe(true);
    expect(isValidCep("1356")).toBe(false);
    expect(isValidPhone("(16) 99999-1111")).toBe(true);
    expect(isValidPhone("(16) 3333-4444")).toBe(true);
    expect(isValidPhone("999")).toBe(false);
  });
});

describe("masks", () => {
  it("formata CPF, CEP, telefone e cartão", () => {
    expect(maskCpf("52998224725")).toBe("529.982.247-25");
    expect(maskCep("13560000")).toBe("13560-000");
    expect(maskPhone("16999991111")).toBe("(16) 99999-1111");
    expect(maskPhone("1633334444")).toBe("(16) 3333-4444");
    expect(maskCard("1234567812345678")).toBe("1234 5678 1234 5678");
  });
});
