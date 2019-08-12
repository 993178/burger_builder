import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {     // hoeft geen arrowfunctie te zijn, want alle calls bevinden zich ook hier in dezelfde scope
        const sum = Object.keys(ingredients)    // array met lettuce, meat, etc
            .map(igKey => {
            return ingredients[igKey]       // nieuwe array met 0, 1, 0 of wat de aantallen ook zijn
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);                              // alle aantallen bij elkaar opgeteld

        this.setState({purchasable: sum > 0})   // setState true of false, afhankelijk van of er ingrediënten op die hamburger zitten. 1 is al genoeg. De echte vraag is waarom dit werkt terwijl dit geen arrowfunctie is
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
        this.updatePurchaseState(updatedIngredients);       // we geven meteen de geüpdatete ingrediënten door aan purchasable, anders werkt die nog met de vorige state
    }

    addIngredientHandler = (type) => {
        this.changeIngredientHandler(type, 'add');
    }

    removeIngredientHandler = (type) => {
        this.changeIngredientHandler(type, 'remove');
    }

    purchaseHandler = () => {           // moet een arrowfunctie zijn, want wordt elders gecalld, dus moet this verwijzen naar deze component en niet naar waar this naar verwijst op de plek waar deze functie gecalld wordt.
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        console.log(`you still want this burger!!1! :'-)`);
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
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} /* disabledInfo is hier een object { lettuce: true, meat: false } etc oid */ 
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;