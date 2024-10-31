import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "./Utils";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useNavigate } from "react-router-dom";
import { addnumbtoprod, addtocart, removeformcart } from "../action/session.action";
import Ajoutpanier from "../Components/Ajoutpanier";
import Cartcontent from "../Components/Cartcontent";
import { addittowish } from "../action/whishlist.action";

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
// Rapidsearch modal
export const rapidsearchmodal = (clientsearchvalue, setRapidsearch) => {
  if (clientsearchvalue != "") {
    setRapidsearch(true);
    document.body.style.overflow = "hidden";
  } else {
    setRapidsearch(false);
    document.body.style.overflow = "auto";
  }
};

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
// join un par un
export const searchinfo = (base, id, request) => {
  const tempinfo =
    !isEmpty(base) &&
    typeof base == "object" &&
    base.find((info) => info.id == id);
  if (tempinfo && request in tempinfo) {
    return tempinfo[request];
  } else {
    return "";
  }
};

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
// retourne la liste de tous les rayons
export const rayonsgen = () => {
  const [myrayons, setMyrayons] = useState([]);
  const rayonlist = useSelector((state) => state.rayonReducer.rayon);

  useEffect(() => {
    if (rayonlist && typeof rayonlist == "object") {
      const templist = rayonlist.map((rayon, index) => (
        <option key={rayon.id || index} value={rayon.id}>
          {rayon.rayon}
        </option>
      ));
      setMyrayons(templist);
    }
  }, [rayonlist]);
  return myrayons;
};

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
// retourne les rayons auxquels des produits sont rattachés
export const rayongen = () => {
  // variables
  const allproductslist = useSelector((state) => state.productReducer.products);
  const rayonlist = useSelector((state) => state.rayonReducer.rayon);

  const [temprayonsliste, setTemprayonsliste] = useState([]);
  const [temprayons, setTemprayons] = useState([]);
  const [finalrays, setFinalrays] = useState([]);
  const templist = [];
  const secondrayon = [];

  // fonctions
  // Créer un tableau des id de rayons liés à des produits
  const placerays = () => {
    if (allproductslist) {
      // Sélectionner les rayons sans doublons
      for (let i = 0; i < allproductslist.length; i++) {
        let foundDuplicate = false;
        for (let j = 0; j < templist.length; j++) {
          if (allproductslist[i].rayon === templist[j]) {
            foundDuplicate = true;
            break; // On sort de la boucle si un doublon est trouvé
          }
        }
        if (!foundDuplicate) {
          templist.push(allproductslist[i].rayon);
        }
      }
      // Placer la liste des rayons dans le tableau "Temprayonsliste"
      setTemprayonsliste(templist);
    }
  };

  // Créer un array de rayons à partir de la liste des id trouvés dans le tableau "Temprayonslist"
  const createraylist = () => {
    if (temprayonsliste && rayonlist) {
      temprayonsliste.forEach((id) => {
        const testray = rayonlist.find((rayon) => rayon.id == id);
        secondrayon.push(testray);
        setTemprayons(secondrayon);
      });
    }
  };

  // mapper le tableau de rayons dans un array d'<option></option>
  const rayshortlist = () => {
    if (temprayons && typeof (temprayons == "object")) {
      const listtemp =
        temprayons &&
        Array.from(temprayons).map((item, index) => (
          <option key={item.id || index} value={item.id}>
            {item.rayon}
          </option>
        ));
      setFinalrays(listtemp);
    }
  };

  // logiques
  useEffect(() => {
    placerays();
  }, [allproductslist]);
  useEffect(() => {
    createraylist();
  }, [temprayonsliste]);
  useEffect(() => {
    rayshortlist();
  }, [temprayons]);

  return finalrays;
};

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
// choisir un rayon
export const rayonchoice = (e) => {
  const [rayonselect, setRayonselect] = useState(0);
  setRayonselect(e.target.value);
  return rayonselect;
};

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
// retourne la liste des catégories en fonction du choix de rayon
export const categorygen = (rayonselect) => {
  const categorie = useSelector((state) => state.categorieReducer.categorie);
  const [categorielist, setCategorielist] = useState([]);
  useEffect(() => {
    const listofcategorie =
      !isEmpty(categorie) &&
      categorie.map(
        (categorie) =>
          categorie.idrayon == rayonselect && (
            <option key={categorie.id} value={categorie.id}>
              {categorie.categorie}
            </option>
          )
      );
    if (listofcategorie != "") {
      setCategorielist(listofcategorie);
    }
  }, [categorie, rayonselect]);
  return categorielist;
};

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
// retourne la liste des catégories où il y a des produits
export const filteredcategorygen = (rayonselect) => {
  const allproductslist = useSelector((state) => state.productReducer.products);
  const allcategories = useSelector(
    (state) => state.categorieReducer.categorie
  );
  const [filteredcategory, setFilteredcategory] = useState([]);
  const [categorylist, setCategorylist] = useState([]);
  const [tableauid, setTableauid] = useState([]);
  const categorieid = [];
  const temptableau = [];

  // Sortir un tableau d'id de catégories sans les doublons => ceux qui contiennent uniquement un produit
  useEffect(() => {
    if (allproductslist && typeof allproductslist == "object") {
      for (let i = 0; i < allproductslist.length; i++) {
        let doublon = false;

        for (let j = 0; j < categorieid.length; j++) {
          if (allproductslist[i].categorie == categorieid[j]) {
            doublon = true;
            break;
          }
        }
        if (!doublon) {
          categorieid.push(allproductslist[i].categorie);
        }
      }
      setTableauid(categorieid);
    }
    if (tableauid != "") {
      tableauid.forEach((cat) => {
        temptableau.push(
          allcategories.find((categorie) => categorie.id == cat)
        );
      });
      setCategorylist(temptableau);
      // console.log(temptableau);
    }
  }, [allproductslist, allcategories, rayonselect]);

  useEffect(() => {
    const templist = Array.from(categorylist)
      .filter((category) => category.idrayon == rayonselect)
      .map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.categorie}
        </option>
      ));
    setFilteredcategory(templist);
  }, [categorylist]);
  return filteredcategory;
};

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
// retourne la liste des sous-catégories
export const souscatgen = (
  rayonselect,
  rayonlist,
  categorielist,
  categorieselect
) => {
  const souscategorie = useSelector((state) => state.souscatReducer.souscat);
  const [souscatlist, setSouscatlist] = useState([]);

  useEffect(() => {
    const templist =
      !isEmpty(souscategorie) &&
      souscategorie.map(
        (souscat) =>
          souscat.idcategorie == categorieselect && (
            <option key={souscat.id} value={souscat.id}>
              {souscat.souscategorie}
            </option>
          )
      );
    if (templist != "") {
      setSouscatlist(templist);
    }
  }, [souscategorie, categorieselect, categorielist, rayonselect, rayonlist]);

  return souscatlist;
};

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
// retourne la liste des sous-catégories dans lesquelles il y a un produit
export const finalsouscatgen = (
  rayonselect,
  rayonlist,
  categorielist,
  categorieselect,
  filteredcategory
) => {
  const allproductslist = useSelector((state) => state.productReducer.products);
  const allsouscat = useSelector((state) => state.souscatReducer.souscat);
  const [souscat02, setSouscat02] = useState([]);
  const [finalsouscat, setFinalsoucat] = useState();
  const idlist01 = [];
  const malistesouscat = [];

  // lister les sous-catégories dans un tableau en enlevant les doublons
  useEffect(() => {
    if (allproductslist && typeof allproductslist == "object") {
      for (let i = 0; i < allproductslist.length; i++) {
        let doublon = false;
        for (let j = 0; j < idlist01.length; j++) {
          if (allproductslist[i].souscategorie == idlist01[j]) {
            doublon = true;
            break;
          }
        }
        if (!doublon && allproductslist[i].souscategorie != "0") {
          idlist01.push(allproductslist[i].souscategorie);
        }
      }
    }
    const tempsouscat = [];
    if (idlist01 != "" && allsouscat) {
      idlist01.forEach((idtrouve) => {
        tempsouscat.push(allsouscat.find((souscat) => souscat.id == idtrouve));
      });
      setSouscat02(tempsouscat);
    }
  }, [allproductslist, filteredcategory]);

  useEffect(() => {
    if (souscat02 != "") {
      setFinalsoucat(
        souscat02
          .filter((cat) => cat.idcategorie == categorieselect)
          .map((souscat) => (
            <option key={souscat.id} value={souscat.id}>
              {souscat.souscategorie}
            </option>
          ))
      );
    }
  }, [categorieselect]);
  return finalsouscat;
};

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
// Retourner la liste de marques
export const marqueselect = (rayonselect) => {
  // variables
  const marques = useSelector((state) => state.marqueReducer.marque);
  const [brandlist, setBrandlist] = useState([]);

  // fonctions
  const marqueliste = () => {
    const templist =
      marques &&
      typeof marques == "object" &&
      marques
        .filter((marque) => marque.idrayon == rayonselect)
        .map((marque) => (
          <option key={marque.id} value={marque.id}>
            {marque.marque}
          </option>
        ));
    setBrandlist(templist);
  };

  // logiques
  useEffect(() => {
    marqueliste();
  }, [marques, rayonselect]);

  return brandlist;
};

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
export const magasinselect = (rayonselect) => {
  // variables
  const magasins = useSelector((state) => state.storeReducer.allstore);
  const [magasinlist, setMagasinlist] = useState([]);

  // fonctions
  const storelist = () => {
    const templist =
      magasins &&
      typeof magasins == "object" &&
      magasins
        .filter((magasin) => Number(magasin.categorie) == Number(rayonselect))
        .map((magasin) => (
          <option key={magasin.id} value={magasin.id}>
            {magasin.nommagasin}
          </option>
        ));

    setMagasinlist(templist);
  };

  // logiques
  useEffect(() => {
    storelist();
    // console.log(magasinlist);
  }, [magasins, rayonselect]);

  return magasinlist;
};

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
// chercher le prix le plus élevé dans une sélection
export const findmaxprice = () => {
  const [pricearray, setPricearray] = useState([]);
  const allproductslist = useSelector((state) => state.productReducer.products);
  // sortir un array de liste de prix
  const listedeprix = () => {
    const templist = [];
    if (!isEmpty(allproductslist) && typeof allproductslist != "string") {
      allproductslist.forEach((product) => {
        templist.push(product.prix);
      });
      setPricearray(templist);
    }
  };

  // sélectionner le prix le plus haut
  const [myresponse, setMyresponse] = useState("");

  const selectmax = () => {
    if (!isEmpty(pricearray) && typeof pricearray == "object") {
      // const templist = [...pricearray];
      // for (let i = 0; i < pricearray.length; i++){
      //   // console.log('tour de boucle "I" numéro : ' + i);

      //   for (let j = 0; j < pricearray.length; j++){
      //     // console.log('------tour de boucle "J" numéro : ' + j)
      //     if (Number(pricearray[i]) > Number(pricearray[j])) {
      //       // console.log("pricearray[i] : " + pricearray[i] + " et pricearray[j] : " + pricearray[j]);
      //       templist[j] = pricearray[i];
      //       templist[i] = pricearray[j];
      //       pricearray[i] = templist[i];
      //       pricearray[j] = templist[j];
      //       // console.log(templist);
      //     }
      //   }
      // }
      setMyresponse(Math.max(...pricearray));
    }
  };

  useEffect(() => {
    listedeprix();
  }, [allproductslist]);

  useEffect(() => {
    selectmax();
  }, [pricearray]);

  return myresponse;
};

