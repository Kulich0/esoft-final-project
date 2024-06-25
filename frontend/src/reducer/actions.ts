export interface CardType {
    title: string;
    description: string;
    image: string;
}


export const LOAD_CARDS = 'LOAD_CARDS';

export const loadCards = () => ({
    type: LOAD_CARDS,
  });