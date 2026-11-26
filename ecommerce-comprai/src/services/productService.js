import { request } from "./httpClient";

export const productService = {
  list: () => request("GET", "/produtos"),
  getById: (id) => request("GET", `/produtos/${id}`),
  create: (product) => request("POST", "/produtos", product),
  update: (id, product) => request("PUT", `/produtos/${id}`, product),
  remove: (id) => request("DELETE", `/produtos/${id}`),
};
