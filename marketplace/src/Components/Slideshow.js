import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Assets/Utils";
import { showMyproduct } from "../action/showproduct.action";
import { modalposition } from "../action/position.action";
import { searchinfo } from "../Assets/Functions";
import { useNavigate } from "react-router-dom";

// css : './components/_slideshow.scss'
const Slideshow = ({listederayons, allproductslist, magasins, enavant}) => {
    // -------------------- Variables
    const dispatch = useDispatch();
    const [filteredlist, setFilteredlist] = useState([]);
    const [displaylist, setDisplaylist] = useState([]);
    const [sliderindex, setSliderindex] = useState(0);
    const [slidercontent, setSlidercontent] = useState([]);
    const [finalshow, setFinalshow] = useState([]);
    const [selectedrayon, setSelectedRayon] = useState(0);
    const mylink = useNavigate();


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
        document.body.style.overflow = 'hidden';
        dispatch(showMyproduct(id));
        dispatch(modalposition(e.pageY - e.clientY));  
    }
    
    // aller à un magasin
    const goto = (id) => {
        mylink(id);
    }
    const openstore = (id) => {
        goto('/boutique/' + id);
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

    // pour chevrons
    const [myleft, setMyleft] = useState(0);
    
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
            // version originale
        const templist = !isEmpty(filteredlist) && Array.from(filteredlist)
            .map((product, index) => (
            <div key={index} className={`showme image0${index}`} position={index}>
                <img onClick={(e) => showaproduct(e, product.id)} src={!isEmpty(allproductslist) ? 'http://localhost:8080/uploads/' + product.image01 : ''} alt="" />
                <button className="slidebtn01" onClick={(e) => showaproduct(e, product.id)}>{product.nomproduit}</button>
                <button className="slidebtn02" onClick={() => openstore(product.storeid)}>{searchinfo(magasins, product.storeid, 'nommagasin')}</button>
            </div>
        ));
        setSlidercontent(templist);
       } 
    }

    // Décrémenter slider
    const removeindex = () => {
        setSliderindex(((sliderindex - 1) + filteredlist.length ) % filteredlist.length);
        
    }
    const [test, setTest] = useState([]);
    //Incrémenter slider
    const addindex = () => {
        setSliderindex(((sliderindex + 1) + filteredlist.length) % filteredlist.length);

        if (slidercontent && typeof(slidercontent) == 'object') {
            const poulet = [...slidercontent];
            for (let i = 0; i < slidercontent.length; i++){
                slidercontent[i] = slidercontent[(slidercontent.length + i + 1) % slidercontent.length];
                console.log('poulet de ' + i + ' = slidercontent de ' + (slidercontent.length + i + 1) % slidercontent.length);
                // slidercontent[i] = poulet[i];
            }
            // setSlidercontent(poulet);
            console.log(poulet);
            console.log(slidercontent);
            
        }
    }
    
    // Boucle auto slider
    // useEffect(() => {
    //     const imginterval = setInterval(() => {
    //         addindex();
    //     }, 2000);
    //     return () => {
    //         clearInterval(imginterval);
    //     }
    // }, [filteredlist, sliderindex]);

    const imggridfunction = () => {
        if(slidercontent && typeof(slidercontent) == 'object'){
            const templist = slidercontent
                .filter((product, index) => (
                    product.position > 0 && product.position < 4
                ))
                .map((product) => (
                    <div className="imggrid00">hello
                        {/* <img src={} alt="" /> */}
                    </div>
                ));
            setFinalshow(templist);
            console.log(templist);
        }
    }

    
    // -------------------- Logiques
    // Générer la liste de produits
    // Filtrer la liste selon le critère "enavant"
    useEffect(() => {
        filtermylist(enavant);
    }, [allproductslist, enavant, selectedrayon]);
    
    // Générer la liste de produits une fois que filteredlist est défini
    useEffect(() => {
        if (!isEmpty(filteredlist)) {
            listofproduct();
            myslider();
        }
    }, [filteredlist, selectedrayon]);
    
    // Mettre à jour le slider lorsque l'index change
    useEffect(() => {
        myslider();
    }, [sliderindex, selectedrayon]);

    // vue grid filtrée
    // useEffect(() => {
    //     imggridfunction();
    //     console.log(finalshow);
        
    // }, [slidercontent]);




    return (
        <div className="slideshowcontainer">
            
            <div className="imgpart">
                <span className="leftchevron" onClick={() => removeindex()}></span>
                <div className="mainimage">
                    {slidercontent}
                </div>
                <span className="rightchevron" onClick={() => addindex()}></span>
            </div>


            <div className="productpart">
                <div className="listcontainer">
                    {/* <select name="" id="" onChange={(e) => setRayon(e.target.value)}>
                        <option value="">Tous les rayons</option>
                        {listederayons}
                    </select> */}
                </div>
                <div className="listcontainer02">
                    <div className="infoblock">                        
                        {displaylist}
                    </div>
                </div>
            </div>
        </div>
    )


}
export default Slideshow;