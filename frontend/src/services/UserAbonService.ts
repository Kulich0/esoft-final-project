import $api from "../http"
import { AxiosResponse } from "axios"
import { IUserAbon } from "../models/IUserAbon"

export default class UserAbonService { 
    static fetchUserAbonsById(userId: number): Promise<AxiosResponse<IUserAbon[]>> {
        return $api.get<IUserAbon[]>(`/usabonements/users/${userId}`);  
    }

    static creatingAbons(newAbons: IUserAbon): Promise<AxiosResponse<IUserAbon>> {
        return $api.post<IUserAbon>('/usabonements', newAbons);  
    }
}
