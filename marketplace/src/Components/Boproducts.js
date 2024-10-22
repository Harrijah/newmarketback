import React, { useEffect, useState, useRef } from "react";

//------------------------------Autres-------------------------------------------
import { isEmpty } from "../Assets/Utils";

//------------------------------REDUX-------------------------------------------
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getOneproduct } from "../action/produit.action";
import Productformulaire from "./Productformulaire";

//-----------------------------EDITOR
import { EditorState } from "draft-js";
import { showMyproduct } from "../action/showproduct.action";
import { modalposition } from "../action/position.action";

// css :  './components/_bomagasin.scss'
const Boproducts = ({ userdata, storedata, productslist }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([[], [], [], [], [], []]);
  const [previews, setPreviews] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  //------------------------------ Formulaire - Produit
  const productform = useRef();

  //------------------------------ Variables ---------------------------------------
  // Formulaires : Rayon, Catégorie, Sous-catégorie, Marque
  const [rayonselect, setRayonselect] = useState(null);
  const [categorieselect, setCategorieselect] = useState(null);
  const [souscategorieselect, setSouscategorieselect] = useState(null);
  const [marqueselect, setMarqueselect] = useState(null);
  // Initialise l'état de l'éditeur vide par défaut
  const [descricourt, setDescricourt] = useState(() => EditorState.createEmpty());
  const [descrilong, setDescrilong] = useState(() => EditorState.createEmpty());
  const [productmodal, setProductmodal] = useState(false);
  const [selectedproduct, setSelectedproduct] = useState(null);
  const [myproductlist, setMyproductlist] = useState([]);
  // position du modal
  const modaly = useSelector((state) => state.positionReducer.position);
  
  
  // ------------------------------ Fonctions  ----------------------------------
  // Ouvrir aperçu de produit 
  const openmymodal = (e, id) => {
    document.body.style.overflow = 'hidden';
    dispatch(showMyproduct(id));
    dispatch(modalposition(e.pageY - e.clientY));
  } 
  // Charger un produit
  const chargeproduct = (id) => {
    const foundproduct = !isEmpty(productslist) && productslist.find((myone) => (myone.id == id));
    setSelectedproduct(!isEmpty(foundproduct) && foundproduct);
  }
  
  // Ouvrir le modal de modification de produit
  const showproductmodal = async (e, id) => {
    chargeproduct(id);
    setProductmodal(true);
    dispatch(modalposition(e.pageY - e.clientY));
    setDescricourt(EditorState.createEmpty());
    setDescrilong(EditorState.createEmpty());
    document.body.style.overflow = 'hidden';
  };

  // Fonction pour supprimer les infos temporaires de produit
  const clearinfos = () => {
    productform.current.reset();
    setRayonselect(null);
    setCategorieselect(null);
    setSouscategorieselect(null);
    setMarqueselect(null);
    setImages([null, null, null, null, null, null]);
    setPreviews([null, null, null, null, null, null]);
    setSelectedproduct(null);
  }
  const hidemodal = (e) => {
    e.target.className == "modal" && setProductmodal(false);
    document.body.style.overflow = 'auto';
    // clearinfos();
  };
  const closeproductmodal = () => {
    setProductmodal(false);
    clearinfos();
  };           
  
  // Delete product
  const deletemyproduct = (id) => {
    dispatch(deleteProduct(id));
  };


//----------------------------------- Logiques
  // Liste de produits : générer la liste en amont, ensuite mettre dans HTML
  useEffect(() => {
    const tempmyproductlist =
      !isEmpty(productslist) &&
      productslist.map((produit) => (
        <li key={produit.id}>
          <span className="modifyprod">
            <button className="nomproduit" onClick={(e) => openmymodal(e, produit.id)}>{produit.nomproduit}</button>
          </span>
          <button className="myfontawesome" onClick={(e) => showproductmodal(e, produit.id)}>
            <i className="fa fa-edit"></i>
          </button>
          <button className="myfontawesome" onClick={() => { deletemyproduct(produit.id); }}>
            <i className="fa fa-trash-alt"></i>
          </button>
        </li>
      ));
    setMyproductlist(tempmyproductlist);

  }, [productslist]);


  // Montrer le Modal de modification de produits
  useEffect(() => {
    if (productmodal) {
      if (selectedproduct) {
        setImages([
          selectedproduct.image01,
          selectedproduct.image02,
          selectedproduct.image03,
          selectedproduct.image04,
          selectedproduct.image05,
          selectedproduct.image06,
        ]);
      }
      else {
        setImages([null, null, null, null, null, null]);
        setPreviews([null, null, null, null, null, null]);
        setSelectedproduct(null);
      }
    }
    else {
      clearinfos();
    }
  }, [productmodal, selectedproduct]);


  // **************************************************************************************************************
  // ----------------------------------------------------JSX-------------------------------------------------------
  // **************************************************************************************************************
  return (
    <div className="monmagasin">
      <h1>Mes produits</h1>

      {/* *****************************************************************
                              Ajouter un produit 
          ***************************************************************** */}
      <div className="infoblock">
        <h2>Ajouter un produit</h2>
        <button className="todeleteme" onClick={() => showproductmodal(0)}>Nouveau produit</button>
      </div>

      {/* *****************************************************************
                              Liste des produits
          ***************************************************************** */}
      <div className="infoblock">
        <h2>Liste des produits</h2>
        <ul>{!isEmpty(myproductlist) && myproductlist}</ul>
      </div>

      {/* *****************************************************************
                              Modal ajout produit 
          ***************************************************************** */}
      <div
        id="productmodal"
        className="modal"
        style={{top: modaly && modaly+'px', display: productmodal && "flex" }} //
        onClick={(e) => hidemodal(e)}
      >
        <Productformulaire
          closeproductmodal={closeproductmodal}
          userdata={userdata}
          storedata={storedata}
          selectedproduct={selectedproduct}
          images={images}
          setImages={setImages}
          previews={previews}
          setPreviews={setPreviews}
          productform={productform}
          rayonselect={rayonselect}
          setRayonselect={setRayonselect}
          categorieselect={categorieselect}
          setCategorieselect={setCategorieselect}
          souscategorieselect={souscategorieselect}
          setSouscategorieselect={setSouscategorieselect}
          marqueselect={marqueselect}
          setMarqueselect={setMarqueselect}
          descricourt={descricourt}
          descrilong={descrilong}
          setDescricourt={setDescricourt}
          setDescrilong={setDescrilong}
        />
      </div>
    </div>
  );
};

export default Boproducts;
