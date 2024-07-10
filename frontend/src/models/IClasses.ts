export interface IClasses {
    id: string,
    title: string,
    description: string,
    profile_picture: {
        type: string; // Например, 'Buffer'
        data: number[]; // Массив чисел
    } | null; // Возможно, `null` если нет изображения
}
