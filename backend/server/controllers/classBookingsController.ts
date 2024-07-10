import { Request, Response, NextFunction } from 'express';
import ClassBookingsService from "../services/classBookingsServices";

class ClassBookingsController {
    private classBookingsServices: ClassBookingsService;

    constructor(classBookingsServices: ClassBookingsService) {
        this.classBookingsServices = classBookingsServices;
    }

    async getAllClassBookings(req: Request, res: Response, next: NextFunction) {
        try {
            const classBookings = await this.classBookingsServices.getAllClassBookings(req.query.offset as unknown as number, req.query.limit as unknown as number);
            res.status(200).json(classBookings);
        } catch (e) {
            next(e);
        }
    }

    async getClassBookingsById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId, 10);
            if (isNaN(userId)) {
                return res.status(400).json({ message: 'Неверный ID пользователя' });
            }
            const classBookings = await this.classBookingsServices.getClassBookingsById(userId);
            if (!classBookings || classBookings.length === 0) {
                res.status(404).json({ message: 'Записи на занятия не найдены' });
            } else {
                res.status(200).json(classBookings);
            }
        } catch (e) {
            next(e);
        }
    }

    async updateClassBookings(req: Request, res: Response, next: NextFunction) {
        try {
            const classBookingId = parseInt(req.params.id, 10);
            if (isNaN(classBookingId)) {
                return res.status(400).json({ message: 'Неверный ID записи на занятие' });
            }
            const updatedClassBookingData = req.body;
            const updatedClassBooking = await this.classBookingsServices.updateClassBooking(classBookingId, updatedClassBookingData);
            res.status(200).json({ message: 'Запись на занятие обновлено', updatedClassBooking });
        } catch (e) {
            next(e);
        }
    }

    async deleteClassBookings(req: Request, res: Response, next: NextFunction) {
        try {
            const classBookingId = parseInt(req.params.id, 10);
            if (isNaN(classBookingId)) {
                return res.status(400).json({ message: 'Неверный ID записи на занятие' });
            }
            await this.classBookingsServices.deleteClassBookings(classBookingId);
            res.status(200).json({ message: 'Запись на занятие удалено' });
        } catch (e) {
            next(e);
        }
    }

    async createClassBookings(req: Request, res: Response, next: NextFunction) {
        try {
            const newClassBookingData = req.body;
            const createdClassBooking = await this.classBookingsServices.createClassBookings(newClassBookingData);
            res.status(201).json({ message: 'Запись на занятие создано', createdClassBooking });
        } catch (e) {
            next(e);
        }
    }
}

export default ClassBookingsController;
