import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';   // webpack gaat dit pad netjes inpakken en verschepen, maar zou dat niet doen als je dit pad direct in de <img src> zet
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} >
        <img src={burgerLogo} alt="burger logo. Kinda weird to have an alt on such a visual website, does Discount Jonas plan to put such alts on every part of the burger too? I kinda doubt it tbh"/>
    </div>
);

export default logo;