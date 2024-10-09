import React, { useEffect, useState } from "react";
import { isEmpty } from "../Assets/Utils";
import { useDispatch, useSelector } from "react-redux";
import { showMyproduct } from "../action/showproduct.action";
import { searchinfo, showaproduct } from "../Assets/Functions";
import { modalposition } from "../action/position.action";
import { useNavigate } from "react-router-dom";

const Productslister = ({ rayonselect, categorieselect, souscategorieselect, maxprice, keyword, id }) => {
    // ------------------------------- variables
    const mylink = useNavigate();
    const goto = (id) => {
        mylink(id);
    }
    // ------------ ------------------- fonctions
    // ------------------------------- logiques
    const allproductslist = useSelector((state) => state.productReducer.products);
    const marques = useSelector((state) => state.marqueReducer.marque);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const [filteredproductlist, setFilteredproductlist] = useState([]);
    const defaultimage = './image/imageicon.png';
    const dispatch = useDispatch();
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
        
        if (typeof(allproductslist) == 'object') {
            const templist = (allproductslist)
                .filter((product) => id == 0 || product.storeid == id)
                .filter((product) => rayonselect == 0 || product.rayon == rayonselect)
                .filter((product) => categorieselect == 0 || product.categorie == categorieselect)
                .filter((product) => souscategorieselect == 0 || product.souscategorie == souscategorieselect)
                .filter((product) => maxprice == 0 || Number(product.prix) <= Number(maxprice))
                .filter((product) => keyword ? removeAccents(product.nomproduit.toLowerCase()).includes(keyword)
                    // || removeAccents(product.courtdescript.toLowerCase()).includes(keyword)
                    : true)
                
                    .map((product, index) => (    
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
                                        <span><b> {(typeof(marques) == 'object') && searchinfo(marques, product.marque, 'marque')}</b></span>
                                        <span>{!isEmpty(product.storeid) && searchinfo(magasins, product.storeid, 'nommagasin')}</span>
                                    </div>
                                    <div className="prixproduit">
                                        <span>{product.prix} Ar</span>
                                    </div>
                                    <div className="quantityproduit">
                                        <input type="number" name="" id="" className="quantityinput" min={0} defaultValue={'0'} />
                                        <button>Ajouter au panier</button>
                                    </div>
                                </div>
        
                            </div>
                        </div>
                        ) 
                    );             
            setFilteredproductlist(templist);
        }
    }, [allproductslist, rayonselect, categorieselect, souscategorieselect, keyword, maxprice, id]);

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