const dashboardService = require("../services/dashboardService");
const { success } = require("../utils/responseHandler");

exports.getDashboardSummary = async (req, res, next) => {
  try {
    success(res, "Dashboard summary fetched", await dashboardService.getSummary());
  } catch (error) {
    next(error);
  }
};
