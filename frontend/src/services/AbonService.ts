import $api from "../http"
import { AxiosResponse } from "axios"
import { IAbon } from "../models/IAbon"

export default class AbonService { 
    static fetchAbons(): Promise<AxiosResponse<IAbon[]>> {
        return $api.get<IAbon[]>('abonements')
    }
}
