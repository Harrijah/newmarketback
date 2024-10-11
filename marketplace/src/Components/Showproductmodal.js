import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Assets/Utils";
import { showMyproduct } from "../action/showproduct.action";
import { useNavigate } from "react-router-dom";
import { productfirstban } from "../Assets/Functions";

const Showproductmodal = () => {
    // ----------------------- Variables ---------------------------------
    const dispatch = useDispatch();
    const allproductslist = useSelector((state) => state.productReducer.products);
    const productid = useSelector((state) => state.productReducer.myproduct && state.productReducer.myproduct.id || 0);
    const mylink = useNavigate();

    // ----------------------- Fonctions ---------------------------------
    // récupérer le contenu de la première bannière de produit
    const firstban = productfirstban(productid);

    // créer un lien
    const goto = (id) => {
        mylink(id);
    }

    // aller à un produit
    const openproduct = (id) => {
        dispatch(showMyproduct(0));
        goto('/product/' + id);
    }
    // ----------------------- Logique ---------------------------------
    useEffect(() => {
        firstban;
    }, [productid]);
    
  return (
    <div className="modal-content">
        <div className="modal-header">
            <span className="closemodal" onClick={() => dispatch(showMyproduct(0))}></span>
        </div>
        <div className="modal-body">
            {firstban}
        </div>
      <div className="modal-footer">
        <button>Ajouter au panier</button>
        <button>Acheter plus tard</button>
        <button onClick={() => openproduct(productid)}>Voir les détails</button>
      </div>
    </div>
  );
};

export default Showproductmodal;
