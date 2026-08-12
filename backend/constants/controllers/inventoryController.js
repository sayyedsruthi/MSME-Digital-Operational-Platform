const service = require("../services/inventoryService");
const { success } = require("../utils/responseHandler");

exports.getAllInventory = async (req, res, next) => { try { success(res, "Inventory fetched", await service.getAll()); } catch (e) { next(e); } };
exports.getInventoryById = async (req, res, next) => { try { success(res, "Inventory item fetched", await service.getById(req.params.id)); } catch (e) { next(e); } };
exports.createInventory = async (req, res, next) => { try { success(res, "Inventory item created", await service.create(req.body), 201); } catch (e) { next(e); } };
exports.updateInventory = async (req, res, next) => { try { success(res, "Inventory item updated", await service.update(req.params.id, req.body)); } catch (e) { next(e); } };
exports.deleteInventory = async (req, res, next) => { try { await service.remove(req.params.id); success(res, "Inventory item deleted"); } catch (e) { next(e); } };