{
  /* *************************************************************************************************
   ************************** afficher première partie - fiche produit *******************************
   *************************************************************************************************** */
}
export const productfirstban = (id) => {
  // ---------------------- variables
  const allproductslist = useSelector((state) => state.productReducer.products);
  const magasins = useSelector((state) => state.storeReducer.allstore);
  const marques = useSelector((state) => state.marqueReducer.marque);
  const [imglist, setImglist] = useState([]);
  const defaultimage = "../image/imageicon.png";
  // récupérer le produit sélectionné par son id
  const myproductdetails =
    !isEmpty(id) &&
    allproductslist &&
    typeof allproductslist == "object" &&
    allproductslist.find((product) => product.id == id);
  // récupérer la première image
  const [imagetoshow, setImagetoshow] = useState(
    myproductdetails && myproductdetails.image01 && myproductdetails.image01
  );

  // ---------------------- fonctions
  // afficher le grid
  const imggridfunction = () => {
    const templist = [];
    let pinknumber = 0;
    for (let i = 1; i < 7; i++) {
      if (myproductdetails?.["image0" + i]) {
        pinknumber++;
        templist.push(
          myproductdetails?.["image0" + i] && (
            <div key={i} className={"gridimage0" + pinknumber}>
              <button onClick={() => changeimage(i)}>
                <img
                  src={
                    "http://localhost:8080/uploads/" +
                    myproductdetails?.["image0" + i]
                  }
                  alt="pas d'image"
                />
              </button>
            </div>
          )
        );
      }
    }
    setImglist(templist);
  };
  // changer l'image
  const changeimage = (id) => {
    setImagetoshow(myproductdetails?.["image0" + id]);
  };

  // Ouvrir le texte WYSIWYG de Editor
  const convertDraftToHtml = (rawContentSate) => {
    const contentState = convertFromRaw(rawContentSate);
    const editorState = EditorState.createWithContent(contentState);
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  // ---------------------- logiques
  useEffect(() => {
    changeimage(1);
    imggridfunction();
  }, [myproductdetails]);

  return (
    <div className="separatecol productfirstban">
      <div className="col01">
        <div className="imagegrid">
          <div className="pplimage">
            <img
              src={
                myproductdetails && myproductdetails.image01
                  ? "http://localhost:8080/uploads/" + imagetoshow
                  : defaultimage
              }
              alt={
                myproductdetails && !isEmpty(myproductdetails.nomproduit)
                  ? myproductdetails.nomproduit
                  : "coucou je suis là"
              }
            />
          </div>
          {imglist}
        </div>
      </div>

      <div className="col02">
        <h2>
          {myproductdetails && !isEmpty(myproductdetails.nomproduit)
            ? myproductdetails.nomproduit
            : ""}
        </h2>
        <div className="modaldescript">
          {myproductdetails &&
            !isEmpty(marques) &&
            myproductdetails.marque != 0 && (
              <p>
                <b> Marque : </b>{" "}
                {searchinfo(marques, myproductdetails.marque, "marque")}{" "}
              </p>
            )}
          <div>
            {myproductdetails && !isEmpty(myproductdetails.courtdescript) ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: convertDraftToHtml(
                    JSON.parse(myproductdetails.courtdescript)
                  ),
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="modaldescript">
          {myproductdetails && !isEmpty(myproductdetails.prix) ? (
            <p>Prix : {myproductdetails.prix} Ar</p>
          ) : (
            ""
          )}
          {myproductdetails &&
            !isEmpty(magasins) &&
            myproductdetails.storeid != 0 && (
              <p>
                <b> Chez </b>{" "}
                <a href={`/boutique/${myproductdetails.storeid}`}>
                  {searchinfo(magasins, myproductdetails.storeid, "nommagasin")}
                </a>{" "}
              </p>
            )}
        </div>
        <div className="modaldescript" style={{display: 'flex'}}>
          <Ajoutpanier product={myproductdetails} style={{width: '50%'}} />
          <button className="wishbutton"  style={{width: '50%'}}>Acheter plus tard</button>
        </div>
      </div>
    </div>
  );
};

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
// deuxième bannière de la page produit
export const productsecondban = (id) => {
  // ---------------------- variables
  const allproductslist = useSelector((state) => state.productReducer.products);
  const myproductdetails =
    !isEmpty(id) &&
    allproductslist &&
    typeof allproductslist == "object" &&
    allproductslist.find((product) => product.id == id);

  // ---------------------- fonctions
  const convertDraftToHtml = (rawContentSate) => {
    const contentState = convertFromRaw(rawContentSate);
    const editorState = EditorState.createWithContent(contentState);
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  return (
    <div>
      {myproductdetails && !isEmpty(myproductdetails.longdescript) ? (
        <div
          dangerouslySetInnerHTML={{
            __html: convertDraftToHtml(
              JSON.parse(myproductdetails.longdescript)
            ),
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
// page produit : PRODUITS SIMILAIRES
export const similarproducts = (id) => {
  // ---------------------- variables
  const allproductslist = useSelector((state) => state.productReducer.products);
  const myproductdetails =
    allproductslist &&
    typeof allproductslist == "object" &&
    allproductslist.find((product) => product.id == id);
  const [listofproducts, setListofproducts] = useState([]);
  const mylink = useNavigate();

  // ---------------------- fonctions
  const goto = (id) => {
    mylink("/product/" + id);
  };
  const showtheproducts = () => {
    if (allproductslist && typeof allproductslist == "object") {
      const templist = allproductslist
        .filter((product) => product.rayon == myproductdetails.rayon)
        .filter((product) => product.id != myproductdetails.id)
        .splice(0, 10)
        .map((product) => (
          <div key={product.id} className="oneproduct">
            <div className="elementscontainer">
              <div className="imgsection">
                <div className="productactions">
                  <button>Pour plus tard</button>
                  <button onClick={() => goto(product.id)}>
                    Fiche produit
                  </button>
                </div>
                <button>
                  <span className="apercu">Aperçu</span>
                  <img
                    src={`http://localhost:8080/uploads/${product.image01}`}
                    alt=""
                  />
                </button>
              </div>
              <div className="txtsection">
                <a href={`/product/${product.id}`}>
                  <h3>{product.nomproduit}</h3>
                </a>
              </div>
            </div>
          </div>
        ));
      setListofproducts(templist);
    }
  };
  // ---------------------- logiques
  useEffect(() => {
    showtheproducts();
  }, [allproductslist, id]);

  return (
    <div className="filteredproducts">
      <div className="productscontainer02">{listofproducts}</div>
    </div>
  );
};

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
// Afficher un seul produit (PROMO ??)
export const showpromo = (id, type) => {
  // ---------------------- variables
  const allproductslist = useSelector((state) => state.productReducer.products);
  const myproductdetails =
    allproductslist &&
    typeof allproductslist == "object" &&
    allproductslist.find((product) => product.id == id);
  const [producttoshow, setProducttoshow] = useState("");
  const mylink = useNavigate();

  // ---------------------- fonctions
  const goto = (id) => {
    mylink("/product/" + id);
  };
  const showmyprod = () => {
    if (myproductdetails && typeof myproductdetails == "object") {
      setProducttoshow(
        <div key={myproductdetails.id} className={"oneproduct " + type}>
          <div className="elementscontainer">
            <div className="imgsection">
              <div className="productactions">
                <button>Pour plus tard</button>
                <button onClick={() => goto(myproductdetails.id)}>
                  Fiche produit
                </button>
              </div>
              <button>
                <span className="apercu">Aperçu</span>
                <img
                  src={`http://localhost:8080/uploads/${myproductdetails.image01}`}
                  alt=""
                />
              </button>
            </div>
            <div className="txtsection" style={{ textAlign: "center" }}>
              <a href={`/product/${myproductdetails.id}`}>
                <h3>{myproductdetails.nomproduit}</h3>
              </a>
            </div>
          </div>
        </div>
      );
    }
  };
  // ---------------------- logiques
  useEffect(() => {
    showmyprod();
  }, [myproductdetails, id]);

  return producttoshow;
};

{
  /* *************************************************************************************************
   ***********************************                               ***********************************
   *************************************************************************************************** */
}
// Objet - détails de produit mis en avant
export const showpromotext = (id) => {
  // ---------------------- variables
  const allproductslist = useSelector((state) => state.productReducer.products);
  const myproductdetails =
    allproductslist &&
    typeof allproductslist == "object" &&
    allproductslist.find((product) => product.id == id);
  const magasins = useSelector((state) => state.storeReducer.allstore);
  const [producttoshow02, setProducttoshow02] = useState([]);

  // ---------------------- fonctions
  const showmyprod02 = () => {
    if (myproductdetails && typeof myproductdetails == "object") {
      setProducttoshow02([
        "Notre coup de coeur : ",
        myproductdetails.nomproduit + " ",
        "disponible chez " +
          searchinfo(magasins, myproductdetails.storeid, "nommagasin") +
          " ",
      ]);
    }
  };

  // ---------------------- logiques
  useEffect(() => {
    showmyprod02();
  }, [myproductdetails, id]);

  return producttoshow02;
};

{
  /* *************************************************************************************************
   ***********************************           PANIER              ***********************************
   *************************************************************************************************** */
}

export const addproduct = (productinfo) => {
  // -------------------
  // --------- variables
  // -------------------
  const dispatch = useDispatch();
  const allproductslist = useSelector((state) => state.productReducer.products);
  const currentcart = useSelector((state) => state.sessionReducer.panier);
  const [listid, setListid] = useState([]);
  const id = productinfo[0];
  const number = productinfo[1];
  
  // -------------------
  // --------- fonctions
  // -------------------
  // checker les produits dans panier et monter "listid" 
  const checkcart = () => {
    let templist = [];
    templist = currentcart && currentcart.map((_, i) => Number(currentcart[i].productid));
    // console.log('bref');
    setListid(templist);
  }
  
  // chercher le produit et ajouter dans panier 
  const addit = (id, number) => {
    const oneproduct = !isNaN(id) && id !== 0 && allproductslist && allproductslist.find((product) => product.id == id);
    const data = { productid: oneproduct.id, number: number };
    dispatch(addtocart(data));
    console.log("article ajouté");
  };

  const getnewnumb = (id, number) => {
    const myproduct = currentcart && currentcart.find((product) => Number(product.productid) == Number(id));
    const oldnumber = Number(myproduct.number);
    const newnumber = oldnumber + Number(number);
    console.log(newnumber);
    return newnumber;
  };

  const updatecart = (id, number) => {
    const data = { id, number };
    dispatch(addnumbtoprod(data));
    console.log("panier mis à jour");
  };
  
  const finaladd = () => {
    if (!isNaN(id) && id !== 0 && Array.from(listid) && (listid != '') && listid.length > 0) {
      if (listid.includes(Number(id))) {
        const newnumber = getnewnumb(id, number);
        updatecart(id, newnumber);
        console.log('MAJ : ' + id + ', la nouvelle quantité est : ' + newnumber);
      } else {
        addit(id, number);
        console.log('id est : ' + id + ' et number est : ' + number);
      }
    } else {
      // if (!isNaN(id) && id !== 0) {
        !isNaN(id) && id !== 0 && addit(id, number);
        !isNaN(id) && id !== 0 && console.log('PREMIER AJOUT // id est : ' + id + ' et number est : ' + number);
      // } else {
      //   console.log("ato ô");
      //   return;
      // }
    }
  }
 

  // -------------------
  // ---------- logiques
  // -------------------
  // charger le panier
  useEffect(() => {
    checkcart();
    id && console.log(currentcart);
  }, [currentcart]);

  useEffect(() => {
    finaladd();
  }, [productinfo]);

  // return;
};


{
  /* *************************************************************************************************
   ******************************       Ajouter Wishlist         *****************************
   *************************************************************************************************** */
}


export const addtowishlist = (id) => {
  // variables
  const dispatch = useDispatch();
  const [listofwish, setListofwish] = useState([]);
  const allproductslist = useSelector((state) => state.productReducer.products);
  const currentwishlist = useSelector((state) => state.mywishlist.wishlist);
  // const currentwish = currentwishlist && currentwishlist.find((wish) => wish.id == id);

  // fonctions
  const checkwishlist = () => {
    const templist = currentwishlist && currentwishlist.map((_, i) => (
      Number(currentwishlist[i].id)
    ));
    setListofwish(templist);
  }

  const addit = (id) => {
    const myproduct = !isNaN(id) && id != 0 && allproductslist && allproductslist.find((product => product.id == id));
    const data = {id : Number(myproduct.id), quantity : 1}
    dispatch(addittowish(data));
    console.log(myproduct.nomproduit + " a été ajouté dans la wishlist");
  }

  const addawish = () => {
    const templist = [];
    console.log(listofwish);
    
    if (!isNaN(id) && id != 0 && listofwish && listofwish.length > 0) {
      // if (listofwish.includes(id)) {
      //   console.log('efa ato');
      //   console.log(listofwish);
      // } else {
      //   addit(id);
      //   console.log('izay vao tafiditra');
      // }
    console.log(listofwish);
    } else {
      id != 0 ? addit(id) : 'still no id' ;
    }
    setListofwish(templist);
  }
 
  // variables
  useEffect(() => {
    checkwishlist();
  }, [currentwishlist]);

  useEffect(() => {
    addawish();
  }, [id]);

  // alert(id);
}
{
  /* *************************************************************************************************
   ******************************       First display - Panier           *****************************
   *************************************************************************************************** */
}
export const cartfirstpart = () => {
  // -------------------
  // --------- variables
  // -------------------
  const dispatch = useDispatch();
  const currentcart = useSelector((state) => state.sessionReducer.panier);
  const allproductslist = useSelector((state) => state.productReducer.products);
  const magasins = useSelector((state) => state.storeReducer.allstore);
  const marques = useSelector((state) => state.marqueReducer.marque);
  const [listedeproduits, setListedeproduits] = useState([]);
  const [totaldeprix, setTotaldeprix] = useState(0);
  const [prodprice, setProdprice] = useState([]);

  // -------------------
  // --------- fonctions
  // -------------------

  // séparateur de milliers
  const numStr = (a, b) => {
    a = '' + a;
    b = b || ' ';
    var c = '',
        d = 0;
    while (a.match(/^0[0-9]/)) {
      a = a.substr(1);
    }
    for (var i = a.length-1; i >= 0; i--) {
      c = (d != 0 && d % 3 == 0) ? a[i] + b + c : a[i] + c;
      d++;
    }
    return c;
  }
  
  // noms de variables
  const setprices = () => {
    let templist = [];
    for (let i = 0; i < currentcart.length; i++){
      templist.push(Number(searchinfo(allproductslist, currentcart[i].productid, 'prix')));
    }
    setProdprice(templist);
  }

  
  const [quantity, setQuantity] = useState([]);
  const [currentprice, setCurrentprice] = useState();

  // contenu du panier
  const cartcontent = () => {
    let tempttl = 0;
    let tempqtt = [];
    const templist = allproductslist && currentcart && currentcart.map((product, index) => {

      tempqtt.push(Number(product.number));
      let productprice = (tempqtt[index] * searchinfo(allproductslist, product.productid, 'prix'));
      tempttl += productprice;
      
      
      return(
        <tr key={product.productid}>
          <td>N° 0{index}</td>

          {/* ********* Nom du produit ********* */}
          <td>{searchinfo(allproductslist, product.productid, 'nomproduit')}</td>

          {/* ********* Quantité de produits dans le panier ********* */}
          <Cartcontent quantity={tempqtt[index]} id={product.productid} index={index} />

          {/* ********* Prix du produit ********* */}
          <td style={{ textAlign: 'right' }}>{numStr(searchinfo(allproductslist, product.productid, 'prix'))} Ar</td>
          
          {/* ********* Total de prix par ligne ********* */}
          <td style={{ textAlign: 'right' }}>{numStr(productprice)} Ar</td>
          
          {/* ********* Enlever le produit du panier ********* */}
          <button onClick={() => dispatch(removeformcart(product.productid))} className="myfontawesome"><i className="fa fa-trash-alt"></i></button>
        </tr>
      )
    });
    setQuantity(tempqtt);
    setTotaldeprix(tempttl);
    setListedeproduits(templist);

  }


  // -------------------
  // ---------- logiques
  // -------------------
  // afficher le contenu du cart
  useEffect(() => {
    cartcontent();
    setprices ();
  }, [currentcart]);

  return(
    <table>
      <thead style={{ fontWeight: 'bold', textAlign: 'center' }}>
        <tr>
          <th>Numéro</th>
          <th>Désignation</th>
          <th>Quantité</th>
          <th>Prix unitaire</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {listedeproduits}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>Total</td>
          <td style={{fontWeight: 'bold', textAlign: 'center'}}>{ numStr(totaldeprix) } Ar</td>
        </tr>
      </tbody>
    </table>
  )

}

