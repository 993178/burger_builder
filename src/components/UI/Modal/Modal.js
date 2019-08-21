import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {       // de OrderSummary zou niet steeds gerenderd moeten worden als de gebruiker iets aan de hamburger verandert; re-renderen moet alleen gebeuren op het moment dat de Modal (en dus de orderSummary) zichtbaar wordt.
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children       // Mooie korte formulering: puur het resultaat van die check returnen, zonder if.   Nu wordt ie dus ook gerenderd als gebruiker de modal wegklikt...
    }           // merk op dat we dus hier in Modal bepalen of OrderSummary een update krijgt
                // we willen ook geen PureComponent gebruiken, want die checkt dan weer voor alles, ook modalClosed, terwijl we alleen in show geïnteresseerd zijn < althans eerst, nu zijn we ook in children geïnteresseerd om te kunnen zien of ipv OrderSummary misschien de Spinner gerenderd moet worden, en daarna weer OrderSummary
    // componentWillUpdate() {
    //     console.log('modal updaten');
    // }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div 
                    className={classes.Modal} 
                    style={{ 
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }} >
                    {this.props.children}
                </div>
            </Aux>    
        )
    }
};

export default Modal;