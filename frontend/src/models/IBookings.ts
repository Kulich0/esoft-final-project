export interface IBookings {
    id: number;
    user_id: number;
    class_schedule_id: number;
    booking_time: string;
    status: 'pending' | 'confirmed' | 'cancelled',
    classes?: string;
    start_time?: string | null;
    end_time?: string | null;
    day?: string;
}
