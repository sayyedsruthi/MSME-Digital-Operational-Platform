import api from "./api";

export const notificationService = {
  list: async () => {
    const response =
      await api.get("/notifications");

    return response.data.data;
  },

  get: async (id) => {
    const response =
      await api.get(
        `/notifications/${id}`
      );

    return response.data.data;
  },

  create: async (payload) => {
    const response =
      await api.post(
        "/notifications",
        payload
      );

    return response.data.data;
  },

  update: async (
    id,
    payload
  ) => {
    const response =
      await api.put(
        `/notifications/${id}`,
        payload
      );

    return response.data.data;
  },

  delete: async (id) => {
    return api.delete(
      `/notifications/${id}`
    );
  },
};