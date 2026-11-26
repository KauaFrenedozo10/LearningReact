/** Erro lançado pela camada de serviços (API real ou simulada), com o status HTTP. */
export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
