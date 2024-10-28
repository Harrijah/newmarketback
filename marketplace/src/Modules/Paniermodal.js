import React from "react";
import { cartfirstpart } from "../Assets/Functions";


const Paniermodal = () => {
    const paniercontent = cartfirstpart();
    return (
        
    <div className="modal-content">
        <div className="modal-header">
        </div>
        <div className="monmagasin">
            <div className="infoblock">
                <h2>Articles à acheter</h2>
                { paniercontent }
            </div>
        </div>
        <div className="modal-footer">
            <button>Valider le panier</button>
        </div>
    </div>
    );
}

export default Paniermodal;