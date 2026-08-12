const model = require("../models/orderModel");
exports.getAll = () => model.findAll();
exports.getById = (id) => model.findById(id);
exports.create = (payload) => model.create(payload);
exports.update = (id, payload) => model.update(id, payload);
exports.remove = (id) => model.remove(id);
