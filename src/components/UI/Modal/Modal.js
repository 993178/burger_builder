import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (      // we hebben in Backdrop een onClick toegevoegd, dus dat is nu het probleem van Modal, en hoger in de voedselketen dus iets voor BurgerBuilder om op te lossen
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div 
            className={classes.Modal} 
            style={{ 
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }} >
            {props.children}
        </div>
    </Aux>
);

export default modal;