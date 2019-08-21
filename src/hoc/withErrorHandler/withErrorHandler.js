import React, { Component } from 'react';

import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => { // we wikkelen de export van het doelelement in dit errording, plus een tweede argument, de axios-instance die het doelelement gebruikt, om te weten of er een error is
    return class extends Component {    // naamloze class factory
        constructor(props) {            // constructor met axios interceptors (en ook maar de state dan), omdat de componentDidMount van de children eerder aan de beurt komt dan die hier, dus als er een error voorkomt in zo'n child, dan zou een interceptor in comDidMo nog niet actief zijn en krijgen we geen error-modal. Interceptors zijn geen side effects
            super(props);
            this.state = { error: null };
            this.reqInterceptor = axios.interceptors.request.use(req => {   // in een variabele zodat we hem in comwillunmount weer kunnen wegflikkeren
                this.setState({error: null});       // deze interceptor is om eerst een eventuele bestaande error te wissen
                return req;     // altijd het ding teruggeven als je klaar bent met onderscheppen (anders zien ze het meteen)
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {    // waarmee we axios zowel de response als de error van het httpverzoek laten onderscheppen. De res => res betekent dat je de response kortweg returnt (want dat moet in een interceptor)
                this.setState({error: error});  // hier gooien we de onderschepte error in de state. Het is overigens een object met een messageproperty... Voel je 'm al aankomen?
            });
        }

        componentWillUnmount () {   // we willen withErrorHandler ook om andere componenten kunnen wrappen dan alleen de burgerBuilder, en dan willen we geen ouwe interceptors erin hebben staan. Dus halen we ze hier weg
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        
        // componentWillMount () {     // deze lifecycle hook wordt er straks uitgegooid, Discount Jonas raadt aan gewoon de constructor te gebruiken
        //     axios.interceptors.request.use(req => {
        //         this.setState({error: null});       // deze interceptor is om eerst een eventuele bestaande error te wissen
        //         return req;     // altijd het ding teruggeven als je klaar bent met onderscheppen (anders zien ze het meteen)
        //     })
        //     axios.interceptors.response.use(res => res, error => {    // waarmee we axios zowel de response als de error van het httpverzoek laten onderscheppen. De res => res betekent dat je de response kortweg returnt (want dat moet in een interceptor)
        //         this.setState({error: error});  // hier gooien we de onderschepte error in de state. Het is overigens een object met een messageproperty... Voel je 'm al aankomen?
        //     })
        // }

        errorConfirmedHandler = () => {     // arrowfunctie want we callen hem elders
            this.setState({error: null});
        }

        render (props) {
            return (        // waarin we Modal showen als er een error is ipv null (en ook ter plekke checken of dat zo is! Zo niet: null), en dan van die error de message laten zien. Modal verwacht ook een functie voor als je op de Backdrop klikt genaamd modalClosed
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;    // kleine w want we gebruiken hem niet in de JSX