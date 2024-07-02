import ClassScheduleModel from '../models/classSchedulesModel';

class ClassScheduleService {
    constructor(private classScheduleModel: typeof ClassScheduleModel) {}

    async getAllClassSchedule(offset: number, limit: number) {
        return this.classScheduleModel.getAll(offset, limit);
    }

    async getClassScheduleById(classScheduleId: number) {
        return this.classScheduleModel.getById(classScheduleId);
    }

    async updateClassSchedule(id: number, classScheduleData: { start_time?: number; end_time?: number}) {
        const newClassScheduleData = {
            ...(classScheduleData.start_time && { start_time: classScheduleData.start_time }),
            ...(classScheduleData.end_time && { description: classScheduleData.end_time }),
        };

        return this.classScheduleModel.update(id, newClassScheduleData);
    }

    async deleteClassSchedule(classScheduleId: number) {
        return this.classScheduleModel.delete(classScheduleId);
    }

    async createClassSchedule(classScheduleData: any) {
        return this.classScheduleModel.create(classScheduleData);
    }
}

export default ClassScheduleService;
