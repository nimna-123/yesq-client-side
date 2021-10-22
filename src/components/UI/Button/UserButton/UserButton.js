import React from 'react';
import classes from './UserButton.module.css';

const Button = (props) => (
    <button
        type='submit'
        className={classes.UserButton}
        onClick={props.clicked}>
            {props.children}
    </button>
);

export default Button;