import React, { useEffect } from "react";
import Navigation from "../template-parts/Navigation";
import { useSelector } from "react-redux";
import Footer from "../template-parts/Footer";
import { isEmpty } from "../Assets/Utils";
import { useParams } from "react-router-dom";


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
    



    // ----------------------- logiques
    useEffect(() => {
        console.log(myproductdetails);
    }, [allproductslist]);

    return (
        <div className="container">
            <Navigation allproductslist={allproductslist} magasins={magasins} marques={marques} />
            <div><h1>{ myproductdetails.nomproduit }</h1></div>

            <Footer />

        </div>
    );
} 

export default Productpage;