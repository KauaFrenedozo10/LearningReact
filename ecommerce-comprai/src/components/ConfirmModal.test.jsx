import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ConfirmModal from "./ConfirmModal";

describe("ConfirmModal", () => {
  it("é um diálogo com foco inicial em Cancelar e fecha com Esc", async () => {
    const onCancel = vi.fn();
    render(
      <ConfirmModal title="Excluir" message="Certeza?" onConfirm={vi.fn()} onCancel={onCancel} />
    );

    expect(screen.getByRole("dialog", { name: "Excluir" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancelar" })).toHaveFocus();

    await userEvent.keyboard("{Escape}");
    expect(onCancel).toHaveBeenCalled();
  });

  it("chama onConfirm ao confirmar", async () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmModal
        title="Excluir"
        message="Certeza?"
        confirmLabel="Sim, excluir"
        onConfirm={onConfirm}
        onCancel={vi.fn()}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Sim, excluir" }));
    expect(onConfirm).toHaveBeenCalled();
  });
});
