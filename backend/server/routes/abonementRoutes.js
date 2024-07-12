"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const abonementRoutes = (abonementController) => {
    const router = (0, express_1.Router)();
    router.get('/abonements', (req, res, next) => abonementController.getAllAbonements(req, res, next));
    return router;
};
exports.default = abonementRoutes;
