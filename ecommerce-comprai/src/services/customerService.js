import { request } from "./httpClient";

export const customerService = {
  list: () => request("GET", "/clientes"),
  getById: (id) => request("GET", `/clientes/${id}`),
  create: (customer) => request("POST", "/clientes", customer),
  update: (id, customer) => request("PUT", `/clientes/${id}`, customer),
};
