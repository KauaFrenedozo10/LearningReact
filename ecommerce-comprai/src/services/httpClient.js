// Único ponto que decide se a requisição vai para a API real ou para a simulada.
// Os serviços (productService etc.) não sabem a diferença.
import { API_BASE_URL, MOCK_DELAY_MS, USE_MOCK } from "../config";
import { ApiError } from "./ApiError";
import { handleMockRequest } from "./mockApi";

const NO_CONTENT = 204;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function readErrorMessage(response) {
  try {
    const data = await response.json();
    return data.message ?? `Erro ${response.status}`;
  } catch {
    return `Erro ${response.status} ao falar com o servidor.`;
  }
}

/**
 * Faz uma requisição à API.
 * @param {string} method
 * @param {string} path - ex.: "/produtos/3".
 * @param {Object} [body]
 * @returns {Promise<*>} corpo da resposta já convertido de JSON.
 * @throws {ApiError} quando a resposta não é de sucesso ou a rede falha.
 */
export async function request(method, path, body) {
  if (USE_MOCK) {
    await wait(MOCK_DELAY_MS); // simula a latência da rede
    return handleMockRequest(method, path, body);
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Não foi possível conectar ao servidor. Verifique sua conexão.");
  }

  if (!response.ok) throw new ApiError(response.status, await readErrorMessage(response));
  return response.status === NO_CONTENT ? null : response.json();
}
