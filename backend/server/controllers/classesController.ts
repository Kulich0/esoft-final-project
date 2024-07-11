import { Request, Response, NextFunction } from 'express';
import ClassesService from "../services/classesServices";

class ClassesController {
    private classesService: ClassesService;

    constructor(classesService: ClassesService) {
        this.classesService = classesService;
    }

    async getAllClasses(req: Request, res: Response, next: NextFunction) {
        try {
            const classes = await this.classesService.getAllClasses(req.query.offset as unknown as number, req.query.limit as unknown as number);
            res.status(200).json(classes);
        } catch (e) {
            next(e);
        }
    }

    async getClassesById(req: Request, res: Response, next: NextFunction) {
        try {
            const classId = parseInt(req.params.id, 10);
            if (isNaN(classId)) {
                return res.status(400).json({ message: 'Неверный ID занятия' });
            }
            const classcenter = await this.classesService.getClassesById(classId);
            if (!classcenter) {
                res.status(404).json({ message: 'Занятие не найдено' });
            } else {
                res.status(200).json(classcenter);
            }
        } catch (e) {
            next(e);
        }
    }

    async updateClasses(req: Request, res: Response, next: NextFunction) {
        try {
            const classId = parseInt(req.params.id, 10);
            if (isNaN(classId)) {
                return res.status(400).json({ message: 'Неверный ID занятия' });
            }
            const updatedClassesData = req.body;
            const updatedClass = await this.classesService.updateClass(classId, updatedClassesData);
            res.status(200).json({ message: 'Занятие обновлено', updatedClass });
        } catch (e) {
            next(e);
        }
    }

    async deleteClasses(req: Request, res: Response, next: NextFunction) {
        try {
            const classId = parseInt(req.params.id, 10);
            if (isNaN(classId)) {
                return res.status(400).json({ message: 'Неверный ID занятия' });
            }
            await this.classesService.deleteClass(classId);
            res.status(200).json({ message: 'Занятие удалено' });
        } catch (e) {
            next(e);
        }
    }

    async createClasses(req: Request, res: Response, next: NextFunction) {
        try {
            const newClassData = req.body;
            const createdClass = await this.classesService.createClass(newClassData);
            res.status(201).json({ message: 'Занятие создано', createdClass });
        } catch (e) {
            next(e);
        }
    }
}

export default ClassesController;
