import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../test/renderWithProviders";
import CustomerFormPage from "./CustomerFormPage";

const renderForm = () =>
  renderWithProviders(
    <Routes>
      <Route path="/clientes/novo" element={<CustomerFormPage />} />
    </Routes>,
    "/clientes/novo"
  );

describe("CustomerFormPage", () => {
  it("mostra erro em cada campo inválido ao enviar vazio", async () => {
    renderForm();
    await userEvent.click(await screen.findByRole("button", { name: "Salvar" }));

    expect(screen.getByText("Informe um e-mail válido.")).toBeInTheDocument();
    expect(screen.getByText("Informe um CPF válido.")).toBeInTheDocument();
    expect(screen.getByText("Informe um CEP válido (00000-000).")).toBeInTheDocument();
    expect(screen.getByLabelText("CPF")).toHaveAttribute("aria-invalid", "true");
  });

  it("aplica a máscara de CPF enquanto digita", async () => {
    renderForm();
    const cpfInput = await screen.findByLabelText("CPF");
    await userEvent.type(cpfInput, "52998224725");
    expect(cpfInput).toHaveValue("529.982.247-25");
  });
});
