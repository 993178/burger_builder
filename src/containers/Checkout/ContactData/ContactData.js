import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';   // is dus de instance, niet direct axios zelf

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();     // Belangrijk! Dit dingetje voorkomt dat het formulier automatisch de pagina laat herladen en je tot waanzin drijft omdat props.ingredients weer leeg is
        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                console.log('ordered burger');
                this.props.history.push('/');   // dus, als het lukt gaan we terug naar de homepage
            } )
            .catch( error => {
                this.setState( { loading: false } );
                console.log('sorry man no dice');
            } );
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your name' />
                <input className={classes.Input} type='email' name='email' placeholder='Your email address' />
                <input className={classes.Input} type='text' name='street' placeholder='Your street' />
                <input className={classes.Input} type='text' name='postal' placeholder='Your postal code' />
                <Button btnType='Success' clicked={this.orderHandler} >ORDER</Button>
            </form>
        );
        if (this.state.loading) {    // we renderen 'form' en bepalen hier of dat het daadwerkelijke formulier is of eerst nog de spinner
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact information</h4>
                {form}
            </div>
        )
    }
};

export default ContactData;