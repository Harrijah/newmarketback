import React, { useEffect, useState } from "react";
import Navigation from "../template-parts/Navigation";
import { useSelector } from "react-redux";
import Boban from "../Components/Boban";
import Leftlateralcolumn from "../Components/Leftlateralcolumn";
import Rightmaincontent from "../Components/Rightmaincontent";
import { useParams } from "react-router-dom";
import Productslister from "../Components/Productslister";
import { categorygen, filteredcategorygen, finalsouscatgen, rayongen, souscatgen } from "../Assets/Functions";


const Boutique = () => {

    // ----------------------------------------- variables
    const allproductslist = useSelector((state) => state.productReducer.products);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const marques = useSelector((state) => state.marqueReducer.marque);

    // sélectionner un rayon
    const [rayonselect, setRayonselect] = useState(0);
    const rayonchoice = (e) => {
        setRayonselect(e.target.value);
        setCategorieselect(0);
        setSouscategorieselect(0);
    };
    const rayonlist = rayongen();

    // obtenir une liste de catégories
    const [categorieselect, setCategorieselect] = useState(0);
    const categorielist = categorygen(rayonselect);
    const filteredcategory = filteredcategorygen(rayonselect);

    const categorychoice = (e) => {
        setCategorieselect(e.target.value);
    }

    

    // obtenir une liste de sous-catégories
    const [souscategorieselect, setSouscategorieselect] = useState(0);
    const souscatlist = souscatgen(rayonselect, rayonlist, categorielist, categorieselect);
    const souscatlist02 = finalsouscatgen(rayonselect, rayonlist, categorielist, categorieselect, souscatlist, filteredcategory);

    const souscategorychoice = (e) => {
        setSouscategorieselect(e.target.value);
    }

    // id de la boutique --
    const id = useParams();
    // --------------------




    
    // ----------------------------------------- fonctions    
  



    return (
        <div>
            <Navigation allproductslist={allproductslist} magasins={magasins} marques={marques} />
            <Boban />
            <Leftlateralcolumn />
            <Rightmaincontent content={
                <Productslister rayonlist={rayonlist} filteredcategory={filteredcategory} souscatlist02={souscatlist02} rayonchoice={rayonchoice} rayonselect={rayonselect} categorychoice={categorychoice} categorieselect={categorieselect} souscategorychoice={souscategorychoice} souscategorieselect={souscategorieselect} id={id.id} />} />
        </div>
    )
}

export default Boutique;