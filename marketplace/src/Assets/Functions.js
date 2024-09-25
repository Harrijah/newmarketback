import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "./Utils";


// join un par un
export const searchinfo = (base, id, request) => {
  const tempinfo = !isEmpty(base) && Array.from(base).find((info) => info.id == id);
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
    const templist = Array.from(rayonlist).map((rayon) => (
      <option key={rayon.id} value={rayon.id}>
        {rayon.rayon}
      </option>
    ));
    if (rayonlist) {
      setMyrayons(templist);
    }
  }, [rayonlist]);
  return myrayons;
};

// retourne les rayons auxquels des produits sont rattachés
export const rayongen = () => {
  const rayonlist = useSelector((state) => state.rayonReducer.rayon);
  const [finalrays, setFinalrays] = useState([]);
  const [temprayonsliste, setTemprayonsliste] = useState([]);
  const [temprayons, setTemprayons] = useState([]);
  const allproductslist = useSelector((state) => state.productReducer.products);
  const templist = [];
  const secondrayon = [];

  useEffect(() => {
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
    setTemprayonsliste(templist);
    if (temprayonsliste) {
      temprayonsliste.forEach((id) => {
        const testray = rayonlist.find((rayon) => rayon.id == id);
        secondrayon.push(testray);
      });
      setTemprayons(secondrayon);
    }
  }, [allproductslist, rayonlist]);

  useEffect(() => {
    if (temprayons != "") {
      const listtemp =
        temprayons &&
        Array.from(temprayons).map((item) => (
          <option key={item.id} value={item.id}>
            {item.rayon}
          </option>
        ));
      setFinalrays(listtemp);
    }
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
        if (idlist01 != '') {
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
