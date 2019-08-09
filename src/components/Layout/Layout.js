import React from 'react';
import Aux from '../../hoc/Aux';    // hoofdletter A want custom component

const layout = (props) => (
    <Aux>
        <div>Toolbar, sidedrawer, backdrop</div>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;