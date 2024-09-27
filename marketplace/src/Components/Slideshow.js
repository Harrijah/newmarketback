import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Assets/Utils";
import { showMyproduct } from "../action/showproduct.action";
import { modalposition } from "../action/position.action";
import { searchinfo } from "../Assets/Functions";

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

    // communiquer la position-Y pour le modal et Ouvrir le modal aperçu de produit
    const showaproduct = (e, id) => {
        dispatch(showMyproduct(id));
        dispatch(modalposition(e.pageY - e.clientY));  
      }

    // générer liste de produits séléctionnés
    const listofproduct = async () => {
        const templist = !isEmpty(filteredlist) && Array.from(filteredlist).map((product, index) => (
            <div key={index} className="simpleproductbox">
                <div className="productthumbnail">
                    <img src={!isEmpty(allproductslist) ? 'http://localhost:8080/uploads/'+ product.image01 : ''} alt="Aucune image trouvée" />
                </div>
                <div className="productinfos">
                    <div className="productname"><b>
                        <button onClick={(e) => showaproduct(e, product.id)}>{product.nomproduit}</button></b>
                    </div>
                    <div className="prixproduit">{searchinfo(magasins, product.storeid, 'nommagasin') }</div>
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
                <img onClick={(e) => showaproduct(e, product.id)} src={!isEmpty(allproductslist) ? 'http://localhost:8080/uploads/' + product.image01 : ''} alt="" />
                <button className="slidebtn01" onClick={(e) => showaproduct(e, product.id)}>{product.nomproduit}</button>
                <button className="slidebtn02">{searchinfo(magasins, product.storeid, 'nommagasin')}</button>
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
                <div className="leftchevron">
                    <button onClick={() => removeindex()}><i className="fa fa-chevron-left"></i></button>
                </div>
                <div className="mainimage">
                    {slidercontent}
                </div>
                <div className="rightchevron">
                    <button onClick={() => addindex()}><i className="fa fa-chevron-right"></i></button>
                </div>
            </div>


            <div className="productpart">
                    <div className="listcontainer02">
                            <select name="" id="" onChange={(e) => setRayon(e.target.value)}>
                                <option value="">Tous les rayons</option>
                                {listederayons}
                            </select>
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