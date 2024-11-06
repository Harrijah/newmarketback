import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { searchinfo } from "../Assets/Functions";
import { numStr } from "../Assets/Utils";



const Mesachats = () => {
    // -------------------------
    // --------------- variables
    // -------------------------
    const commands = useSelector((state) => state.sessionReducer.commandes);
    const status = useSelector((state) => state.sessionReducer.commandstatus);
    let date = Date().toString();
    const today = date.split(' ');
    const jour =  today[2];
    const mois = today[1];
    const annee = today[3];
    const datedujour = " " + jour + " " + mois + " " + annee + " ";
    const [listedachat, setListedachat] = useState([]);

    // -------------------------
    // --------------- fonctions
    //--------------------------
    const mycommand = () => {
        let templist = [];
        templist = commands && commands.map((product) => (
            <li key={product.id}>
                <div>
                    <span><b>N° {product.id}</b></span> <br/>
                </div>
                <div className="infoblock" style={{margin: '10px'}}>   
                    <div><b>Date </b>: {product.datecommande}</div>
                    <div><b>Statut </b>: {status && searchinfo(status, product.status, 'name')}</div>
                    <div><b>Montant </b>: {numStr(product.totalprix)} Ar </div>
                    <button className="lastbutton" style={{display: 'block', width: '100%'}}>Télécharger la facture</button>
                </div>
            </li>
        ));


        setListedachat(templist);
    }



    // -------------------------
    // --------------- logiques
    //--------------------------
    useEffect(() => {
        mycommand();
     }, [commands]);

    return(
        <div className="monmagasin">
            <h1>Historique d'achats</h1>
            <div className="infoblock">
                <h2>Ma liste de commandes</h2>
                <ul>
                    {listedachat}
                </ul>
            </div>

        </div>
    )
}

export default Mesachats;