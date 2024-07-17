import $api from "../http"
import { AxiosResponse } from "axios"
import { IUser } from "../models/IUser"

export default class UserService { 
    static fetchUserById(id: string): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`users/${id}`, )
    }
    static UpdateUser(id: string, updatedUsers: IUser): Promise<AxiosResponse<IUser>> {
        return $api.put<IUser>(`users/${id}`, updatedUsers)
    }
}
