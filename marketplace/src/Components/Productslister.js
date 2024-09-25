import React, { useEffect, useState } from "react";
import { isEmpty } from "../Assets/Utils";
import { useDispatch } from "react-redux";
import { showMyproduct } from "../action/showproduct.action";

const Productslister = ({ allproductslist, rayonlist, filteredcategory, souscatlist02, rayonchoice, categorychoice }) => {
    const [filteredproductlist, setFilteredproductlist] = useState([]);
    const defaultimage = './image/imageicon.png';
    const dispatch = useDispatch();

    useEffect(() => {
        if (allproductslist) {
            const templist = !isEmpty(allproductslist) && Array.from(allproductslist)
                // .filter((id) => allproductslist.id != 0)
                .map((product) => (     
                <div className="productbox" key={product.id}>
                    <div className="elementscontainer">
                        <div className="imgsection">
                            <button onClick={() => dispatch(showMyproduct(product.id)) }><img src={'http://localhost:8080/uploads/'+product.image01} alt="" /></button>
                        </div>
                        <div className="txtsection">
                            <h3>Nom du produit</h3>
                            <div className="otherdetails">
                                <span><b>Marque</b> : {product.marque}</span>
                                <span>Vendeur : {product.storeid}</span>
                            </div>
                            <div className="prixproduit">
                                {/* <span>100 000 Ar</span> */}
                                <span>{product.prix} Ar</span>
                            </div>
                            <div className="quantityproduit">
                                <input type="number" name="" id="" className="quantityinput" min={0} defaultValue={'0'} />
                                <button>Ajouter au panier</button>
                            </div>
                            <div className="productactions">
                                <button>Pour plus tard</button>
                                <button>Voir en détails</button>
                            </div>
                        </div>

                    </div>
                </div>
                ) 
            )
            setFilteredproductlist(templist);
        }
    }, [allproductslist]);


    return (
        <div className="productslister">
            <div className="barfilter">
                <select name="" id="" onChange={(e) => rayonchoice(e)}>
                    <option key={'0'} value={'0'}>{'Tous les rayons'}</option>
                    {rayonlist}
                </select>
                <select name="" id="" onChange={(e) => categorychoice(e)}>
                    <option key={'0'} value={'0'}>{'Toutes les catégories'}</option>
                    {filteredcategory}
                </select>
                <select name="" id="">
                    <option key={'0'} value={'0'}>{'Toutes les sous-catégories'}</option>
                    {souscatlist02}
                </select>         
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