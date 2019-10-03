import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,  // wordt vervangen door eigenlijke nieuwe gebruikersdata, dit is alleen de initial state hier
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);       // rare url weer uit elkaar plukken om te kijken wat er aan info in zit
        console.log('this props location search: '+ this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {    // .entries trekt een object, of in dit geval een url, uit elkaar tot een array met kleinere arrays for elk key-value pair
            if (param[0] === 'price') {     // dit queryParamsding is nu een lijstje met ingrediënten uit de state, plus dus die totalPrice. Maar die willen we hier niet in een lijstje met ingrediënten hebben, dus vissen we die er eerst uit
                price = param[1];           // weer met zo'n entry (key-value pair), param[0] is 'price', param[1] is uhhm, wat de prijs ook is
            }
            ingredients[param[0]] = +param[1];  // komt erop neer dat de props.location.search string weer als object wordt opgebouwd
        }
        console.log('ingredients: ' + ingredients)
        this.setState({ingredients: ingredients, totalPrice: price});  // vers opgebouwde ingredients gaat onder de noemer ingredients de state in, price heet hier weer totalPrice
        console.log('this state ingredients: '+ this.state.ingredients)
    }

    checkoutCancelledHandler = () => {
        //console.log('order cancelled')
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        //console.log('order continued');
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} /* we hadden eerst simpelweg compenent={ContactData}, maar we willen ook de ingredients als props doorgeven aan ContactData en dat kan niet in die shortcut. Discount Jonas noemt deze manier met render en een functie 'rendering it manually', en het nadeel is dat je geen props.history enzo meekrijgt, wat je kunt fixen met of withRouter of door hier props in de functie mee te geven (als {...props}) */ />
            </div>
        )   // kennelijk is url voor een Link en path voor een Route, aldus de Reactdocumentatie
    }
}

export default Checkout;