import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Assets/Utils";
import { showMyproduct } from "../action/showproduct.action";

// css : './components/_slideshow.scss'
const Slideshow = ({listederayons, allproductslist, magasins, enavant}) => {
    // -------------------- Variables
    const dispatch = useDispatch();
    const [filteredlist, setFilteredlist] = useState([]);
    const [displaylist, setDisplaylist] = useState([]);
    const [sliderindex, setSliderindex] = useState(0);
    const [slidercontent, setSlidercontent] = useState([]);
    const [selectedrayon, setSelectedRayon] = useState(0);


    // -------------------- Fonctions
    // changer value de rayon
    const setRayon = (value) => {
        setSelectedRayon(value);
    }
    // créer une liste filtrée
    function filtermylist(selector){
        const templist = !isEmpty(allproductslist) && Array.from(allproductslist)
            .filter((product) => (product[selector] == 1))
            .filter((product) => (selectedrayon == 0) || product.rayon == selectedrayon)
            ;
        setFilteredlist(templist);
        // console.log(filteredlist);
        
    }
    // Ouvrir le modal aperçu de produit
    const openmodal = (id) => {
        dispatch(showMyproduct(id));
    }
    // chercher une info sur le magasin
    const infomagasin = (id, request) => {
        const findone = !isEmpty(magasins) && Array.from(magasins).find((magasin) => magasin.id == id);         
        if (findone && request in findone) {
            return findone[request];
       } else {
           return 'aucun magasin trouvé';
       }
    }

    // générer liste de produits séléctionnés
    const listofproduct = async () => {
        const templist = !isEmpty(filteredlist) && Array.from(filteredlist).map((product, index) => (
            <div key={index} className="simpleproductbox">
                <div className="productthumbnail">
                    <img src={!isEmpty(allproductslist) ? 'http://localhost:8080/uploads/'+ product.image01 : ''} alt="Aucune image trouvée" />
                </div>
                <div className="productinfos">
                    <div className="productname"><b><button onClick={() => openmodal(product.id)}>{product.nomproduit}</button></b></div>
                    <div className="prixproduit">{infomagasin(product.storeid, 'nommagasin') }</div>
                    <div className="prixproduit">{product.prix} Ar</div>
                </div>
            </div>
        ))
        setDisplaylist(templist);
    }

    // Images et contenus du slider principal
    const myslider = () => {
        if (filteredlist == []) {
        const templist = !isEmpty(filteredlist) && Array.from(filteredlist)
            .map((product, index) => (
            <div key={product.id} className={(index != sliderindex) ? 'slidebox' : 'showme'}>
                <img src={!isEmpty(allproductslist) ? 'http://localhost:8080/uploads/' + product.image01 : ''} alt="" />
            </div>
        ));
            setSlidercontent(templist);
        } else {
        const templist = !isEmpty(filteredlist) && Array.from(filteredlist)
            .map((product, index) => (
            <div key={product.id} className={(index != sliderindex) ? 'slidebox' : 'showme'}>
                <img src={!isEmpty(allproductslist) ? 'http://localhost:8080/uploads/' + product.image01 : ''} alt="" />
            </div>
        ));
            setSlidercontent(templist);
        }
    }

    // Décrémenter slider
    const removeindex = () => {
        setSliderindex((((sliderindex - 1) + filteredlist.length ) % filteredlist.length));
    }
    //Incrémenter slider
    const addindex = () => {
        setSliderindex((sliderindex + 1 ) % filteredlist.length);
    }



    
    // -------------------- Logiques
    // Générer la liste de produits
    useEffect(() => {
        // Filtrer la liste selon le critère "enavant"
        filtermylist(enavant);
    }, [allproductslist, enavant, selectedrayon]);
    
    useEffect(() => {
        // Générer la liste de produits une fois que filteredlist est défini
        if (!isEmpty(filteredlist)) {
            listofproduct();
            myslider();
        }
    }, [filteredlist, selectedrayon]);
    
    useEffect(() => {
        // Mettre à jour le slider lorsque l'index change
        myslider();
    }, [sliderindex, selectedrayon]);
    


    return (
        <div className="slideshowcontainer">
            <div className="imgpart">
                <div className="leftchevron"><button onClick={() => removeindex()}><i className="fa fa-chevron-left"></i></button></div>
                <div className="mainimage">
                    {slidercontent}
                </div>
                <div className="rightchevron"><button onClick={() => addindex()}><i className="fa fa-chevron-right"></i></button></div>
            </div>
            <div className="productpart">
                    <div className="listcontainer02">
                    <div className="infoblock">
                        <select name="" id="" onChange={(e) => setRayon(e.target.value)}>
                            <option value="">Tous les rayons</option>
                            {listederayons}
                        </select>
                    </div>
                    </div>
                <div className="listcontainer">
                    <div className="infoblock">                        
                        {displaylist}
                    </div>
                </div>
            </div>
        </div>
    )


}
export default Slideshow;