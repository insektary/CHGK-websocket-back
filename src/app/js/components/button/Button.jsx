import React from 'react';
import styles from './button.css';

const {
    button_base,
    button__big,
    button__regular,
    button__disabled,
    button__enabled
} = styles;

export const Button = ({
    title,
    isBig,
    onClick,
    disabled
}) => (
    <button
        onClick={onClick}
        className={`${button_base} ${isBig ? button__big : button__regular} ${disabled ? button__disabled : button__enabled}`}
        disabled={disabled}
    >{title}</button>
);
