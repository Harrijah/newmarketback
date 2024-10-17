import React, { useEffect, useState } from "react";
import Navigation from "../template-parts/Navigation";
import { useSelector } from "react-redux";
import Footer from "../template-parts/Footer";
import { isEmpty } from "../Assets/Utils";
import { useParams } from "react-router-dom";
import { productfirstban, productsecondban, similarproducts } from "../Assets/Functions";


// css : 'style/pages/_productpage.scss
const Productpage = () => {

    // ----------------------- variables
    const allproductslist = useSelector((state) => state.productReducer.products);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const marques = useSelector((state) => state.marqueReducer.marque);
    // const [productdetails, setProductdetails] = useState('');
    let defaultimage = './image/imageicon.png';
    const id = useParams();
    // const myproductdetails = typeof (allproductslist) == 'object' && allproductslist.find((product) => product.id == id.id);

    // ----------------------- fonctions
    // récupérer la bannière Numéro 01
    const firstban = productfirstban(id.id);

    // récupérer la bannière Numéro 02
    const secondban = productsecondban(id.id);

    //récupérer la bannière similar products
    const autresproduits = similarproducts(id.id);

    // afficher détails d'un produit

    // ----------------------- logiques
    useEffect(() => {
        firstban;
    }, [id])

    return (
        <div className="container">
            <Navigation allproductslist={allproductslist} magasins={magasins} marques={marques} />
            <div className="productpage">
                {firstban}
            </div>
            <div className="productthirdban">
                <div className="titlecontainer">
                <h3>Détails</h3>
                </div>
                {/* <div className="filteredproducts"> */}
                {/* <div className="productscontainer02"> */}
                <div className="productdetails">
                    {secondban}
                </div>
                {/* </div> */}
                {/* </div> */}

            </div>
            <div className="productthirdban">
                <div className="titlecontainer">
                    <h3>Dans la même catégorie</h3>
                </div>
                <div className="productdetails">
                    {autresproduits}
                </div>

            </div>

            <Footer />

        </div>
    );
} 

export default Productpage;