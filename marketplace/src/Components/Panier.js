import React from "react";
import { cartfirstpart } from "../Assets/Functions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Panier = () => {
    const premieraffichage = cartfirstpart();
    const mylink = useNavigate();
    const currentcart = useSelector((state) => state.sessionReducer.panier);
    const goto = (link) => {
        mylink(link);
    }
    return (
        <div className="monmagasin">
            <h1>Mon panier</h1>
            <div className="infoblock">
                <h2>Articles à acheter</h2>
                {premieraffichage}
                {currentcart.length>0 && <button onClick={() => goto('/commandes')}>Valider la commande</button>}
            </div>

        </div>
    )
}
export default Panier;