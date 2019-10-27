import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = []

    for (let ingredientName in props.ingredients) {
        ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]})     // dus voor ieder ingrediënt in props.ingredients (een object) maken we weer een nieuw, individueel object dat we in die array keilen
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px'}}
        key={ig.name}>{ig.name} ({ig.amount})</span>;        // output als spanelement, beetje raar, die zijn inline, waarom niet gewoon divjes?
    })

    return (
    <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>€{Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
    )
}

export default order;