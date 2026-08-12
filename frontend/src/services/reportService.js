import api from "./api";

export const reportService = {
  inventory: async () => {
    const response = await api.get(
      "/reports/inventory"
    );

    return response.data.data;
  },

  sales: async () => {
    const response = await api.get(
      "/reports/sales"
    );

    return response.data.data;
  },

  employees: async () => {
    const response = await api.get(
      "/reports/employees"
    );

    return response.data.data;
  },
};