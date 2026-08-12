import api from "./api";

export const orderService = {
  list: async () => {
    const response = await api.get("/orders");
    return response.data.data;
  },

  get: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data.data;
  },

  create: async (payload) => {
    const response = await api.post(
      "/orders",
      payload
    );

    return response.data.data;
  },

  update: async (id, payload) => {
    const response = await api.put(
      `/orders/${id}`,
      payload
    );

    return response.data.data;
  },

  delete: async (id) => {
    return api.delete(`/orders/${id}`);
  },
};