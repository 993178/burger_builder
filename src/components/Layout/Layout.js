import React, { Component } from 'react';
import Aux from '../../hoc/Aux';    // hoofdletter A want custom component
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

// Discount Jonas gooit de hele Layoutmap in hoc en gooit Aux in zijn eigen Auxmap binnen hoc. Ga ik niet doen. 

class Layout extends Component { 
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {       // Discount Jonas wil een echte toggle, om die misschien elders te kunnen gebruiken. Voor menu heeft het niet heel veel zin, omdat de sideDrawer de knop overlapt en je de la dus nooit dicht kunt klikken. (Krijg je nou nooit rare glitches dat je iets wilt dichtklikken maar het opengaat of andersom?)
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}; // niet ervan uitgaan dat je hier per se de meest recente state kunt opvragen.
        });

    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )   // wat we zien aan main en props.children: dat gedeelte gebeurt in App.js, waar Layout de BurgerBuilder inpakt met dus indirect die main
    }
};

export default Layout;