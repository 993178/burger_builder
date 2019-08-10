import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Lettuce', type: 'lettuce' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },        // voor het gemak een overzicht van de mogelijke ingredienten zoals die ook in de switch in BurgerIngredients staan. Dus eigenlijk is dit wat slordig, want nu heb je 2 bronnen met een lijst ingredienten ipv 1 plek waar je ze aan kunt passen als de bacon op is.
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map(ctrl => (             // we mappen over de array controls, voor elke ctrl renderen we een BuildControl
            <BuildControl 
                added={() => props.ingredientAdded(ctrl.type)} 
                removed={() => props.ingredientRemoved(ctrl.type)}
                key={ctrl.label} 
                label={ctrl.label} />
        ))}
    </div>
);

export default buildControls;