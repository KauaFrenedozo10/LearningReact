import { request } from "./httpClient";

export const paymentService = {
  pay: (payment) => request("POST", "/pagamentos", payment),
};
