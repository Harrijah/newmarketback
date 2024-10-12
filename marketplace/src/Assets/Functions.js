import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "./Utils";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";

// Rapidsearch modal
export const rapidsearchmodal = (clientsearchvalue, setRapidsearch) => {
  if (clientsearchvalue != '') {
      setRapidsearch(true);
      document.body.style.overflow = 'hidden';
  } else {
      setRapidsearch(false);
      document.body.style.overflow = 'auto';
  }
}

// join un par un
export const searchinfo = (base, id, request) => {
  const tempinfo = (!isEmpty(base) && typeof(base) == "object") && base.find((info) => info.id == id);
  if (tempinfo && request in tempinfo) {
      return (<span>{tempinfo[request]}</span>)
  } else {
      return ('');
  }
} 

// retourne la liste de tous les rayons
export const rayonsgen = () => {
  const [myrayons, setMyrayons] = useState([]);
  const rayonlist = useSelector((state) => state.rayonReducer.rayon);

  useEffect(() => {
    if (typeof(rayonlist) == 'object') {
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
  }

  // Créer un array de rayons à partir de la liste des id trouvés dans le tableau "Temprayonslist"
  const createraylist = () => {
    if (temprayonsliste && rayonlist) {
      temprayonsliste.forEach((id) => {
        const testray = rayonlist.find((rayon) => rayon.id == id);
        secondrayon.push(testray);
      });
      setTemprayons(secondrayon);
    }
  }

  // mapper le tableau de rayons dans un array d'<option></option>
  const rayshortlist = () => {
    if (temprayons != "") {
      const listtemp = temprayons && Array.from(temprayons).map((item, index) => (
            <option key={item.id || index} value={item.id}>
              {item.rayon}
            </option>
          )
        );
        setFinalrays(listtemp);
      }
  }

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

// choisir un rayon
export const rayonchoice = (e) => {
  const [rayonselect, setRayonselect] = useState(0);
  setRayonselect(e.target.value);
  return rayonselect;
};

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

// retourne la liste des catégories où il y a des produits
export const filteredcategorygen = (rayonselect) => {
  const allproductslist = useSelector((state) => state.productReducer.products);
  const allcategories = useSelector((state) => state.categorieReducer.categorie);
  const [filteredcategory, setFilteredcategory] = useState([]);
  const [categorylist, setCategorylist] = useState([]);
  const [tableauid, setTableauid] = useState([]);
  const categorieid = [];
  const temptableau = [];

  // Sortir un tableau d'id de catégories sans les doublons => ceux qui contiennent uniquement un produit
  useEffect(() => {
      if (allproductslist != '') {
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
      if (tableauid != '') {
          tableauid.forEach(cat => {
              temptableau.push(allcategories.find((categorie) => (categorie.id == cat)));
          });
          setCategorylist(temptableau);
          // console.log(temptableau);
      }
  }, [allproductslist, allcategories, rayonselect]);
  
  useEffect(() => {
      const templist = Array.from(categorylist).filter((category) => category.idrayon == rayonselect).map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.categorie}</option>
      ))
      setFilteredcategory(templist);
  }, [categorylist]);
  return filteredcategory;
}

// retourne la liste des sous-catégories
export const souscatgen = (rayonselect, rayonlist, categorielist, categorieselect) => {
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
    if (templist != '') {
      setSouscatlist(templist);
    }
  }, [souscategorie, categorieselect, categorielist, rayonselect, rayonlist]);
    
  return souscatlist;
};

// retourne la liste des sous-catégories dans lesquelles il y a un produit
export const finalsouscatgen = (rayonselect, rayonlist, categorielist, categorieselect, filteredcategory) => {
  const allproductslist = useSelector((state) => state.productReducer.products);
  const allsouscat = useSelector((state) => state.souscatReducer.souscat);
  const [souscat02, setSouscat02] = useState([]);
  const [finalsouscat, setFinalsoucat] = useState();
  const idlist01 = [];
  const malistesouscat = [];
  
  // lister les sous-catégories dans un tableau en enlevant les doublons
  useEffect(() => {
      if(allproductslist != ''){
          for (let i = 0; i < allproductslist.length; i++){
              let doublon = false;
              for (let j = 0; j < idlist01.length; j++){
                  if (allproductslist[i].souscategorie == idlist01[j]) {
                      doublon = true;
                      break;
                  }
              }
              if (!doublon && allproductslist[i].souscategorie != '0') {
                  idlist01.push(allproductslist[i].souscategorie);
                  
              }
          }
      }
      const tempsouscat = [];
      if (idlist01 != '' && allsouscat) {
          idlist01.forEach(idtrouve => {
              tempsouscat.push(allsouscat.find((souscat) => (souscat.id == idtrouve)));
          });
          setSouscat02(tempsouscat);            
      }
  }, [allproductslist, filteredcategory]);

  useEffect(() => {
      if (souscat02 != '') {
          setFinalsoucat(
              souscat02.filter((cat) => cat.idcategorie == categorieselect).map((souscat) => (
                  <option key={souscat.id} value={souscat.id}>{souscat.souscategorie}</option>
              ))
          );
      }
  }, [categorieselect]);
  return finalsouscat;
}

