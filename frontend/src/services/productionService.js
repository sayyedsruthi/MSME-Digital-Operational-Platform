import api from "./api";

export const productionService = {
  list: async () => {
    const response = await api.get("/production");
    return response.data.data;
  },

  get: async (id) => {
    const response = await api.get(`/production/${id}`);
    return response.data.data;
  },

  create: async (payload) => {
    const response = await api.post(
      "/production",
      payload
    );

    return response.data.data;
  },

  update: async (id, payload) => {
    const response = await api.put(
      `/production/${id}`,
      payload
    );

    return response.data.data;
  },

  delete: async (id) => {
    return api.delete(
      `/production/${id}`
    );
  },
};