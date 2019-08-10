import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {     // global constants doe je met alleen hoofdletters
    lettuce: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            bacon: 0,
            cheese: 0,
            meat: 0,
            lettuce: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];      // je neemt het oude aantal van ingredient [type]
        const updatedCount = oldCount +1;                   // je telt er 1 bij op
        const updatedIngredients = { ...this.state.ingredients };   // je kopieert state.ingredients en slaat de kopie op in updatedIngredients
        updatedIngredients[type] = updatedCount;                // je zet het nieuwe [type]aantal in de kopie

        const priceAddition = INGREDIENT_PRICES[type];      // je plukt de prijs per unit [type] uit de globale prijsdatabase
        const oldPrice = this.state.totalPrice;             // je neemt de oude totaalprijs uit state en gooit hem in oldPrice
        const newPrice = oldPrice + priceAddition;          // je telt de [type] prijs bij het oude totaal op

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})      // je setState de nieuwe versies van totalPrice en ingredients
    }

    removeIngredientHandler = (type) => {

    }

    render () {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;