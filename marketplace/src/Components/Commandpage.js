import React, { useEffect, useRef, useState } from "react";
import { searchinfo } from "../Assets/Functions";
import { numStr } from "../Assets/Utils";
import Paypal from "../Modules/Paypal";
import { useDispatch, useSelector } from "react-redux";
import { modalposition } from "../action/position.action";
import { addCommand } from "../action/session.action";

const Commandpage = ({ allproductslist, marques, magasins, currentcart, ttlgeneral, setTtlgeneral, aboutUser }) => {
    
    // -------------------
    // --------- variables
    // -------------------
    const modaly = useSelector((state) => state.positionReducer.position);
    const [listofproducts, setListofproducts] = useState([]);
    const [content, setContent] = useState('');
    const [commanddate, setCommanddate] = useState('');
    const [nextnumber, setNextnumber] = useState(107);
    const [commandref, setCommandref] = useState(nextnumber);

    // pour l'acheteur
    const [buyerinfos, setBuyerinfos] = useState({});
    const [buyermodal, setBuyermodal] = useState(false);
    const buyerref = useRef();

    // validation panier
    const [paymodal, setPaymodal] = useState(false);
    const mypayref = useRef();

    const dispatch = useDispatch();
    let provttl = 0;
    
    
    // -------------------
    // --------- fonctions
    // -------------------

    // calculer la date de la commande
    const dateref = () => {
        let mydate = new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
        return setCommanddate(mydate);
        // console.log(commanddate);
    }
    // simple liste de produits
    const productslist = () => {
        let templist = [];
        for (let i = 0; i < currentcart.length; i++){
            templist.push(
                {
                    id: currentcart[i].productid,
                    quantity: Number(currentcart[i].number),
                }
           );
        }
        setListofproducts(templist);
    }

    // liste des produits dans la commande
    const displaytable = () => {
        setContent(currentcart && currentcart.map((product, index) => {
            let num = index + 1;
            let nom = searchinfo(allproductslist, product.productid, 'nomproduit');
            let quant = Number(product.number);
            let pu = Number(searchinfo(allproductslist, product.productid, 'prix'));
            let pt = quant * pu;
            provttl += pt;
             return(
                <tr key={Number(product.id) + index}>
                    <td>0{num}</td>
                    <td>{nom}</td>
                    <td>{product.number}</td>
                    <td>{numStr(pu)}Ar</td>
                    <td>{numStr(pt)}Ar</td>
                </tr>
             )
        }));
        setTtlgeneral(provttl);
    }

    // afficher le modal pour le changement des infos utilisateurs
    const showbuyermodal = (e) => {
        dispatch(modalposition(e.pageY - e.clientY));
        setBuyermodal(true);
    }

    // cacher le modal du buyer info
    const managebuyermodal = (e) => {
        if (e.target.className == 'modal') {
            setBuyermodal(false);
        }
    }   

    // infos par défaut sur l'acheteur
    const setbuyerdata = () => {
        const data = {
            nom: aboutUser.nom,
            prenom: aboutUser.prenom,
            adresse: aboutUser.adresse,
            ville: aboutUser.ville + ' ' + aboutUser.codepostal + ' ' + aboutUser.pays,
            telephone: aboutUser.telephone,
            mail: aboutUser.email
        }
        setBuyerinfos(data);
    }
    // changer temporairement les infos de l'acheteur
    const savebuyerinfo = (e) => {
        e.preventDefault();
        const data = {
            nom: buyerref.current[0].value,
            prenom: buyerref.current[1].value,
            telephone: buyerref.current[2].value,
            mail: buyerref.current[3].value,
            adresse: buyerref.current[4].value,
            ville: buyerref.current[6].value + ' ' + buyerref.current[5].value + ' ' + buyerref.current[7].value,
        }
        setBuyerinfos(data);
        setBuyermodal(false);
    }

    // cacher le modal pay
    const hidepay = (e) => {
        e.target.className == 'modal' && setPaymodal(false);
    }

    // afficher le modalpay
    const showpay = (e) => {
        document.body.style.overflow = 'hidden';
        dispatch(modalposition(e.pageY - e.clientY));
        setPaymodal(true);
    }

    // valider le paiement via mobile money
    const validatepay = (e) => {
        const data = {
            id: commandref,
            payref: mypayref.current[0].value,
            clientid: aboutUser.id || buyerinfos.telephone,
            products: JSON.stringify(currentcart) ,
            datecommande: commanddate,
            status: 1,
            datelivraison: '',
            lieulivraison: buyerinfos.adresse + ' ' + buyerinfos.ville,
            aboutcustomer: JSON.stringify(buyerinfos),
            totalprix: ttlgeneral,
        }
        e.preventDefault();
        dispatch(addCommand(data));
        console.log(data);
        
        setPaymodal(false);    
    }


    // -------------------
    // ---------- logiques
    // -------------------

    // affichage de départ
    useEffect(() => {
        displaytable();
        productslist();
        setbuyerdata();
        dateref();
    }, [currentcart]);

    // gestion modal info-utilisateur
    useEffect((e) => { 
        if (buyermodal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [buyermodal]);

    // gestion modal pay
    useEffect(() => {
        if (paymodal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [paymodal]);

    // MAJ numéro de commande
    useEffect(() => {
        setCommandref(buyerinfos.telephone + 'X' + nextnumber);
    }, [buyerinfos])
    

    return (
        <div className="commandtemplate">
            {/* Modal pour changer les infos de livraison */}
            <div className="modal" id="buyermodal" style={{top: modaly && modaly+'px', display: buyermodal && 'flex', zIndex:101}} onClick={(e) => managebuyermodal(e)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Renseignez vos informations pour cette livraison</h3>
                    </div>
                    <div className="modal-body">
                        <form ref={buyerref} onSubmit={(e) => savebuyerinfo(e)}>
                            <input type="text" name="" id="" placeholder="Votre nom" />
                            <input type="text" name="" id="" placeholder="Votre prénom" />
                            <input type="text" name="" id="" placeholder="Votre téléphone" />
                            <input type="email" name="" id="" placeholder="Votre email" />
                            <input type="text" name="" id="" placeholder="Votre adresse" />
                            <input type="number" name="" id="" placeholder="Code Postal, Ex : 105" />
                            <input type="text" name="" id="" placeholder="Ville, Ex : Antananarivo" />
                            <input type="text" name="" id="" placeholder="Pays" defaultValue={'Madagascar'} />
                            <input type="submit" value="Valider" />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button onClick={(e) => setBuyermodal(false)}>Annuler</button>
                    </div>
                </div>
            </div>
            <div className="modal" id="mobilepaymodal" style={{top: modaly && modaly+'px', display: paymodal && 'flex', zIndex: 101}} onClick={(e) => hidepay(e)} >
                <div className="modal-content" style={{textAlign: 'left'}}>
                    <div className="modal-header"><h3>Payer avec Mobile Money</h3></div>
                    <div className="modal-body">
                        <p>Veuiller envoyer <b>{numStr(ttlgeneral)} Ar</b> : </p>
                            <ul>
                                <li>via mVola au 034 04 254 41 </li>
                                <li>ou via Orange Money au 032 04 254 41 </li>
                                <li>ou via Airtel Money au 032 04 254 41 </li>
                            </ul>
                        <p>avec comme motif : " <b>{commandref}</b></p>
                        <p>Ensuite, entrez ici la référence de votre paiement reçu par SMS, puis cliquez sur "Envoyer" </p>

                        <form ref={mypayref} onSubmit={(e) => validatepay(e)}>
                            <input type="text"/>
                            <input type="submit" value="Envoyer" />
                        </form>

                    </div>
                </div>
            </div>
            {/* Tableau résumant les articles à commander */}
            <div className="commandcontent">
                <h2>Résumé de votre commande</h2>
                <div className="tablcontent">
                    <table>
                        <thead>
                            <tr>
                                <th>Numéro</th>
                                <th>Désignation</th>
                                <th>Quantité</th>
                                <th>Prix unitaire</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{ numStr(ttlgeneral) }Ar</td>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Tableau résumant les infos de l'acheteur */}
            <div className="commandcontent">
                <h2>Vos informations de livraison</h2>
                <div className="infoblock">
                    {/* <p>Civilité :</p> */}
                    {aboutUser ? <p><span style={{textDecoration: 'underline'}}>Nom</span> : <span>{buyerinfos.nom}</span> </p> : ''}
                    {aboutUser ? <p><span style={{textDecoration: 'underline'}}>Prénom</span> :{buyerinfos.prenom} </p> : ''}
                    {aboutUser ? <p><span style={{textDecoration: 'underline'}}>Adresse</span> : {buyerinfos.adresse} </p> : ''}
                    {aboutUser ? <p><span style={{textDecoration: 'underline'}}>Ville</span> : {buyerinfos.ville}</p> : ''}
                    {aboutUser ? <p><span style={{textDecoration: 'underline'}}>Téléphone</span> : {buyerinfos.telephone} </p> : ''}
                    {aboutUser ? <p><span style={{textDecoration: 'underline'}}>Mail</span> : {buyerinfos.mail} </p> : ''}
                    {aboutUser ?
                        <button className="lastbutton" onClick={(e) => showbuyermodal(e)}>Changer temporairement</button> :
                        <button>Compléter mes informations</button>
                    }
                </div>
            </div>
            {/* Options de paiement*/}
            <div className="paypartone">
                <h2>Procéder au paiement</h2>
                <div className="paybutt">
                    <button className="mobmon" onClick={(e) => showpay(e)}>Payer avec Mobile Money</button>
                    <Paypal className='paypal' listofproducts={listofproducts} buyerinfos={buyerinfos} />
                </div>
            </div>
        </div>
    )
}

export default Commandpage;