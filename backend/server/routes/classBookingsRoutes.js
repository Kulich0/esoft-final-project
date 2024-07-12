"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classBookingsRoutes = (classBookingsController) => {
    const router = (0, express_1.Router)();
    router.get('/class-bookings', (req, res, next) => classBookingsController.getAllClassBookings(req, res, next));
    /* router.get('/class-bookings/users/:userId', (req: Request, res: Response, next: NextFunction) => classBookingsController.getClassBookingsById(req, res, next));  */
    router.put('/class-bookings/:id', (req, res, next) => classBookingsController.updateClassBookings(req, res, next));
    router.delete('/class-bookings/:id', (req, res, next) => classBookingsController.deleteClassBookings(req, res, next));
    router.post('/class-bookings', (req, res, next) => classBookingsController.createClassBookings(req, res, next));
    router.get('/class-bookings/users/:userId', (req, res, next) => classBookingsController.getClassesBookingsById(req, res, next));
    return router;
};
exports.default = classBookingsRoutes;
