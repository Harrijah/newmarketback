import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addproduct } from "../Assets/Functions";
import Ajoutpanier from "./Ajoutpanier";


const Productbox = ({ product, index, goto, showaproduct, searchinfo, marques, magasins, isEmpty }) => {
    
    
    return (
        <div className="productbox" key={product.id || index}>
            <div className="elementscontainer">
                <div className="imgsection">
                    <div className="productactions">
                        <button>Pour plus tard</button>
                        <button onClick={() => goto('/product/' + product.id)} >Voir en détails</button>
                    </div>
                    <button onClick={(e) => showaproduct(e, product.id)}>
                        <span className="apercu" >Aperçu</span>
                        <img src={product.image01 ? 'http://localhost:8080/uploads/' + product.image01 : defaultimage} alt="" />
                    </button>
                </div>
                <div className="txtsection">
                    <a onClick={(e) => showaproduct(e, product.id)}><h3>{product.nomproduit}</h3></a>
                    <div className="otherdetails">
                        <span><b> {(typeof (marques) == 'object') && searchinfo(marques, product.marque, 'marque')}</b></span>
                        <span>{!isEmpty(product.storeid) && searchinfo(magasins, product.storeid, 'nommagasin')}</span>
                    </div>
                    <div className="prixproduit">
                        <span>{product.prix} Ar</span>
                    </div>
                    <Ajoutpanier product={product} />
                </div>

            </div>
        </div>
    );
}

export default Productbox;