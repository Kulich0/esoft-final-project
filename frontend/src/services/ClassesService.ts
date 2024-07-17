import $api from "../http"
import { AxiosResponse } from "axios"
import { IClasses } from "../models/IClasses"

export default class ClassesService { 
    static fetchClasses(): Promise<AxiosResponse<IClasses[]>> {
        return $api.get<IClasses[]>('classes')
    } 
}
