"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classScheduleRoutes = (classScheduleController) => {
    const router = (0, express_1.Router)();
    router.get('/class-schedule', (req, res, next) => classScheduleController.getAllClassSchedule(req, res, next));
    router.get('/class-schedule/:id', (req, res, next) => classScheduleController.getClassScheduleById(req, res, next));
    router.put('/class-schedule/:id', (req, res, next) => classScheduleController.updateClassSchedule(req, res, next));
    router.delete('/class-schedule/:id', (req, res, next) => classScheduleController.deleteClassSchedule(req, res, next));
    router.post('/class-schedule', (req, res, next) => classScheduleController.createClassSchedule(req, res, next));
    return router;
};
exports.default = classScheduleRoutes;
