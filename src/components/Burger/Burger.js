import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {    // props is het ingredientsobject. We gebruiken de Object-methode .keys om van de keys van het object een array te maken. Op die array gebruiken we .map.
        return [...Array(props.ingredients[igKey])].map((_, i) => {     // voor iedere ingredient-key igKey returnen we een array met Array(), met als argument iets wat uiteindelijk een getal is, zoals daar zijn de values van iedere key in props.ingredients, dus [,] voor lettuce. Op die nieuwe array zetten we een nieuwe .map, eerste parameter is het element (hier niet belangrijk), tweede is index. Ik ben het met anderen eens dat normale mensen hier een let ingredients array van maken met een for loop
            return <BurgerIngredient key={igKey + i} type={igKey} />    // voor ieder element in iedere per ingredienttype aangemaakte array met het juiste aantal leegtes maken we nu een BurgerIngredient component aan met key [ingredient][indexbinneningredient] en type [ingredient]
        })
    }).reduce((arr, el) => {        // AAAAAAAAAARGH
        return arr.concat(el)       // dat gezegd hebbende, arr is het vorige element, dat begint met het optionele initial argument dat je ná de callback functie invoegt: die lege array []. Dus daar beginnen we mee, we pakken het eerste element el, en concatten het aan die lege array. Volgende huidige element plakken we daar weer aan vast, etc.
    }, [])

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>None pizza with left beef is NOT an option!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;