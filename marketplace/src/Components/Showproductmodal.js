import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Assets/Utils";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { showMyproduct } from "../action/showproduct.action";
import { useNavigate } from "react-router-dom";

const Showproductmodal = ({ myproductdetails, e }) => {
    let defaultimage = "./image/imageicon.png";

    // ----------------------- Variables ---------------------------------
    const dispatch = useDispatch();
    const [imglist, setImglist] = useState([]);
    const [imagetoshow, setImagetoshow] = useState(!isEmpty(myproductdetails) && myproductdetails.image01 ? myproductdetails.image01 : defaultimage);
    const nomdemarque = useSelector((state) => state.marqueReducer.marque);
    const marqueproduit = !isEmpty(nomdemarque) && !isEmpty(myproductdetails) ? nomdemarque.find((marque) => marque.id == myproductdetails.marque) : null;
    const mylink = useNavigate();
    // ----------------------- Fonctions ---------------------------------
    // Ouvrir le texte WYSIWYG de Editor
    const convertDraftToHtml = (rawContentSate) => {
        const contentState = convertFromRaw(rawContentSate);
        const editorState = EditorState.createWithContent(contentState);
        return draftToHtml(convertToRaw(editorState.getCurrentContent()));
    };
    
    // Switch des images à afficher dans l'aperçu principal
    const changeimage = (myimage) => {
        for (let i = 1; i < 7; i++){
            if (myimage == i) {
                setImagetoshow(myproductdetails?.[`image0${i}`] || defaultimage);
                return;
            }
        }
    }

    // gestion des classes des images dans le grid : 1 à 6
    const imggridfunction = () => {
        const templist = [];
        let pinknumber = 0;
        if (myproductdetails) {
            for (let i = 1; i < 7; i++){
                if(myproductdetails?.[`image0${i}`])
                {
                    pinknumber++;
                    templist.push(
                    <div key={i} className={'gridimage0' + pinknumber}>
                        <button onClick={() => changeimage(i)}>
                            <img
                                src={
                                !isEmpty(myproductdetails?.[`image0${i}`])
                                    ? "http://localhost:8080/uploads/" +
                                    myproductdetails?.[`image0${i}`]
                                    : defaultimage
                                }
                                alt={
                                !isEmpty(myproductdetails)
                                    ? myproductdetails.nomproduit
                                    : "Aucune image trouvée"
                                }
                            />
                        </button>  
                        </div>);
                    setImglist(templist);
                }
            }
        }
    }

    // créer un lien
    const goto = (id) => {
        mylink(id);
    }

    // aller à un produit
    const openproduct = (id) => {
        dispatch(showMyproduct(0));
        goto('/product/' + id);
    }
    // ----------------------- Logique ---------------------------------
    useEffect(() => {
        if (myproductdetails) {
            changeimage(1);
            imggridfunction();
        }
    }, [myproductdetails])
    
  return (
    <div className="modal-content">
        <div className="modal-header">
              <span className="closemodal" onClick={() => dispatch(showMyproduct(0))}></span>
            
      </div>
        <div className="modal-body">
            <div className="separatecol">
                <div className="col01">
                    <div className="imagegrid">
                        <div className="pplimage">
                            <img
                            src={
                            myproductdetails && !isEmpty(myproductdetails)
                                ? "http://localhost:8080/uploads/" +
                                imagetoshow
                                : defaultimage
                            }
                            alt={
                            !isEmpty(myproductdetails)
                                ? myproductdetails.nomproduit
                                : "Aucune image trouvée"
                            }
                        />
                        </div> 
                        {imglist}
                    </div>
                </div>
                  <div className="col02" >
                  <h2>{!isEmpty(myproductdetails) && myproductdetails.nomproduit}</h2>
                    <div className="modaldescript">
                    {!isEmpty(marqueproduit) && <p>Marque : <b> {marqueproduit && marqueproduit.marque}</b></p>}
                    <span>{!isEmpty(myproductdetails) && <div dangerouslySetInnerHTML={{ __html: convertDraftToHtml(JSON.parse(myproductdetails.courtdescript)) }} />}</span>
                    </div>
                    <div className="modaldescript">
                    {!isEmpty(myproductdetails) && <p>Prix : {myproductdetails.prix} Ar</p>}
                    </div>
                  </div>
            </div>
              
        
      </div>
      <div className="modal-footer">
        <button>Ajouter au panier</button>
        <button>Acheter plus tard</button>
        <button onClick={() => openproduct(myproductdetails.id)}>Voir les détails</button>
      </div>
    </div>
  );
};

export default Showproductmodal;
