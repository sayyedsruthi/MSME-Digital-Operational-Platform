import api from "./api";

export const vendorService = {
  list: async () => {
    const response = await api.get("/vendors");
    return response.data.data;
  },

  get: async (id) => {
    const response = await api.get(`/vendors/${id}`);
    return response.data.data;
  },

  create: async (payload) => {
    const response = await api.post(
      "/vendors",
      payload
    );

    return response.data.data;
  },

  update: async (id, payload) => {
    const response = await api.put(
      `/vendors/${id}`,
      payload
    );

    return response.data.data;
  },

  delete: async (id) => {
    return api.delete(`/vendors/${id}`);
  },
};