import { Request, Response, NextFunction } from 'express';
import ClassScheduleService from "../services/classSchedulesServices";

class ClassScheduleController {
    private classScheduleService: ClassScheduleService;

    constructor(classScheduleService: ClassScheduleService) {
        this.classScheduleService = classScheduleService;
    }

    async getAllClassSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const classSchedules = await this.classScheduleService.getAllClassSchedule(req.query.offset as unknown as number, req.query.limit as unknown as number);
            res.status(200).json(classSchedules);
        } catch (e) {
            next(e);
        }
    }

    async getClassScheduleById(req: Request, res: Response, next: NextFunction) {
        try {
            const classScheduleId = parseInt(req.params.id, 10);
            if (isNaN(classScheduleId)) {
                return res.status(400).json({ message: 'Неверный ID расписания занятия' });
            }
            const classSchedule = await this.classScheduleService.getClassScheduleById(classScheduleId);
            if (!classSchedule) {
                res.status(404).json({ message: 'Занятие не найдено' });
            } else {
                res.status(200).json(classSchedule);
            }
        } catch (e) {
            next(e);
        }
    }

    async updateClassSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const classScheduleId = parseInt(req.params.id, 10);
            if (isNaN(classScheduleId)) {
                return res.status(400).json({ message: 'Неверный ID расписания занятия' });
            }
            const updatedClassScheduleData = req.body;
            const updatedClassSchedule = await this.classScheduleService.updateClassSchedule(classScheduleId, updatedClassScheduleData);
            res.status(200).json({ message: 'Расписание занятия обновлено', updatedClassSchedule });
        } catch (e) {
            next(e);
        }
    }

    async deleteClassSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const classScheduleId = parseInt(req.params.id, 10);
            if (isNaN(classScheduleId)) {
                return res.status(400).json({ message: 'Неверный ID расписания занятия' });
            }
            await this.classScheduleService.deleteClassSchedule(classScheduleId);
            res.status(200).json({ message: 'Расписание занятия удалено' });
        } catch (e) {
            next(e);
        }
    }

    async createClassSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const newClassScheduleData = req.body;
            const createdClassSchedule = await this.classScheduleService.createClassSchedule(newClassScheduleData);
            res.status(201).json({ message: 'Занятие создано', createdClassSchedule });
        } catch (e) {
            next(e);
        }
    }
}

export default ClassScheduleController;