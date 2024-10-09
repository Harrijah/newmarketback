import React, { useEffect } from "react";
import Navigation from "../template-parts/Navigation";
import { useSelector } from "react-redux";
import Footer from "../template-parts/Footer";
import { isEmpty } from "../Assets/Utils";
import { useParams } from "react-router-dom";
import { productfirstban } from "../Assets/Functions";


// css : 'style/pages/_productpage.scss
const Productpage = () => {

    // ----------------------- variables
    const allproductslist = useSelector((state) => state.productReducer.products);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const marques = useSelector((state) => state.marqueReducer.marque);
    let defaultimage = './image/imageicon.png';
    const id = useParams();
    const myproductdetails = typeof (allproductslist) == 'object' && allproductslist.find((product) => product.id == id.id);





    // ----------------------- fonctions
    // récupérer la bannière Numéro 01
    const firstban = productfirstban(id.id);



    // ----------------------- logiques
    useEffect(() => {
        console.log(myproductdetails);
    }, [allproductslist]);
    useEffect(() => {
        firstban;
    }, [myproductdetails])

    return (
        <div className="container">
            <Navigation allproductslist={allproductslist} magasins={magasins} marques={marques} />
            <div className="container">
                {firstban}
            </div>

            <Footer />

        </div>
    );
} 

export default Productpage;