const service = require("../services/employeeService");
const { success } = require("../utils/responseHandler");

exports.getAllEmployees = async (req, res, next) => { try { success(res, "Employees fetched", await service.getAll()); } catch (e) { next(e); } };
exports.getEmployeeById = async (req, res, next) => { try { success(res, "Employee fetched", await service.getById(req.params.id)); } catch (e) { next(e); } };
exports.createEmployee = async (req, res, next) => { try { success(res, "Employee created", await service.create(req.body), 201); } catch (e) { next(e); } };
exports.updateEmployee = async (req, res, next) => { try { success(res, "Employee updated", await service.update(req.params.id, req.body)); } catch (e) { next(e); } };
exports.deleteEmployee = async (req, res, next) => { try { await service.remove(req.params.id); success(res, "Employee deleted"); } catch (e) { next(e); } };
