// API simulada: implementa o contrato REST em cima do localStorage, para o
// front-end funcionar sem o back-end. Só o httpClient conhece este arquivo.
import {
  DECLINED_CARD_SUFFIX,
  ORDER_STATUS,
  PAYMENT_METHODS,
  PAYMENT_RESULT,
  STORAGE_KEYS,
} from "../config";
import { onlyDigits } from "../utils/masks";
import { ApiError } from "./ApiError";
import { SEED_DATA } from "./mockData";

const COLLECTIONS = ["produtos", "clientes", "pedidos"];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readDb() {
  const saved = localStorage.getItem(STORAGE_KEYS.mockDb);
  if (saved) return JSON.parse(saved);
  const initial = clone(SEED_DATA);
  writeDb(initial);
  return initial;
}

function writeDb(db) {
  localStorage.setItem(STORAGE_KEYS.mockDb, JSON.stringify(db));
}

/** Apaga os dados simulados; na próxima requisição eles voltam ao estado inicial. */
export function resetMockDb() {
  localStorage.removeItem(STORAGE_KEYS.mockDb);
}

function nextId(list) {
  return list.reduce((highest, item) => Math.max(highest, item.id), 0) + 1;
}

/** Confere o estoque de todos os itens e só então desconta; lança 409 se faltar. */
function decreaseStock(db, orderItems) {
  orderItems.forEach((item) => {
    const product = db.produtos.find((candidate) => candidate.id === item.produtoId);
    if (!product || product.estoque < item.quantidade) {
      throw new ApiError(409, `Estoque insuficiente para "${item.nome}".`);
    }
  });
  orderItems.forEach((item) => {
    db.produtos.find((candidate) => candidate.id === item.produtoId).estoque -= item.quantidade;
  });
}

function createRecord(db, collection, body) {
  const record = { ...body, id: nextId(db[collection]) };
  if (collection === "pedidos") {
    decreaseStock(db, record.itens);
    record.status = record.status ?? ORDER_STATUS.PENDING;
    record.criadoEm = new Date().toISOString();
  }
  db[collection].push(record);
  writeDb(db);
  return record;
}

function processPayment({ pedidoId, metodo, numeroCartao }) {
  let status = PAYMENT_RESULT.APPROVED;
  if (metodo === PAYMENT_METHODS.BOLETO) status = PAYMENT_RESULT.PENDING;
  if (metodo === PAYMENT_METHODS.CARD && onlyDigits(numeroCartao).endsWith(DECLINED_CARD_SUFFIX)) {
    status = PAYMENT_RESULT.DECLINED;
  }
  return { pedidoId, metodo, status };
}

function handleItemRequest(db, collection, method, id, body) {
  const index = db[collection].findIndex((item) => item.id === id);
  if (index === -1) throw new ApiError(404, "Registro não encontrado.");

  if (method === "GET") return db[collection][index];
  if (method === "PUT") db[collection][index] = { ...body, id };
  else if (method === "PATCH") db[collection][index] = { ...db[collection][index], ...body };
  else if (method === "DELETE") {
    db[collection].splice(index, 1);
    writeDb(db);
    return null;
  } else throw new ApiError(405, "Método não permitido.");

  writeDb(db);
  return db[collection][index];
}

/**
 * Processa uma requisição como o back-end faria.
 * @param {string} method - GET, POST, PUT, PATCH ou DELETE.
 * @param {string} path - ex.: "/produtos" ou "/pedidos/3".
 * @param {Object} [body] - corpo da requisição.
 * @returns {*} dado de resposta (objeto, lista ou null).
 * @throws {ApiError} para recurso inexistente, estoque insuficiente etc.
 */
export function handleMockRequest(method, path, body) {
  const [collection, rawId] = path.replace(/^\/+/, "").split("/");

  if (collection === "pagamentos" && method === "POST") return processPayment(body);
  if (!COLLECTIONS.includes(collection)) throw new ApiError(404, "Recurso não encontrado.");

  const db = readDb();
  if (rawId === undefined) {
    if (method === "GET") return db[collection];
    if (method === "POST") return createRecord(db, collection, body);
    throw new ApiError(405, "Método não permitido.");
  }
  return handleItemRequest(db, collection, method, Number(rawId), body);
}
