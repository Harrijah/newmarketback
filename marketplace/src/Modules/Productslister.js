import React, { useEffect, useState } from "react";
import { isEmpty } from "../Assets/Utils";
import { useDispatch, useSelector } from "react-redux";
import { showMyproduct } from "../action/showproduct.action";
import { searchinfo, setalist } from "../Assets/Functions";
import { modalposition } from "../action/position.action";
import { useNavigate } from "react-router-dom";
import { addnumbtoprod, addtocart } from "../action/session.action";
import Productbox from "../Components/Productbox";

const Productslister = ({ rayonselect, categorieselect, souscategorieselect, brandselect, maxprice, keyword, idmagasin}) => {
    // ------------------------------- variables
    const [filteredproductlist, setFilteredproductlist] = useState([]);
    const allproductslist = useSelector((state) => state.productReducer.products);
    const marques = useSelector((state) => state.marqueReducer.marque);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const defaultimage = './image/imageicon.png';
    const dispatch = useDispatch();
    const mylink = useNavigate();
    
    // ------------ ------------------- fonctions
    const goto = (id) => {
        mylink(id);
    }

    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    // communiquer la position-Y pour le modal
    const showaproduct = (e, id) => {
        document.body.style.overflow = 'hidden';
        dispatch(showMyproduct(id));
        dispatch(modalposition(e.pageY - e.clientY));  
    }

    useEffect(() => {
        if (allproductslist && typeof(allproductslist) == 'object') {
            const templist = (allproductslist)
                .filter((product) => idmagasin == 0 || product.storeid == idmagasin)
                .filter((product) => rayonselect == 0 || product.rayon == rayonselect)
                .filter((product) => categorieselect == 0 || product.categorie == categorieselect)
                .filter((product) => souscategorieselect == 0 || product.souscategorie == souscategorieselect)
                .filter((product) => maxprice == 0 || Number(product.prix) <= Number(maxprice))
                .filter((product) => brandselect == 0 || Number(product.marque) == Number(brandselect))
                .filter((product) => keyword ? removeAccents(product.nomproduit.toLowerCase()).includes(keyword)
                    // || removeAccents(product.courtdescript.toLowerCase()).includes(keyword)
                    : true)
                .map((product, index) => ( 
                    <Productbox key={product.id} product={product} index={index} goto={goto} showaproduct={showaproduct} searchinfo={searchinfo} marques={marques} magasins={magasins} isEmpty={isEmpty}/>
                        ) 
                    );             
            setFilteredproductlist(templist);
        }
    }, [allproductslist, rayonselect, categorieselect, souscategorieselect, keyword, maxprice, brandselect, idmagasin]);

    return (
        <div className="productslister">
            <div className="filteredproducts">
                <div className="productscontainer">
                    {filteredproductlist}
                </div>
            </div>
        </div>
    )
}
export default Productslister;