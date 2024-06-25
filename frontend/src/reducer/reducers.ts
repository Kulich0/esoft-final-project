import { LOAD_CARDS, CardType } from "./actions";

import hathayoga from '../assets/images/hathayoga.jpg';
import thegroupishealthy from '../assets/images/thegroupishealthy.jpg';
import yogainhammocks from '../assets/images/yogainhammocks.jpg';
import yogamedium from '../assets/images/yogamedium.jpg';


const initialState: CardType[] = [
    {
        title: 'Хатха-йога',
        description: 'Че то там потом',
        image: hathayoga,
    },
    {
        title: 'Йога в гамаках(для начинающих)',
        description: 'Другой текст для карточки',
        image: yogainhammocks,
    },
    {
        title: 'Йога в гамаках(средний уровень)',
        description: 'Другой текст для карточки',
        image: yogamedium,
    },
    {
        title: 'Йога-нидра',
        description: 'Третий текст для карточки',
        image: '.jpg',
    },
    {
        title: 'Группа здоровья',
        description: 'Третий текст для карточки',
        image: thegroupishealthy,
    },
    {
        title: 'Индивидуальное занятие',
        description: 'Третий текст для карточки',
        image: '.jpg',
    },
];

const cardReducer = (state = initialState, action: any): CardType[] => {
    switch (action.type) {
      case LOAD_CARDS:
        return state;
      default:
        return state;
    }
  };
  
  export default cardReducer;