import { LOAD_CARDS, LOAD_SCHEDULE } from './actions';

import hathayoga from '../assets/images/hathayoga.jpg';
import thegroupishealthy from '../assets/images/thegroupishealthy.jpg';
import yogainhammocks from '../assets/images/yogainhammocks.jpg';
import yogamedium from '../assets/images/yogamedium.jpg';

const initialCardsState = [
    { title: 'Хатха-йога', description: 'Че то там потом', image: hathayoga },
    { title: 'Йога в гамаках(для начинающих)', description: 'Другой текст для карточки', image: yogainhammocks },
    { title: 'Йога в гамаках(средний уровень)', description: 'Другой текст для карточки', image: yogamedium },
    { title: 'Йога-нидра', description: 'Третий текст для карточки', image: '/static/images/cards/contemplative-reptile.jpg' },
    { title: 'Группа здоровья', description: 'Третий текст для карточки', image: thegroupishealthy },
    { title: 'Индивидуальное занятие', description: 'Третий текст для карточки', image: '/static/images/cards/contemplative-reptile.jpg' },
];

const initialScheduleState = [
    { day: 'Понедельник', times: ['7:30-8:45'], classes: ['Йога в гамаках для начинающих'] },
    { day: 'Вторник', times: ['7:00-8:20', '8:25-9:30', '14:20-15:20', '15:30-16:40'], classes: ['Йога в гамаках для начинающих и продолжающих', 'Йога в гамаках для начинающих и продолжающих', 'Группа здоровья', 'Йога в гамаках для начинающих и продолжающих'] },
    { day: 'Среда', times: ['7:30-8:45'], classes: ['Йога в гамаках для начинающих'] },
    { day: 'Четверг', times: ['7:00-8:20', '8:25-9:45', '14:20-15:20', '15:30-16:40'], classes: ['Хатха-йога', 'Хатха-йога', 'Группа здоровья', 'Хатха-йога'] },
    { day: 'Пятница', times: ['7:30-8:45'], classes: ['Йога в гамаках для начинающих'] },
    { day: 'Суббота', times: ['7:15-8:45'], classes: ['Хатха-йога'] },
];

const initialState = {
    cards: initialCardsState,
    schedule: initialScheduleState,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CARDS:
            return { ...state, cards: state.cards };
        case LOAD_SCHEDULE:
            return { ...state, schedule: state.schedule };
        default:
            return state;
    }
};

export default rootReducer;
