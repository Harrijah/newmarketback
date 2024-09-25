import React from "react";


const Mesachats = () => {
    let date = Date().toString();
    const today = date.split(' ');
    const jour =  today[2];
    const mois = today[1];
    const annee = today[3];
    const datedujour = " " + jour + " " + mois + " " + annee + " ";
    return(
        <div className="monmagasin">
            <h1>Historique d'achats</h1>
            <div className="infoblock">
                <h2>Produits achetés</h2>
                <ul>
                    <li><b>Produit 01 </b> : <a href="#">Produit 01</a><span> <b>Date </b> : { datedujour }</span><button className="myfontawesome"> <i className="fa fa-trash-alt"></i></button></li>
                    <li><b>Produit 02 </b> : <a href="#">Produit 02</a><span> <b>Date </b> : { datedujour }</span><button className="myfontawesome"> <i className="fa fa-trash-alt"></i></button></li>
                    <li><b>Produit 03 </b> : <a href="#">Produit 03</a><span> <b>Date </b> : { datedujour }</span><button className="myfontawesome"> <i className="fa fa-trash-alt"></i></button></li>
                    <li><b>Produit 04 </b> : <a href="#">Produit 04</a><span> <b>Date </b> : { datedujour }</span><button className="myfontawesome"> <i className="fa fa-trash-alt"></i></button></li>
                </ul>
            </div>

        </div>
    )
}

export default Mesachats;