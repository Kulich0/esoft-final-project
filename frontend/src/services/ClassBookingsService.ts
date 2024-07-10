import $api from "../http";
import { AxiosResponse } from "axios";
import { IBookings } from "../models/IBookings";

export default class ClassBookingsService { 
    static fetchBookings(): Promise<AxiosResponse<IBookings[]>> {
        return $api.get<IBookings[]>('class-bookings');
    }
    static fetchBookingsByUserId(userId: string): Promise<AxiosResponse<IBookings[]>> {
        return $api.get<IBookings[]>(`class-bookings/users/${userId}`);
    }
    
    static createBooking(newBooking: IBookings): Promise<AxiosResponse<IBookings>> {
        return $api.post<IBookings>('class-bookings', newBooking);
    }
    static updateBooking(id: string, updatedBooking: IBookings): Promise<AxiosResponse<IBookings>> {
        return $api.put<IBookings>(`class-bookings/${id}`, updatedBooking);
    }
    static deleteBooking(id: string): Promise<AxiosResponse<void>> {
        return $api.delete<void>(`class-bookings/${id}`);
    }
}
