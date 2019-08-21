import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';     // is dus de instance, niet direct axios zelf
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        // ingredients: null,       // met backend database beginnen we met null. Dat betekent wel dat verschillende componenten niet meteen geladen kunnen worden, want die gaan ervan uit dat er iets zinnigs in this.state.ingredients staat
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        error: false,    // voor als ingredients uit database ophalen niet lukt en we een zinvolle .catch nodig hebben omdat anders eeuwig geladen wordt
        loading: false
    }
/*
    componentDidMount () {       // Discount Jonas zet de ingredients direct in de FireBase database en importeert ze dan hier, als response.data (=object)
        axios.get('/ingredients.json')
          .then(response => {
              this.setState({ingredients: response.data})
          }).catch(error => {
              this.setState({error: true})
          })
    }
*/
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
        this.setState({loading: true});         // zodat we eerst de spinner te zien krijgen zodra er op Continue geklikt wordt
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,        // in een echte app doe je dit aan de serverkant, zodat de gebruiker er niet bij kan om zichzelf korting te geven
            customer: {
                name: 'Discount Jonas',         // dummy data, gehardcoded, tja, ach, gelukkig zit er geloof ik al een betere versie in de DIY-shop
                address: {
                    street: 'Teststreet 1',
                    zipCode: '54212',
                    country: 'Germany'
                },
                email: 'DiscountJonas@test.com'
            },
            deliveryMethod: 'fastest'   // Discount Jonas gaat ervan uit dat er ook een goedkope optie is... 
        }

        axios.post('/posts', order)   // in firebase moet dit '/orders.json' zijn
            .then(res => {
                this.setState({loading: false, purchasing: false});
                console.log(res);
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
                console.log(error);
            })
    }

    render () {
        const disabledInfo = {      // we willen knoppen disablen die niets moeten kunnen doen
            ...this.state.ingredients   // in den beginne is dit nog { lettuce: 0, meat: 1} etc
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0  // bij elk ingredient checken we of de hoeveelheid kleiner of gelijk is aan 0, zo ja, dan slaan we true op onder die key in disabledInfo: { lettuce: true, meat: false } etc
        }

        let orderSummary = null         // als er in eerste instantie geen ingredienten zijn, kan OrderSummary ook niet laden

        let burger = (this.state.error) ? <p>Ingredients can't be loaded!</p> : <Spinner />          // nodig bij database en initial state.ingredients: null. Als de ingredienten helemaal niet doorkomen uit de database, moet dat gemeld worden ipv een spinner
            
        if (this.state.ingredients) {   // (heb ik dus altijd, want ik heb state.ingredients niet op null...)
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} /* disabledInfo is hier een object { lettuce: true, meat: false } etc oid */ 
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler} />
            </Aux>);
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice} />;
        }

        if (this.state.loading) {       // deze if moet onder de vorige, wat deze moet die andere overriden
            orderSummary = <Spinner />;
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);