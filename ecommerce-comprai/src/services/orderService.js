import { request } from "./httpClient";

export const orderService = {
  list: () => request("GET", "/pedidos"),
  getById: (id) => request("GET", `/pedidos/${id}`),
  create: (order) => request("POST", "/pedidos", order),
  updateStatus: (id, status) => request("PATCH", `/pedidos/${id}`, { status }),
};
