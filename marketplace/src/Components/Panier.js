import React from "react";

const Panier = () => {
    return (
        <div className="monmagasin">
            <h1>Mon panier</h1>
            <div className="infoblock">
                <h2>Articles à acheter</h2>
                <ul>
                    <li><b>Produit 01 </b> : <a href="#">Produit 01</a><button className="myfontawesome"> <i className="fa fa-trash-alt"></i></button></li>
                    <li><b>Produit 02 </b> : <a href="#">Produit 02</a><button className="myfontawesome"> <i className="fa fa-trash-alt"></i></button></li>
                    <li><b>Produit 03 </b> : <a href="#">Produit 03</a><button className="myfontawesome"> <i className="fa fa-trash-alt"></i></button></li>
                    <li><b>Produit 04 </b> : <a href="#">Produit 04</a><button className="myfontawesome"> <i className="fa fa-trash-alt"></i></button></li>
                </ul>
            </div>

        </div>
    )
}
export default Panier;