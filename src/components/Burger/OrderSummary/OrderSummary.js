import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // dit is nu alleen maar een class om componentWillUpdate te kunnen laten zien, het was gewoon een functional component
    // componentWillUpdate() {
    //     console.log('orderSummary update');     // puur om te laten zien dat OrderSummary zonder shouldComponentUpdate in Modal wordt geüpdatet iedere keer als de gebruiker iets aan zijn hamburger verandert. Maar deze component is alleen belangrijk voor de Modal, en die is tijdens het burgerbuilden onzichtbaar, dus waarom dan steeds rerenderen? Precies.
    // }
    // we doen de shouldComponentUpdate niet hier omdat dit altijd geüpdatet moet zijn als Modal zichtbaar is, dus dáár doen we de check

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (<li key={igKey} >
                    <span style={{ textTransform: 'capitalize' }} >{igKey}</span>
                    : {this.props.ingredients[igKey]}
                </li> );
        });
    
        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious (you hope) burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Your total price is: €{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.purchaseCancelled} btnType="Danger">Cancel</Button>
                <Button clicked={this.props.purchaseContinued} btnType="Success">Continue</Button>
            </Aux>
        )
    }
};

export default OrderSummary;