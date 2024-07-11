import ClassesModel from '../models/classesModel';

class ClassesService {
    constructor(private classesModel: typeof ClassesModel) {}

    async getAllClasses(offset: number, limit: number) {
        return this.classesModel.getAll(offset, limit);
    }

    async getClassesById(classId: number) {
        return this.classesModel.getById(classId);
    }

    async updateClass(id: number, classData: { title?: string; description?: string; duration?: number; max_participants?: number }) {
        const newClassData = {
            ...(classData.title && { title: classData.title }),
            ...(classData.description && { description: classData.description }),
            ...(classData.duration && { duration: classData.duration }),
            ...(classData.max_participants && { max_participants: classData.max_participants }),
        };

        return this.classesModel.update(id, newClassData);
    }

    async deleteClass(classId: number) {
        return this.classesModel.delete(classId);
    }

    async createClass(classData: any) {
        return this.classesModel.create(classData);
    }
}

export default ClassesService;
