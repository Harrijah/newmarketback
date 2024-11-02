import React, { useEffect, useState } from "react";
import { searchinfo } from "../Assets/Functions";
import { numStr } from "../Assets/Utils";
import Paypal from "../Modules/Paypal";

const Commandpage = ({ allproductslist, marques, magasins, currentcart, ttlgeneral, setTtlgeneral }) => {
    
    // -------------------
    // --------- variables
    // -------------------
    const [content, setContent] = useState('');
    const [listofproducts, setListofproducts] = useState([]);
    let provttl = 0;
    
    
    // -------------------
    // --------- fonctions
    // -------------------
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
    const displaytable = () => {
        setContent(currentcart && currentcart.map((product, index) => {
            let num = index + 1;
            let nom = searchinfo(allproductslist, product.productid, 'nomproduit');
            let quant = Number(product.number);
            let pu = Number(searchinfo(allproductslist, product.productid, 'prix'));
            let pt = quant * pu;
            provttl += pt;
             return(
                <tr key={product.id}>
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

    // -------------------
    // ---------- logiques
    // -------------------
    useEffect(() => {
        displaytable();
        productslist();        
    }, [currentcart])
    

    return (
        <div className="commandteplate">
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
            <div className="paypartone">
                <h2>Procéder au paiement</h2>
                <div className="paybutt">
                    <button className="mobmon">Payer via mVola :  {numStr(ttlgeneral)} Ar</button>
                    <Paypal className='paypal' listofproducts={listofproducts} />
                </div>
            </div>
        </div>
    )
}

export default Commandpage;