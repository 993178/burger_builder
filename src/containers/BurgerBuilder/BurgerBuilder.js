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

    changeIngredientHandler = (type, adrem) => {
        const oldCount = this.state.ingredients[type];      // je neemt het oude aantal van ingredient [type]
        let updatedCount;                                   // initieer updatedCount als let
        
        const priceIngredient = INGREDIENT_PRICES[type];      // je plukt de prijs per unit [type] uit de globale prijsdatabase
        const oldPrice = this.state.totalPrice;             // je neemt de oude totaalprijs uit state en gooit hem in oldPrice
        let newPrice;                                       // je initieert newPrice als let

        if (adrem === 'add') {                              // bepaal aan de hand van adrem of er iets bij of af moet, zowel van het aantal ingredienten [type] in de state, als van de totaalprijs
            updatedCount = oldCount +1;                     // het oude aantal [type] wordt aangepast met 1 tegelijk
            newPrice = oldPrice + priceIngredient;          // je telt de [type] prijs bij het oude totaal op
        } else if (adrem === 'remove' && oldCount <= 0) {
            updatedCount = 0;
        } else if (adrem === 'remove') {
            updatedCount = oldCount -1;                     
            newPrice = oldPrice - priceIngredient;
        }

        const updatedIngredients = { ...this.state.ingredients };   // je kopieert state.ingredients en slaat de kopie op in updatedIngredients
        updatedIngredients[type] = updatedCount;                // je zet het nieuwe [type]aantal in de kopie

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})      // je setState de nieuwe versies van totalPrice en ingredients
    }

    addIngredientHandler = (type) => {
        this.changeIngredientHandler(type, 'add');

        // const oldCount = this.state.ingredients[type];      // je neemt het oude aantal van ingredient [type]
        
        // const priceIngredient = INGREDIENT_PRICES[type];      // je plukt de prijs per unit [type] uit de globale prijsdatabase
        // const oldPrice = this.state.totalPrice;             // je neemt de oude totaalprijs uit state en gooit hem in oldPrice

        // const updatedCount = oldCount +1;                     // het oude aantal [type] wordt aangepast met 1 tegelijk
        // const newPrice = oldPrice + priceIngredient;          // je telt de [type] prijs bij het oude totaal op

        // const updatedIngredients = { ...this.state.ingredients };   // je kopieert state.ingredients en slaat de kopie op in updatedIngredients
        // updatedIngredients[type] = updatedCount;                // je zet het nieuwe [type]aantal in de kopie

        // this.setState({totalPrice: newPrice, ingredients: updatedIngredients})      // je setState de nieuwe versies van totalPrice en ingredients

    }

    removeIngredientHandler = (type) => {
        this.changeIngredientHandler(type, 'remove');

        // const oldCount = this.state.ingredients[type];      // je neemt het oude aantal van ingredient [type]
        // if (oldCount <= 0) {
        //     return;
        // };
        // const updatedCount = oldCount -1;                     
        // const updatedIngredients = { ...this.state.ingredients };   // je kopieert state.ingredients en slaat de kopie op in updatedIngredients
        // updatedIngredients[type] = updatedCount;                // je zet het nieuwe [type]aantal in de kopie

        // const priceIngredient = INGREDIENT_PRICES[type];      // je plukt de prijs per unit [type] uit de globale prijsdatabase
        // const oldPrice = this.state.totalPrice;             // je neemt de oude totaalprijs uit state en gooit hem in oldPrice
        // const newPrice = oldPrice - priceIngredient;
        // this.setState({totalPrice: newPrice, ingredients: updatedIngredients})      // je setState de nieuwe versies van totalPrice en ingredients
    }

    render () {
        const disabledInfo = {      // we willen knoppen disablen die niets moeten kunnen doen
            ...this.state.ingredients   // in den beginne is dit nog { lettuce: 0, meat: 1} etc
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0  // bij elk ingredient checken we of de hoeveelheid kleiner of gelijk is aan 0, zo ja, dan slaan we true op onder die key in disabledInfo: { lettuce: true, meat: false } etc
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} /* disabledInfo is hier een object { lettuce: true, meat: false } etc oid */ />
            </Aux>
        );
    }
}

export default BurgerBuilder;