import React from 'react';
import './MyButtonStyle.css';

interface MyButtonProps {
    className?: string;
    children?: React.ReactChild | React.ReactNode;
}

const MyButton: React.FC<MyButtonProps> = ({ className, children }) => {
    return (
        <button className={`my-button ${className}`}>
            {children}
        </button>
    );
};

export default MyButton;
