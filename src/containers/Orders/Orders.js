import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {    // dit is dus niet meer wat de klant ziet? Of wel?
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {   // hier komen we niet zonder dat ie wordt geremount, dus geen compDidUpdate hier
        axios.get('/orders.json')   // dit is dus weer de firebaseversie
            .then(res => {
                console.log(res.data);      // dit is een object met een zootje orders erin gesorteerd bij de IDs, maar we willen dus een array met die objecten
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({    // we willen niet alleen de inhoud van ieder object, we willen ook de ID (naam object) behouden, dus die voegen we nu toe als extra key-value paar
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders}); // we gooien de nieuwe array met orders in de state en houden op met loaden
            })
            .catch(err => {

                this.setState({loading: false});
            })
            

    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => (       // loopen door de orders, hoeveel het er ook zijn
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}     // is dus allemaal Firebase spul
                    price={order.price}     // je kunt hier een + voor zetten om Javascript te dwingen het door te geven als nummer ipv als string; dat is dan ipv het Number.parseFloat(props.price) in Order.js
                     />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);