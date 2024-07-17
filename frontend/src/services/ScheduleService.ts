import $api from "../http"
import { AxiosResponse } from "axios"
import { ISchedules } from "../models/ISchedules"

export default class ScheduleService { 
    static fetchSchedules(): Promise<AxiosResponse<ISchedules[]>> {
        return $api.get<ISchedules[]>('class-schedule')
    }
}
