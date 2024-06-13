import React from 'react';
import MyButton from '../MyButton/MyButton';
import './HeaderStyle.css'

interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
    return (
        <header className={`my-header ${className || ''}`}>
            <MyButton>Меню</MyButton>
            <MyButton>Расписание</MyButton>
            <MyButton>Команда</MyButton>
        </header>
    );
};

export default Header;
