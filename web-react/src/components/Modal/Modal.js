import React from 'react';
import classes from './Modal.module.css';
import Backdrop from './Backdrop';

const modal = props => {
    return (
        <>
            <Backdrop show={props.show} clicked={props.addMemModalClosed} />
            <div className={classes.AddMemModal} style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? 1 : 0
            }}>
                {props.children}
            </div>
        </>
    );
};


export default modal;