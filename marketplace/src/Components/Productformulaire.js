import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

//------------------------------REDUX-------------------------------------------
import { addRayon } from "../action/rayon.action";
import { addCategorie } from "../action/categorie.action";
import { addsouscat } from "../action/souscat.action";
import { addMarque } from "../action/marque.action";
import { addProduct, getProduct, modifyProduct  } from "../action/produit.action";
import Boimagelist from "./Boimagelist";
//------------------------------Editor - WYSIWYG-------------------------------------------
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
// import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

//------------------------------ Autres -------------------------------------------
import { isEmpty } from "../Assets/Utils";
import { categorygen, rayonsgen, souscatgen } from "../Assets/Functions";


const Productformulaire = ({
  closeproductmodal,
  userdata,
  storedata,
  selectedproduct,
  images,
  setImages,
  previews,
  setPreviews,
  productform,
  rayonselect,
  setRayonselect,
  categorieselect,
  setCategorieselect,
  souscategorieselect,
  setSouscategorieselect,
  marqueselect,
  setMarqueselect,
  descricourt,
  descrilong,
  setDescricourt,
  setDescrilong,
}) => {
  const dispatch = useDispatch();

  /* *****************************************************************************************
     *************** Rayons - Catégories - Sous-catégories - Marques ************************
    ***************************************************************************************** */
  /* ----------------------------------------------------------
                              Rayons  
    ----------------------------------------------------------- */
  //----------------------- Ajout nouveau Rayon
  const rayon = useSelector((state) => state.rayonReducer.rayon);
  const rayonform = useRef();
  const submitrayon = (e) => {
    e.preventDefault();
    const data = {
      rayon: rayonform.current[0].value,
    };
    dispatch(addRayon(data));
    rayonform.current[0].value = "";
  };
  
  //------------------------ Lister les rayons
  const rayonlist = rayonsgen();

  //------------------------ Rayon de produit sélectionné et choix de rayon
  const productRayon = selectedproduct && rayon ? rayon.find((myrayon) => {
      return Number(myrayon.id) === Number(selectedproduct.rayon);
    })
    : null;
  
  // ----------------------- Changer rayonselect
  const rayonchoice = (e) => {
    setRayonselect(e.target.value);
  };

  /* ----------------------------------------------------------
                              Catégorie  
    ----------------------------------------------------------- */
  //----------------------- Ajout nouvelle Catégorie
  const categorieform = useRef();
  const submitcategorie = (e) => {
    e.preventDefault();
    const data = {
      categorie: categorieform.current[1].value,
      idrayon: rayonselect,
    };
    categorieform.current[1].value = "";
    console.log(data);
    dispatch(addCategorie(data));
  };

  //------------------------- Lister les Catégories
  const categorielist = categorygen(rayonselect);
  const categorie = useSelector((state) => state.categorieReducer.categorie);

  //------------------------ Catégorie de produit sélectionné et choix de catégorie
  const productCategorie =
    selectedproduct && categorie
      ? categorie.find((mycategory) => {
          return Number(mycategory.id) === Number(selectedproduct.categorie);
        })
      : null;
  const categoriechoice = (e) => {
    setCategorieselect(e.target.value);
  };

  /* ----------------------------------------------------------
                              Sous-Catégorie  
    ----------------------------------------------------------- */
  //------------------------ Ajout nouvelle sous-catégorie
  const souscatform = useRef();
  const submitsouscat = (e) => {
    e.preventDefault();
    const data = {
      idcategorie: categorieselect,
      souscategorie: souscatform.current[1].value,
    };
    dispatch(addsouscat(data));
    souscatform.current[1].value = "";
  };

  //------------------------------ Lister les sous-catégorie
  const souscategorie = useSelector((state) => state.souscatReducer.souscat);
  const souscatlist = souscatgen(rayonselect, rayonlist, categorielist, categorieselect);

  //----------------------- Sous Categorie de produit sélectionné et choix de sous-catégorie
  const productSouscategorie = selectedproduct && !isEmpty(souscategorie)
    ? souscategorie.find((mysouscateg) => {
        return Number(mysouscateg.id) === Number(selectedproduct.souscategorie);
      })
    : null;
  const souscatchoice = (e) => {
    setSouscategorieselect(e.target.value);
  };

  /* ----------------------------------------------------------
                              Marque  
    ----------------------------------------------------------- */
  //----------------------- Ajout nouvelle marque
  const brandrayonform = useRef();
  const submitbrand = (e) => {
    e.preventDefault();
    const data = {
      marque: brandrayonform.current[1].value,
      idrayon: brandrayonform.current[0].value,
    };
    dispatch(addMarque(data));

    brandrayonform.current[1].value = "";
  };

  //------------------------ Lister les marques
  const marques = useSelector((state) => state.marqueReducer.marque);
  const [listofmark, setListofmark] = useState([]);
  useEffect(() => {
    const listetemporaire =
      !isEmpty(marques) &&
      marques
        .filter((marque) => marque.idrayon == rayonselect)
        .map((marque) => (
          <option key={marque.id} value={marque.id}>
            {marque.marque}
          </option>
        ));
    setListofmark(listetemporaire);
  }, [marques, rayonselect]);

  //----------------------- Marque de produit sélectionné et choix de marque
  const selectedMarque =
    selectedproduct && marques
      ? marques.find((mymark) => {
          return Number(mymark.id) === Number(selectedproduct.marque);
        })
      : null;
  const marquechoice = (e) => {
    setMarqueselect(e.target.value);
  };

  // console.log(rayonselect);
  useEffect(() => {
    selectedproduct && productRayon ? setRayonselect(productRayon.id) : null;
    selectedproduct && productCategorie ? setCategorieselect(productCategorie.id) : null;
    selectedproduct && productSouscategorie ? setSouscategorieselect(productSouscategorie.id) : null;
    selectedproduct && selectedMarque ? setRayonselect(selectedMarque.id) : null;
  }, [selectedproduct, productRayon, productCategorie, productSouscategorie, selectedMarque]);
  // console.log(rayonselect);
  
  /* ------------------------------- VIDER -------------------------------------- */
  // Vider liste de catégories, sous-catégories et marques
  useEffect(() => {
    // imgrender();
    // setCategorielist([]);
    // setSouscatlist([]);
    setListofmark([]);
  }, [selectedproduct]);

  //------------------------------State des "Editor"-----------------------------------
  useEffect(() => {
    if (selectedproduct && selectedproduct.courtdescript) {
      if (!descricourt.getCurrentContent().hasText()) {
        try {
          const contentState = convertFromRaw(
            JSON.parse(selectedproduct.courtdescript)
          );
          setDescricourt(EditorState.createWithContent(contentState));
        } catch (error) {
          console.error(
            "Erreur lors de la conversion de courtdescript: ",
            error
          );
        }
      }
    }
  }, [descricourt]);

  useEffect(() => {
    if (selectedproduct && selectedproduct.longdescript) {
      if (!descrilong.getCurrentContent().hasText()) {
        try {
          const contentState = convertFromRaw(
            JSON.parse(selectedproduct.longdescript)
          );
          setDescrilong(EditorState.createWithContent(contentState));
        } catch (error) {
          console.error(
            "Erreur lors de la conversion de courtdescript: ",
            error
          );
        }
      }
    }
  }, [descrilong]);

  //------------------------------"OnChange" Function des "Editor"----------------------
  const handleEditorChange = (newEditorState) => {
    setDescricourt(newEditorState);
  };
  const handlelongdescchange = (newEditorState) => {
    setDescrilong(newEditorState);
  };

  //------------------------------Gestion des Images-----------------------------------
  
  /* ------------------------------------------------------------------------------------
     -----------------------------------ADD PRODUCT--------------------------------------
     ------------------------------------------------------------------------------------- */

  //----------------------------------- Description courte
  const mycontent = descricourt.getCurrentContent();
  const myrawcontent = convertToRaw(mycontent);

  //----------------------------------- Description longue
  const longdesc = descrilong.getCurrentContent();
  const mydescrawcontent = convertToRaw(longdesc);

  const addproduct = (e) => {
    e.preventDefault();

    //------------------------------------- Datas
    const data = {
      userid: userdata.id,
      storeid: storedata.id,
      nomproduit: productform.current[0].value,
      rayon: rayonselect,
      categorie: categorieselect,
      souscategorie: souscategorieselect,
      reference: productform.current[5].value,
      marque: marqueselect,
      prix: productform.current[12].value,
      image01: images[0],
      image02: images[1],
      image03: images[2],
      image04: images[3],
      image05: images[4],
      image06: images[5],
      courtdescript: JSON.stringify(myrawcontent),
      longdescript: JSON.stringify(mydescrawcontent),
    };

    dispatch(addProduct(data));
    dispatch(getProduct());
    for (let i = 0; i < 13; i++) {
      productform.current[i].value = "";
    }
    productform.current.reset();
    setDescricourt(EditorState.createEmpty());
    setDescrilong(EditorState.createEmpty());
    setPreviews([null, null, null, null, null, null]);
    setRayonselect(null);
    setCategorieselect(null);
    setSouscategorieselect(null);
    setMarqueselect(null);
    closeproductmodal();
  };

  /* ------------------------------------------------------------------------------------
     --------------------------------MODIFY PRODUCT--------------------------------------
     ------------------------------------------------------------------------------------- */
  const modifyproduct = (e) => {
    e.preventDefault();
    //------------------------------------- Datas

    const data = {
      id: selectedproduct.id,
      userid: userdata.id,
      storeid: storedata.id,
      nomproduit: productform.current[0].value,
      rayon: rayonselect,
      categorie: categorieselect,
      souscategorie: souscategorieselect,
      reference: productform.current[5].value,
      marque: marqueselect,
      prix: productform.current[12].value,
      image01: images[0],
      image02: images[1],
      image03: images[2],
      image04: images[3],
      image05: images[4],
      image06: images[5],
      courtdescript: JSON.stringify(myrawcontent),
      longdescript: JSON.stringify(mydescrawcontent),
    };

    dispatch(modifyProduct(data));
    // dispatch(getProduct());
    for (let i = 0; i < 13; i++) {
      productform.current[i].value = "";
    }
    productform.current.reset();
    setDescricourt(EditorState.createEmpty());
    setDescrilong(EditorState.createEmpty());
    setPreviews([null, null, null, null, null, null]);
    setRayonselect(null);
    setCategorieselect(null);
    setSouscategorieselect(null);
    setMarqueselect(null);
    closeproductmodal();
    // console.log(rayonselect);
  };

  // **************************************************************************************************************
  // -----------------------------------------------------JSX------------------------------------------------------
  // **************************************************************************************************************
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h2>Ajouter un produit</h2>
      </div>
      <div className="modal-body">
        <div className="formcontainer">
          <form ref={productform} encType="multipart/form-data">
            {/* --------------------------------------------------------------------------------------
                                    Nom produit
              -------------------------------------------------------------------------------------*/}
            <div className="separatecol">
              <h3>Nom du produit</h3>
            </div>
            <div className="separatecol">
              <div className="col01">
                {/* <label htmlFor="nomproduit">Nom produit</label> */}
                <input
                  type="text"
                  defaultValue={
                    selectedproduct ? selectedproduct.nomproduit : ""
                  }
                  name="nomproduit"
                />
              </div>
            </div>

            {/* --------------------------------------------------------------------------------------
                                      Catégories
                -------------------------------------------------------------------------------------*/}
            <div className="separatecol">
              <div className="modalleftcol">
                <h3>Place dans le magasin</h3>
                {/* Déclaration de la variable rayonname en dehors du JSX */}

                <label htmlFor="rayon">Rayon</label>
                <select onChange={(e) => rayonchoice(e)}>
                  <option key="0" value={productRayon ? productRayon.id : 0}>
                    {productRayon
                      ? productRayon.rayon
                      : "Sélectionner un rayon"}
                  </option>
                  {rayonlist}
                </select>

                <label htmlFor="categorie">Catégorie</label>
                <select onChange={(e) => categoriechoice(e)}>
                  <option
                    key="0"
                    value={productCategorie ? productCategorie.id : 0}
                  >
                    {productCategorie
                      ? productCategorie.categorie
                      : "Sélectionner une catégorie "}
                  </option>
                  {categorielist}
                </select>

                <label htmlFor="souscategorie">Sous-catégorie</label>
                <select onChange={(e) => souscatchoice(e)}>
                  <option
                    key="0"
                    value={productSouscategorie ? productSouscategorie.id : 0}
                  >
                    {productSouscategorie
                      ? productSouscategorie.souscategorie
                      : "Sélectionner une sous-catégorie "}
                  </option>
                  {souscatlist}
                </select>

                <h3>Références</h3>
                <label htmlFor="rayon">Marque</label>
                <select onChange={(e) => marquechoice(e)}>
                  <option
                    key="0"
                    value={selectedMarque ? selectedMarque.id : ""}
                  >
                    {selectedMarque
                      ? selectedMarque.marque
                      : "Sélectionner une marque "}
                  </option>
                  {listofmark}
                </select>

                <label htmlFor="nomproduit">Référence</label>
                <input
                  type="text"
                  name="nomproduit"
                  defaultValue={
                    selectedproduct ? selectedproduct.reference : ""
                  }
                />
              </div>

              {/* --------------------------------------------------------------------------------------
                                      Images
                  -------------------------------------------------------------------------------------*/}
              <div className="bricks">
                <h3 style={{ textAlign: "center" }}>Images</h3>
                <div className="brickctnr">
                <Boimagelist index={0} selectedproduct={selectedproduct} images={images} previews={previews} setImages={setImages} setPreviews={setPreviews} />
                <Boimagelist index={1} selectedproduct={selectedproduct} images={images} previews={previews} setImages={setImages} setPreviews={setPreviews} />
                <Boimagelist index={2} selectedproduct={selectedproduct} images={images} previews={previews} setImages={setImages} setPreviews={setPreviews} />
                <Boimagelist index={3} selectedproduct={selectedproduct} images={images} previews={previews} setImages={setImages} setPreviews={setPreviews} />
                <Boimagelist index={4} selectedproduct={selectedproduct} images={images} previews={previews} setImages={setImages} setPreviews={setPreviews} />
                <Boimagelist index={5} selectedproduct={selectedproduct} images={images} previews={previews} setImages={setImages} setPreviews={setPreviews} />
                </div>
              </div>
            </div>

            {/* --------------------------------------------------------------------------------------
                                       Prix et Promo
                -------------------------------------------------------------------------------------*/}
            {/* <h3>Couleurs dispo</h3>
                <h3>Taille dispo</h3>
                <h3>Dimensions empaquettage</h3>
                  <h3>Poids net</h3> */}
            {/* <div className="separatecol">
                <div className="col02">
                  
                </div>

                <div className="col01">
                  
                </div>
                <div className="col02">
                  
                </div>
              </div> */}
            <div className="separatecol">
              <h3>Prix</h3>
            </div>
            <div className="separatecol">
              <div style={{ display: "inline-block" }}>
                {/* <label htmlFor="prix">Prix (en Ar)</label> */}
                <input
                  defaultValue={selectedproduct ? selectedproduct.prix : 0}
                  style={{ display: "inline-block", textAlign: "right" }}
                  type="number"
                  name="prix"
                  id="prix"
                />
                <span>Ariary</span>
              </div>
            </div>

            {/* <h3>Promo</h3>
                <div className="separatecol">
                  <div className="col02">
                    <label htmlFor="prix">Date début promo</label>
                    <input type="date" name="prix" id="prix" />
                  </div>
                  <div className="col02">
                    <label htmlFor="prix">Date fin promo</label>
                    <input type="date" name="prixpromo" id="prixpromo" />
                  </div>
                  <div className="col02">
                    <label htmlFor="prix">Prix promo (en Ar)</label>
                    <input type="number" name="prixpromo" id="prixpromo" />
                  </div>
                </div> */}

            {/* --------------------------------------------------------------------------------------
                                      Descriptions
                -------------------------------------------------------------------------------------*/}
            <div className="separatecol">
              <h3>Description courte</h3>
            </div>
            <div className="separatecol">
              <div
                className="col01"
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  minWidth: "300px",
                  maxWidth: "800px",
                  padding: "30px",
                }}
              >
                <Editor
                  editorState={descricourt}
                  onEditorStateChange={handleEditorChange}
                ></Editor>
              </div>
            </div>

            <div className="separatecol">
              <h3>Description longue</h3>
            </div>
            <div className="separatecol">
              <div
                className="col01"
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  minWidth: "300px",
                  maxWidth: "800px",
                  padding: "30px",
                }}
              >
                <Editor
                  editorState={descrilong}
                  onEditorStateChange={handlelongdescchange}
                ></Editor>
              </div>
            </div>

            <div className="separatecol lastbutton">
            {isEmpty(selectedproduct) ? (
              <button onClick={(e) => addproduct(e)}>Enregistrer </button>
            ) : (
              <button onClick={(e) => modifyproduct(e)}>Modifier </button>
            )}</div>
          </form>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={closeproductmodal}>Fermer</button>
      </div>

    </div>
  );
};

export default Productformulaire;
