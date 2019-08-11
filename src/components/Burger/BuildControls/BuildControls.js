import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Lettuce', type: 'lettuce' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },        // voor het gemak een overzicht van de mogelijke ingredienten zoals die ook in de switch in BurgerIngredients staan. Dus eigenlijk is dit wat slordig, want nu heb je 2 bronnen met een lijst ingredienten ipv 1 plek waar je ze aan kunt passen als de bacon op is.
]

const buildControls = (props) => (                      // toFixed(2) om het getal af te ronden op twee decimalen (JavaScript doet weleens raar bij het optellen van simpele getalletjes, maakt ie er opeens 4.0000000001 van ipv 4)
    <div className={classes.BuildControls}>
        <p>Current burger price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (             // we mappen over de array controls, voor elke ctrl renderen we een BuildControl
            <BuildControl 
                added={() => props.ingredientAdded(ctrl.type)} 
                removed={() => props.ingredientRemoved(ctrl.type)}
                key={ctrl.label} 
                label={ctrl.label}
                disabled={props.disabled[ctrl.type]} /* we krijgen hier de prop disabled, kijken specifiek naar het relevante type, en geven daarmee indirect true/false door */ />
        ))}
        <button className={classes.OrderButton} /* onClick={} */ disabled={!props.purchasable} >Order!</button>
    </div>
); 

export default buildControls;