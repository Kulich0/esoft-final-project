import $api from "../http"
import { AxiosResponse } from "axios"
import { IClasses } from "../models/IClasses"

export default class ClassesService { 
    static fetchClasses(): Promise<AxiosResponse<IClasses[]>> {
        return $api.get<IClasses[]>('classes')
    }
    static fetchClassesById(id: string): Promise<AxiosResponse<IClasses[]>> {
        return $api.get<IClasses[]>(`classes/${id}`)
    }
    static UpdateClasses(id: string, updatedClass: IClasses): Promise<AxiosResponse<IClasses[]>> {
        return $api.put<IClasses[]>(`classes/${id}`, updatedClass)
    }
    static DeleteClasses(id: string): Promise<AxiosResponse<void>> {
        return $api.delete<void>(`classes/${id}`)
    }
}
