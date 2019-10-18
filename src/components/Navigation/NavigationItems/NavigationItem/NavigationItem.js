import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink to={props.link} exact={props.exact} activeClassName={classes.active}>{props.children}</NavLink>
    </li>   // NavLink ipv a, to ipv href, en geen className meer, NavLink weet zelf welke link actief is, máár: de class 'active' wordt dynamisch toegevoegd, en door die #$%$# CSS-modules wordt de bestaande CSS-class dinges.active gehasht en matcht ie niet meer met die dynamisch toegevoegde class, dus moet je hier vertellen hoe de active class heet in de CSS zodat ie gematcht wordt. Dan nog 'exact' want alles begint met / dus zou ie nooit meer inactief worden, maar dat hoeft niet op alle links, dus we geven exact vanuit NavigationItems door als prop! op één link, en laten hem hier uitzoeken of ie die prop heeft of niet > true/false
);

export default navigationItem;