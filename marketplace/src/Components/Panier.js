import React from "react";
import { cartfirstpart } from "../Assets/Functions";

const Panier = () => {
    const premieraffichage = cartfirstpart();
    return (
        <div className="monmagasin">
            <h1>Mon panier</h1>
            <div className="infoblock">
                <h2>Articles à acheter</h2>
                { premieraffichage }
            </div>

        </div>
    )
}
export default Panier;