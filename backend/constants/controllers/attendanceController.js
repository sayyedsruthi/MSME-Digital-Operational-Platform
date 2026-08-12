const model = require("../models/attendanceModel");
const { success } = require("../utils/responseHandler");

exports.getAllAttendance = async (req, res, next) => { try { success(res, "Attendance fetched", await model.findAll()); } catch (e) { next(e); } };
exports.getAttendanceById = async (req, res, next) => { try { success(res, "Attendance fetched", await model.findById(req.params.id)); } catch (e) { next(e); } };
exports.createAttendance = async (req, res, next) => { try { success(res, "Attendance created", await model.create(req.body), 201); } catch (e) { next(e); } };
exports.updateAttendance = async (req, res, next) => { try { success(res, "Attendance updated", await model.update(req.params.id, req.body)); } catch (e) { next(e); } };
exports.deleteAttendance = async (req, res, next) => { try { await model.remove(req.params.id); success(res, "Attendance deleted"); } catch (e) { next(e); } };
