import React, { useEffect, useRef, useState } from "react";
import Navigation from "../template-parts/Navigation";
import { useSelector } from "react-redux";
import Boban from "../Components/Boban";
import Leftlateralcolumn from "../Components/Leftlateralcolumn";
import Rightmaincontent from "../Components/Rightmaincontent";
import { useParams } from "react-router-dom";
import Productslister from "../Components/Productslister";
import { categorygen, filteredcategorygen, finalsouscatgen, rayongen, souscatgen } from "../Assets/Functions";
import Boutiquecol from "../Components/Boutiquecol";


const Boutique = () => {

    // ----------------------------------------- variables
    const allproductslist = useSelector((state) => state.productReducer.products);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const marques = useSelector((state) => state.marqueReducer.marque);

    // hauteur de colonnes
    const leftColumnRef = useRef(null);
    const rightContentRef = useRef(null);

    // sélectionner un rayon
    const [rayonselect, setRayonselect] = useState(0);
    const rayonlist = rayongen();

    // obtenir une liste de catégories
    const [categorieselect, setCategorieselect] = useState(0);
    const categorielist = categorygen(rayonselect);
    const filteredcategory = filteredcategorygen(rayonselect);

    // obtenir une liste de sous-catégories
    const [souscategorieselect, setSouscategorieselect] = useState(0);
    const souscatlist = souscatgen(rayonselect, rayonlist, categorielist, categorieselect);
    const souscatlist02 = finalsouscatgen(rayonselect, rayonlist, categorielist, categorieselect, souscatlist, filteredcategory);

    // id de la boutique --
    const id = useParams();
    // --------------------




    
    // ----------------------------------------- fonctions    
    // choix rayon
    const rayonchoice = (e) => {
        setRayonselect(e.target.value);
        setCategorieselect(0);
        setSouscategorieselect(0);
    };

    // choix catégorie
    const categorychoice = (e) => {
        setCategorieselect(e.target.value);
    }

    // choix sous-catégorie
    const souscategorychoice = (e) => {
        setSouscategorieselect(e.target.value);
    }


    // ----------------------------------------- logiques
    // calcul hauteur colonnes
    useEffect(() => {
        const leftColumnHeight = rightContentRef.current.getBoundingClientRect().height;
        leftColumnRef.current.style.minHeight = `${leftColumnHeight}px`; 
    }, [rightContentRef]);

    return (
        <div>
            <Navigation allproductslist={allproductslist} magasins={magasins} marques={marques} />
            <Boban />
            <Leftlateralcolumn leftColumnRef={leftColumnRef} button={<Boutiquecol rayonchoice={rayonchoice} rayonlist={rayonlist} categorychoice={categorychoice} filteredcategory={filteredcategory} souscategorychoice={souscategorychoice} souscatlist02={souscatlist02} />}/>
            <Rightmaincontent content={
                <Productslister rayonlist={rayonlist} filteredcategory={filteredcategory} souscatlist02={souscatlist02} rayonchoice={rayonchoice} rayonselect={rayonselect} categorychoice={categorychoice} categorieselect={categorieselect} souscategorychoice={souscategorychoice} souscategorieselect={souscategorieselect} id={id.id} />} rightContentRef={rightContentRef} />
        </div>
    )
}

export default Boutique;