// Retourner la liste de marques
export const marqueselect = (rayonselect) => {
  // variables
  const marques = useSelector((state) => state.marqueReducer.marque);
  const [brandlist, setBrandlist] = useState([]);

  // fonctions
  const marqueliste = () => {
    const templist = marques && typeof (marques) == 'object' && marques.filter((marque) => marque.idrayon == rayonselect).map((marque) => (
      <option key={marque.id} value={marque.id}>{marque.marque}</option>
    ));
    setBrandlist(templist);
  }

  // logiques
  useEffect(() => {
    marqueliste();
  }, [marques, rayonselect]);

  return brandlist;
}

export const magasinselect = (rayonselect) => {
  // variables
  const magasins = useSelector((state) => state.storeReducer.allstore);
  const [magasinlist, setMagasinlist] = useState([]);

  // fonctions
  const storelist = () => {
    const templist = magasins && typeof (magasins) == 'object' && magasins.filter((magasin) => Number(magasin.categorie) == Number(rayonselect)).map((magasin) => (
      <option key={magasin.id} value={magasin.id}>{magasin.nommagasin}</option>
    ));

    setMagasinlist(templist);
  }

  // logiques
  useEffect(() => {
    storelist();
    // console.log(magasinlist);
  }, [magasins, rayonselect]);

  return magasinlist;
}

// chercher le prix le plus élevé dans une sélection
export const findmaxprice = () => {
  const [pricearray, setPricearray] = useState([]);
  const allproductslist = useSelector((state) => state.productReducer.products);
  // sortir un array de liste de prix
  const listedeprix = () => {
    const templist = [];
    if (!isEmpty(allproductslist) && typeof(allproductslist) != 'string') {
      allproductslist.forEach(product => {
          templist.push(product.prix);
      });
      setPricearray(templist);
    }
  }

  // sélectionner le prix le plus haut
  const [myresponse, setMyresponse] = useState('');
  
  const selectmax = () => {
    
    if (!isEmpty(pricearray) && typeof (pricearray) == 'object') {
      const templist = [...pricearray];
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
    };
  }

  useEffect(() => { 
    listedeprix();
  }, [allproductslist]);

  useEffect(() => {
    selectmax();
  }, [pricearray]);
  
   return myresponse;
}

// afficher première partie - fiche produit

export const productfirstban = (id) => {
  // ---------------------- variables
  const allproductslist = useSelector((state) => state.productReducer.products);
  const magasins = useSelector((state) => state.storeReducer.allstore);
  const marques = useSelector((state) => state.marqueReducer.marque);
  const [imglist, setImglist] = useState([]);
  const defaultimage = '../image/imageicon.png';
  // récupérer le produit sélectionné par son id
  const myproductdetails = !isEmpty(id) && allproductslist && typeof (allproductslist) == 'object' && allproductslist.find((product) => product.id == id); 
  // récupérer la première image
  const [imagetoshow, setImagetoshow] = useState(myproductdetails && myproductdetails.image01 && myproductdetails.image01);

  // ---------------------- fonctions
  // afficher le grid
  const imggridfunction = () => {
    const templist = [];
    let pinknumber = 0;
    for (let i = 1; i < 7; i++){
      if (myproductdetails?.['image0' + i]) {
        pinknumber++;
        templist.push(
          myproductdetails?.['image0'+i] && <div key={i} className={"gridimage0" + pinknumber}>
            <button onClick={() => changeimage(i)}>
              <img src={'http://localhost:8080/uploads/' + myproductdetails?.['image0' + i]} alt="pas d'image" />
            </button>
          </div>
        )
      }
    }
    setImglist(templist);
  }
  // changer l'image
  const changeimage = (id) => {
    setImagetoshow(myproductdetails?.['image0'+id]);
  }

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
            <img src={
              myproductdetails && myproductdetails.image01 ? ('http://localhost:8080/uploads/' + imagetoshow) :
              defaultimage
            }
              alt={myproductdetails && !isEmpty(myproductdetails.nomproduit) ? myproductdetails.nomproduit : 'coucou je suis là'
              } />
          </div>
          {imglist}
        </div>
      </div>

      <div className="col02">
        <h2>{ myproductdetails && !isEmpty(myproductdetails.nomproduit) ? myproductdetails.nomproduit : ''}</h2>
        <div className="modaldescript">
          {
            myproductdetails && !isEmpty(marques) && (myproductdetails.marque != 0) && <p><b> Marque : </b> {searchinfo(marques, myproductdetails.marque, 'marque')} </p> 
          }
          <div>{myproductdetails && !isEmpty(myproductdetails.courtdescript) ? <div dangerouslySetInnerHTML={{ __html: convertDraftToHtml(JSON.parse(myproductdetails.courtdescript)) }} /> : ''}</div>
        </div>
        <div className="modaldescript">
          {myproductdetails && !isEmpty(myproductdetails.prix) ? <p>Prix : {myproductdetails.prix} Ar</p> : ''}
          {
            myproductdetails && !isEmpty(magasins) && (myproductdetails.storeid != 0) && <p><b> Chez </b> {searchinfo(magasins, myproductdetails.storeid, 'nommagasin')} </p> 
          }
        </div>
      </div>
    </div>
  );
}


