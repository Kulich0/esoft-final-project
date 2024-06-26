export interface CardType {
    title: string;
    description: string;
    image: string;
}

export interface ScheduleType {
    day: string;
    times: string[];
    classes: string[]
}

export const LOAD_CARDS = 'LOAD_CARDS';
export const LOAD_SCHEDULE = 'LOAD_SCHEDULE';

export const loadCards = () => ({
    type: LOAD_CARDS,
});

export const loadSchedule = () => ({
    type: LOAD_SCHEDULE,
});
