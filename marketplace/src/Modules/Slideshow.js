import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Assets/Utils";
import { showMyproduct } from "../action/showproduct.action";
import { modalposition } from "../action/position.action";
import { searchinfo } from "../Assets/Functions";
import { useNavigate } from "react-router-dom";

// css : './components/_slideshow.scss'
const Slideshow = ({ listederayons, allproductslist, magasins, enavant }) => {
  // -------------------- Variables
  const dispatch = useDispatch();
  const mylink = useNavigate();
  const [filteredlist, setFilteredlist] = useState([]);
  const [displaylist, setDisplaylist] = useState([]);
  const [sliderindex, setSliderindex] = useState(0);
  const [slidercontent, setSlidercontent] = useState([]);
  const [selectedrayon, setSelectedRayon] = useState(0);
  
  // css pour chevrons
  const gauche = "-100%";
  const centre = 0;
  const droite = '100%';


  // -------------------- Fonctions
  // changer value de rayon
  const setRayon = (value) => {
    setSelectedRayon(value);
  };
  // créer une liste de produits filtrée
  function filtermylist(selector) {
    const templist =
      !isEmpty(allproductslist) &&
      Array.from(allproductslist)
        .filter((product) => product[selector] == 1)
        .filter(
          (product) => selectedrayon == 0 || product.rayon == selectedrayon
        )
        .map((product, index) => { // ajouter une propriété "position" afin de pouvoir ordonner la liste dans le slider
          return { ...product, position: index };
        });
    setFilteredlist(templist);
  }

  // communiquer la position-Y pour le modal et Ouvrir le modal aperçu de produit
  const showaproduct = (e, id) => {
    document.body.style.overflow = "hidden";
    dispatch(showMyproduct(id));
    dispatch(modalposition(e.pageY - e.clientY));
  };

  // aller à un magasin
  const goto = (id) => {
    mylink(id);
  };
  const openstore = (id) => {
    goto("/boutique/" + id);
  };

  // générer liste de produits séléctionnés
  const listofproduct = async () => {
    const templist =
      !isEmpty(filteredlist) &&
      Array.from(filteredlist).map((product, index) => (
        <div key={index} className="simpleproductbox">
          <div className="productthumbnail">
            <img
              src={
                !isEmpty(allproductslist)
                  ? "http://localhost:8080/uploads/" + product.image01
                  : ""
              }
              alt="Aucune image trouvée"
            />
          </div>
          <div className="productinfos">
            <div className="productname">
              <b>
                <button onClick={(e) => showaproduct(e, product.id)}>
                  {product.nomproduit}
                </button>
              </b>
            </div>
            <div className="prixproduit">
              {searchinfo(magasins, product.storeid, "nommagasin")}
            </div>
            <div className="prixproduit">{product.prix} Ar</div>
          </div>
        </div>
      ));
    setDisplaylist(templist);
  };

  // Images et contenus du slider principal
  const myslider = () => {
    if (filteredlist == []) {
      const templist =
        !isEmpty(filteredlist) &&
        Array.from(filteredlist).map((product, index) => (
          <div key={product.id} className={index != sliderindex ? "slidebox" : "showme"} >
            <img src={  !isEmpty(allproductslist) ? "http://localhost:8080/uploads/" + product.image01 : "" } alt="" />
          </div>
        ));
      setSlidercontent(templist);
    } else {
      // version originale
      const templist =
        !isEmpty(filteredlist) &&
        Array.from(filteredlist)
          .filter((product) => (((filteredlist.length < 1) && product.position == 1) || product.position > -1 && product.position < 3 ))
          .map((product) => (
            <div key={product.id} className={`showme image0${product.position}`}
              style={{
              left: 
                product.position == 0 ? gauche :
                  ((product.position == 1) ? centre :
                      (product.position == 2 && droite)
                  )
                }}>
                <img onClick={(e) => showaproduct(e, product.id)} src={!isEmpty(allproductslist) ? "http://localhost:8080/uploads/" + product.image01 : ""} alt="" />
                <button className="slidebtn01" onClick={(e) => showaproduct(e, product.id)} > {product.nomproduit} </button>
                <button className="slidebtn02" onClick={() => openstore(product.storeid)} > {searchinfo(magasins, product.storeid, "nommagasin")}</button>
            </div>
          ));
      setSlidercontent(templist);
    }
  };

  // Décrémenter slider
  const removeindex = () => {
    if (filteredlist && Array.isArray(filteredlist)) {
        const templist = filteredlist.map((item, i) => ({
            ...item, 
            position: ((filteredlist.length + item.position - 1) % filteredlist.length)
        }));
        setFilteredlist(templist);
    }
  };
  //Incrémenter slider
  const addindex = () => {
    if (filteredlist && Array.isArray(filteredlist)) {
        const templist = filteredlist.map((item, i) => ({
            ...item,
            position: (item.position + 1) % filteredlist.length
        }));
        
        setFilteredlist(templist);
    }
};

  // Boucle auto slider
  useEffect(() => {
      const imginterval = setInterval(() => {
        removeindex();
      }, 4000);
      return () => {
          clearInterval(imginterval);
      }
  }, [filteredlist, slidercontent]);
    

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
  }, [selectedrayon]);

  return (
    <div className="slideshowcontainer">
      <div className="imgpart">
        <span className="leftchevron" onClick={() => removeindex()}></span>
        <div className="mainimage">{slidercontent}</div>
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
          <div className="infoblock">{displaylist}</div>
        </div>
      </div>
    </div>
  );
};
export default Slideshow;
