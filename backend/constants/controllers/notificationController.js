const model = require("../models/notificationModel");
const { success } = require("../utils/responseHandler");

exports.getAllNotifications = async (req, res, next) => { try { success(res, "Notifications fetched", await model.findAll()); } catch (e) { next(e); } };
exports.getNotificationById = async (req, res, next) => { try { success(res, "Notification fetched", await model.findById(req.params.id)); } catch (e) { next(e); } };
exports.createNotification = async (req, res, next) => { try { success(res, "Notification created", await model.create(req.body), 201); } catch (e) { next(e); } };
exports.updateNotification = async (req, res, next) => { try { success(res, "Notification updated", await model.update(req.params.id, req.body)); } catch (e) { next(e); } };
exports.deleteNotification = async (req, res, next) => { try { await model.remove(req.params.id); success(res, "Notification deleted"); } catch (e) { next(e); } };
