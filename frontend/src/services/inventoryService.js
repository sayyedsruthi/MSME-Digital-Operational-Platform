import api from "./api";

export const inventoryService = {
  list: async () => {
    const response = await api.get("/inventory");
    return response.data.data;
  },

  get: async (id) => {
    const response = await api.get(`/inventory/${id}`);
    return response.data.data;
  },

  create: async (payload) => {
    const response = await api.post(
      "/inventory",
      payload
    );

    return response.data.data;
  },

  update: async (id, payload) => {
    const response = await api.put(
      `/inventory/${id}`,
      payload
    );

    return response.data.data;
  },

  delete: async (id) => {
    const response = await api.delete(
      `/inventory/${id}`
    );

    return response.data;
  },
};