// Configuração central: constantes usadas em mais de um arquivo ficam aqui,
// para não espalhar textos e números "mágicos" pelo código.

// --- API ---
// VITE_USE_MOCK=false troca a API simulada pela API real, sem mexer em mais nada.
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";
export const MOCK_DELAY_MS = Number(import.meta.env.VITE_MOCK_DELAY_MS ?? 300);

// --- Armazenamento local ---
export const STORAGE_KEYS = {
  cart: "comprai.cart",
  mockDb: "comprai.mockDb",
};

// --- Pedidos ---
export const ORDER_STATUS = {
  PENDING: "pendente",
  PAID: "pago",
  SHIPPED: "enviado",
  DELIVERED: "entregue",
  CANCELED: "cancelado",
};

export const ORDER_STATUS_LABELS = {
  pendente: "Pendente",
  pago: "Pago",
  enviado: "Enviado",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

export const ORDER_STATUS_BADGE = {
  pendente: "text-bg-warning",
  pago: "text-bg-primary",
  enviado: "text-bg-info",
  entregue: "text-bg-success",
  cancelado: "text-bg-danger",
};

// Ordem do fluxo normal de um pedido (usada na linha do tempo e no botão "Avançar").
export const ORDER_STATUS_FLOW = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.PAID,
  ORDER_STATUS.SHIPPED,
  ORDER_STATUS.DELIVERED,
];

// --- Pagamento simulado ---
export const PAYMENT_METHODS = {
  CARD: "cartao",
  PIX: "pix",
  BOLETO: "boleto",
};

export const PAYMENT_METHOD_LABELS = {
  cartao: "Cartão de crédito",
  pix: "Pix",
  boleto: "Boleto",
};

export const PAYMENT_RESULT = {
  APPROVED: "aprovado",
  DECLINED: "recusado",
  PENDING: "pendente",
};

// Resultado do pagamento -> status que o pedido recebe.
export const PAYMENT_TO_ORDER_STATUS = {
  aprovado: ORDER_STATUS.PAID,
  recusado: ORDER_STATUS.CANCELED,
  pendente: ORDER_STATUS.PENDING,
};

// Regra da simulação: cartão terminado em 0000 é recusado; Pix é aprovado; boleto fica pendente.
export const DECLINED_CARD_SUFFIX = "0000";
export const CARD_DIGITS = 16;

// --- Validação ---
export const MIN_NAME_LENGTH = 3;
export const CPF_DIGITS = 11;
export const CEP_DIGITS = 8;
export const PHONE_MIN_DIGITS = 10;
export const PHONE_MAX_DIGITS = 11;

// --- Interface ---
export const TOAST_DURATION_MS = 4000;

export const STATES = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];
