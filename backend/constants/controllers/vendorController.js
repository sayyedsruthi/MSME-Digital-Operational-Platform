const service = require("../services/vendorService");
const { success } = require("../utils/responseHandler");

exports.getAllVendors = async (req, res, next) => { try { success(res, "Vendors fetched", await service.getAll()); } catch (e) { next(e); } };
exports.getVendorById = async (req, res, next) => { try { success(res, "Vendor fetched", await service.getById(req.params.id)); } catch (e) { next(e); } };
exports.createVendor = async (req, res, next) => { try { success(res, "Vendor created", await service.create(req.body), 201); } catch (e) { next(e); } };
exports.updateVendor = async (req, res, next) => { try { success(res, "Vendor updated", await service.update(req.params.id, req.body)); } catch (e) { next(e); } };
exports.deleteVendor = async (req, res, next) => { try { await service.remove(req.params.id); success(res, "Vendor deleted"); } catch (e) { next(e); } };
