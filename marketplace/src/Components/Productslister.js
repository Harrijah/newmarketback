import React, { useEffect, useState } from "react";
import { isEmpty } from "../Assets/Utils";
import { useDispatch, useSelector } from "react-redux";
import { showMyproduct } from "../action/showproduct.action";
import { searchinfo } from "../Assets/Functions";

const Productslister = ({ rayonlist, filteredcategory, souscatlist02, rayonchoice, rayonselect, categorychoice, categorieselect, souscategorychoice, souscategorieselect }) => {
    const allproductslist = useSelector((state) => state.productReducer.products);
    const marques = useSelector((state) => state.marqueReducer.marque);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const [filteredproductlist, setFilteredproductlist] = useState([]);
    const [producttoshow, setProducttoshow] = useState([]);
    const defaultimage = './image/imageicon.png';
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    useEffect(() => {
        if (typeof(allproductslist) == 'object') {
            const templist = (allproductslist)
                .filter((product) => rayonselect == 0 || product.rayon == rayonselect)
                .filter((product) => categorieselect == 0 || product.categorie == categorieselect)
                .filter((product) => souscategorieselect == 0 || product.souscategorie == souscategorieselect)
                .filter((product) => keyword ? removeAccents(product.nomproduit.toLowerCase()).includes(keyword)
                    // || removeAccents(product.courtdescript.toLowerCase()).includes(keyword)
                    : true)
                
                    .map((product, index) => (    
                        // <span>coucou</span>
                        <div className="productbox" key={product.id || index}>
                            <div className="elementscontainer"> 
                                <div className="imgsection">
                                    <div className="productactions">
                                        <button>Pour plus tard</button>
                                        <button>Voir en détails</button>
                                    </div>
                                    <button onClick={() => dispatch(showMyproduct(product.id))}>
                                    <span className="apercu" >Aperçu</span>
                                    <img src={product.image01 ? 'http://localhost:8080/uploads/' + product.image01 : defaultimage} alt="" />
                                    </button>
                                </div>
                                <div className="txtsection">
                                    <a onClick={() => dispatch(showMyproduct(product.id)) }><h3>{product.nomproduit}</h3></a>
                                    <div className="otherdetails">
                                        <span><b> {!isEmpty(product.marque) && searchinfo(marques, product.marque, 'marque')}</b></span>
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
    }, [allproductslist, rayonselect, categorieselect, souscategorieselect, keyword]);

    return (
        <div className="productslister">
            <div className="barfilter">
                <select name="" id="" onChange={(e) => rayonchoice(e)}>
                    <option key={'0'} value='0'>{'Tous les rayons'}</option>
                    {rayonlist}
                </select>
                <select name="" id="" onChange={(e) => categorychoice(e)}>
                    <option key={'0'} value={'0'}>{'Toutes les catégories'}</option>
                    {filteredcategory}
                </select>
                <select name="" id="" onChange={(e) => souscategorychoice(e)}>
                    <option key={'0'} value={'0'}>{'Toutes les sous-catégories'}</option>
                    {souscatlist02}
                </select>    
                <input type="text" name="" id="" onChange={(e) => setKeyword(e.target.value)} placeholder="Entrer un mot-clé" />
            </div>
            <div className="filteredproducts">
                <div className="productscontainer">
                    {filteredproductlist}
                </div>
            </div>
        </div>
    )
}
export default Productslister;