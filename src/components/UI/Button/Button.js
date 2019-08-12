import React from 'react';
import classes from './Button.module.css';

const button = (props) => (     // DiscountJonas doet classNames met een array [classes.Butoon, classes[props.btnType]].join(' ').  Okee dan.
    <button className={`${classes.Button} ${classes[props.btnType]}`} onClick={props.clicked} >{props.children}
    </button>
)

export default button;

/* En hier hebben we, courtesy of Discount Jonas, een geheel aparte Button.js in een aparte 
Button map en met een aparte Button.module.css die we apart weer moeten importeren hier, en 
dat mag natuurlijk, het is een vrij land, maar als er ÉÉN ARGUMENT TEGEN DIE FOKKING CSS
MODULES IS DAN IS DIT HET WEL */
// WHY
// WHY, DISCOUNT JONAS

// Gewoon 1 css-file voor die hele burger, Discount Jonas. Is dat echt zo erg?
// Al die componenten hebben toch al verschillende namen. Er is amper overlap.
// Had je zo dezelfde button overal kunnen gebruiken.
// einde rant
