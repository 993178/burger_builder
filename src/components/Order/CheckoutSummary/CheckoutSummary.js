import React from 'react';

import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    console.log(props);
    return (
        <div className={classes.CheckoutSummary}>
            <h1>May the taste be ever your favourite</h1>
            <div /*style={{width: '100%', height: '300px', margin: 'auto'}}*/ >
                <Burger ingredients={props.ingredients} />
            </div>
            <Button clicked={props.checkoutCancelled} btnType="Danger" >CANCEL</Button>
            <Button clicked={props.checkoutContinued} btnType="Success" >GIMME DA BURGER!</Button>
        </div>
    )
}

export default checkoutSummary;