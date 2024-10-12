import React, { useEffect, useRef, useState } from "react";
import Navigation from "../template-parts/Navigation";
import Footer from "../template-parts/Footer";
import Leftlateralcolumn from "../Components/Leftlateralcolumn";
import Rightmaincontent from "../Components/Rightmaincontent";
import Boban from "../Components/Boban";
import { useSelector } from "react-redux";
import Productslister from "../Components/Productslister";
import { categorygen, filteredcategorygen, finalsouscatgen, findmaxprice, magasinselect, marqueselect, rayongen, souscatgen } from "../Assets/Functions";
import Boutiquecol from "../Components/Boutiquecol";
import { Otherfilters } from "../Components/Otherfilters";

const Allproducts = () => {
    // ----------------------------------------- variables
    const allproductslist = useSelector((state) => state.productReducer.products);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const marques = useSelector((state) => state.marqueReducer.marque);
    let content = '';

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
    const souscatlist02 = finalsouscatgen(rayonselect, rayonlist, categorielist, categorieselect, filteredcategory, souscatlist);

    // prix max
    const currentmaxprice = findmaxprice();
    const [maxprice, setMaxprice] = useState(currentmaxprice);

    // liste marques
    const [brandselect, setBrandselect] = useState(0);
    const brands = marqueselect(rayonselect);

    // liste magasins
    const [storeselect, setStoreselect] = useState(0);
    const stores = magasinselect(rayonselect);


    // ----------------------------------------- functions
    // choix rayon
    const rayonchoice = (e) => {
        setRayonselect(e.target.value);
        setCategorieselect(0);
        setSouscategorieselect(0);
        setStoreselect(0);
        setBrandselect(0);
        
    }

    // choix catégorie
    const categorychoice = (e) => {
        setCategorieselect(e.target.value);
    }

    // choix sous-catégorie
    const souscategorychoice = (e) => {
        setSouscategorieselect(0);
    }

    // changer la rangée de prix
    const changeprice = (e) => {
        setMaxprice(e.target.value);
    }

    // choix de la marque
    const brandchoice = (e) => {
        setBrandselect(e.target.value);        
    }

    // choix du magasin
    const magasinchoice = (e) => {
        setStoreselect(e.target.value);
    }


    // ----------------------------------------- logiques
    // calcul hauteur colonnes
    useEffect(() => {
        const leftColumnHeight = rightContentRef.current.getBoundingClientRect().height;
        leftColumnRef.current.style.minHeight = `${leftColumnHeight}px`; 
    }, [rightContentRef]);

    useEffect(() => {
        setMaxprice(currentmaxprice);
    }, [currentmaxprice]);

    useEffect(() => {
        setMaxprice(maxprice);
    }, [maxprice]);

    useEffect(() => {
        console.log(brands);
        console.log(stores);
        
    }, [rayonselect])

    return (
        <div className="container">
            <Navigation allproductslist={allproductslist} magasins={magasins} marques={marques} />
            <Boban />
            <Leftlateralcolumn leftColumnRef={leftColumnRef} button={
                [<Boutiquecol key={0} rayonchoice={rayonchoice} rayonlist={rayonlist} categorychoice={categorychoice} filteredcategory={filteredcategory} souscategorychoice={souscategorychoice} souscatlist02={souscatlist02} maxprice={maxprice} changeprice={changeprice} currentmaxprice={currentmaxprice} />, <Otherfilters key={1} rayonselect={rayonselect} brands={brands} brandchoice={brandchoice} magasinchoice={magasinchoice} listofstore={stores} />]
            } />
            <Rightmaincontent content={
                <Productslister rayonlist={rayonlist} filteredcategory={filteredcategory} souscatlist02={souscatlist02} rayonchoice={rayonchoice} rayonselect={rayonselect} categorychoice={categorychoice} categorieselect={categorieselect} souscategorychoice={souscategorychoice} souscategorieselect={souscategorieselect}  maxprice={maxprice} marque={0} idmagasin={storeselect} brandselect={brandselect} />} rightContentRef={rightContentRef} />
        </div>
    );
}

export default Allproducts;
