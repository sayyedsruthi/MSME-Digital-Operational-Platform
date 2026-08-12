const service = require("../services/orderService");
const { success } = require("../utils/responseHandler");

exports.getAllOrders = async (req, res, next) => { try { success(res, "Orders fetched", await service.getAll()); } catch (e) { next(e); } };
exports.getOrderById = async (req, res, next) => { try { success(res, "Order fetched", await service.getById(req.params.id)); } catch (e) { next(e); } };
exports.createOrder = async (req, res, next) => { try { success(res, "Order created", await service.create(req.body), 201); } catch (e) { next(e); } };
exports.updateOrder = async (req, res, next) => { try { success(res, "Order updated", await service.update(req.params.id, req.body)); } catch (e) { next(e); } };
exports.deleteOrder = async (req, res, next) => { try { await service.remove(req.params.id); success(res, "Order deleted"); } catch (e) { next(e); } };
