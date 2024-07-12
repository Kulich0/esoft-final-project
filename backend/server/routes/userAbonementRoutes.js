"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAbonementRoutes = (userAbonementController) => {
    const router = (0, express_1.Router)();
    router.post('/usabonements', (req, res, next) => userAbonementController.createUserAbonement(req, res, next));
    router.get('/usabonements/users/:userId', (req, res, next) => {
        console.log('/usabonements/users/:userId', req.params);
        userAbonementController.getUserAbonementsById(req, res, next);
    });
    return router;
};
exports.default = userAbonementRoutes;
