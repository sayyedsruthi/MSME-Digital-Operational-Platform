import api from "./api";

export const employeeService = {
  list: async () => {
    const response =
      await api.get("/employees");

    return response.data.data;
  },

  get: async (id) => {
    const response =
      await api.get(
        `/employees/${id}`
      );

    return response.data.data;
  },

  create: async (payload) => {
    const response =
      await api.post(
        "/employees",
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
        `/employees/${id}`,
        payload
      );

    return response.data.data;
  },

  delete: async (id) => {
    return api.delete(
      `/employees/${id}`
    );
  },
};