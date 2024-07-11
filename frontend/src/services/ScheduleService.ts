import $api from "../http"
import { AxiosResponse } from "axios"
import { ISchedules } from "../models/ISchedules"

export default class ScheduleService { 
    static fetchSchedules(): Promise<AxiosResponse<ISchedules[]>> {
        return $api.get<ISchedules[]>('class-schedule')
    }
    static fetchSchedulesById(id: string): Promise<AxiosResponse<ISchedules[]>> {
        return $api.get<ISchedules[]>(`class-schedule/${id}`)
    }
    static UpdateSchedules(id: string, updatedSchedules: ISchedules): Promise<AxiosResponse<ISchedules[]>> {
        return $api.put<ISchedules[]>(`class-schedule/${id}`, updatedSchedules)
    }
    static DeleteSchedules(id: string): Promise<AxiosResponse<void>> {
        return $api.delete<void>(`class-schedule/${id}`)
    }
}
