import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <Layout>
      <BurgerBuilder />
    </Layout>
  );
}

export default App;
// Discount Jonas kiest ervoor om App en Layout twee aparte dingen te houden, maar zegt erbij dat je net zo goed Layout als root component kunt gebruiken ipv App.