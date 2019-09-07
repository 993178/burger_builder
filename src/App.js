import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
// Discount Jonas kiest ervoor om App en Layout twee aparte dingen te houden, maar zegt erbij dat je net zo goed Layout als root component kunt gebruiken ipv App.

/* alles tussen BrowserRouter tags hoort bij het routable deel van de app, maar alleen de componenten die direct via een Route geladen worden krijgen bij hun props ook history, match etc mee. */
/**hier kan ook nog exact op zodat alleen dit specifieke path naar de burgerbuilder leidt */