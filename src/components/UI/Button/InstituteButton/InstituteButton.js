import React from 'react';
import classes from './InstituteButton.module.css';

const InstituteButton = (props) => (
    <button
        type='submit'
        className={classes.InstLogButton}
        onClick={props.clicked}>
            {props.children}
    </button>
);

export default InstituteButton; 