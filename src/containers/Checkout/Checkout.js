import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            lettuce: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);       // rare url weer uit elkaar plukken om te kijken wat er aan info in zit
        const ingredients = {};
        for (let param of query.entries()) {    // .entries trekt een object, of in dit geval een url, uit elkaar tot een array met kleinere arrays for elk key-value pair
            ingredients[param[0]] = +param[1];  // komt erop neer dat de props.location.search string weer als object wordt opgebouwd
        }
        this.setState({ingredients: ingredients});  // vers opgebouwde ingredients gaat onder de noemer ingredients de state in
    }

    checkoutCancelledHandler = () => {
        console.log('order cancelled')
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        console.log('order continued');
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        console.log(this.props.history);
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
            </div>
        )
    }
}

export default Checkout;