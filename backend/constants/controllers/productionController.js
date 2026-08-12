const service = require("../services/productionService");
const { success } = require("../utils/responseHandler");

exports.getAllProduction = async (req, res, next) => { try { success(res, "Production batches fetched", await service.getAll()); } catch (e) { next(e); } };
exports.getProductionById = async (req, res, next) => { try { success(res, "Production batch fetched", await service.getById(req.params.id)); } catch (e) { next(e); } };
exports.createProduction = async (req, res, next) => { try { success(res, "Production batch created", await service.create(req.body), 201); } catch (e) { next(e); } };
exports.updateProduction = async (req, res, next) => { try { success(res, "Production batch updated", await service.update(req.params.id, req.body)); } catch (e) { next(e); } };
exports.deleteProduction = async (req, res, next) => { try { await service.remove(req.params.id); success(res, "Production batch deleted"); } catch (e) { next(e); } };
