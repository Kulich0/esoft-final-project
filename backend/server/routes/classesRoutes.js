"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classesRoutes = (classController) => {
    const router = (0, express_1.Router)();
    router.get('/classes', (req, res, next) => classController.getAllClasses(req, res, next));
    router.get('/classes/:id', (req, res, next) => classController.getClassesById(req, res, next));
    router.put('/classes/:id', (req, res, next) => classController.updateClasses(req, res, next));
    router.delete('/classes/:id', (req, res, next) => classController.deleteClasses(req, res, next));
    router.post('/classes', (req, res, next) => classController.createClasses(req, res, next));
    return router;
};
exports.default = classesRoutes;
