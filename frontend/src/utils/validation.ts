export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return 'Почта обязательна'
    } else if (!emailRegex.test(email)) {
        return 'Неверный формат почты'
    }
    return null;
};

export const validatePassword = (password: string) : string | null => {
    if(!password) {
        return 'Пароль обязателен';
    } else if (password.length < 9) {
        return 'Пароль должен быть не менее 9 символов';
    }
    return null
}