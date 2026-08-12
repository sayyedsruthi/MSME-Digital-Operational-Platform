const reportService = require("../services/reportService");
const { success } = require("../utils/responseHandler");

exports.inventoryReport = async (req, res, next) => { try { success(res, "Inventory report generated", await reportService.inventoryReport()); } catch (e) { next(e); } };
exports.salesReport = async (req, res, next) => { try { success(res, "Sales report generated", await reportService.salesReport()); } catch (e) { next(e); } };
exports.employeeReport = async (req, res, next) => { try { success(res, "Employee report generated", await reportService.employeeReport()); } catch (e) { next(e); } };
