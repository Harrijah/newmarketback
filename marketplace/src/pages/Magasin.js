import React, { useEffect, useRef, useState } from "react";
import Navigation from "../template-parts/Navigation";
import { useDispatch, useSelector } from "react-redux";
import Boban from "../Components/Boban";
import Leftlateralcolumn from "../Components/Leftlateralcolumn";
import Rightmaincontent from "../Components/Rightmaincontent";
import { searchinfo } from "../Assets/Functions";
import Magasincol from "../Components/Magasincol";
import { isEmpty } from "../Assets/Utils";

// css : './pages/_magasin.scss'
const Magasin = () => {

    // -------------------------------- variables
    const dispatch = useDispatch();
    const allproductslist = useSelector((state) => state.productReducer.products);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const marques = useSelector((state) => state.marqueReducer.marques);
    const categories = useSelector((state) => state.categorieReducer.categorie);
    const rayons = useSelector((state) => state.rayonReducer.rayon);
    const [monrayon, setMonrayon] = useState('');
    const leftColumnRef = useRef(null);
    const rightContentRef = useRef(null);
    const [tableaumagasin, setTableaumagasin] = useState([]);
    const defaultimage = './image/imageicon.png';

    // -------------------------------- fonctions
    
    useEffect(() => {
        const leftColumnHeight = rightContentRef.current.getBoundingClientRect().height;
        leftColumnRef.current.style.minHeight = `${leftColumnHeight}px`;
    }, []);

    // sortir la liste des magasins
    const listemagasins = () => {
        const templist = !isEmpty(rayons) && magasins
            .filter((magasin) => monrayon == 0 || magasin.categorie == monrayon)
            .map((magasin) => (
                <div key={magasin.id} className="productbox">
                    <div className="elementscontainer">

                        <div className="imgsection">
                            <img src={defaultimage} alt={magasin.nommagasin} />
                        </div>
                        <div className="txtsection">
                            <div>
                                <a href=""><h3>{magasin.nommagasin}</h3></a>
                            </div>
                            <div className="otherdetails">
                                <div>
                                    {(magasin.categorie != 0) && 'Catégorie: '}
                                    {(magasin.categorie != 0) ? searchinfo(rayons, magasin.categorie, 'rayon') : ''}
                                </div>
                                <div>Adresse : { magasin.adresse }</div>
                                <div>Tél :{ magasin.phone }</div>
                            </div>
                        </div>
                    </div>
                </div>
            ));
        
            setTableaumagasin(templist);
        // return tableaumagasin;
    }
    // mettre la liste de magasin dans un div
    let content = (
        <div className="productslister">
            <h1 className="magasin">Liste des magasins</h1>
            <div className="filteredproducts">
                <div className="productscontainer">
                    {tableaumagasin}
                </div>
            </div>
        </div>
    );
    


    // -------------------------------- logiques
    useEffect(() => {
        listemagasins();
    }, [rayons, magasins, monrayon]);

    return (
        <div className="container">
            <Navigation allproductslist={allproductslist} magasins={magasins} marques={marques} />
            <Boban />
            <Leftlateralcolumn leftColumnRef={leftColumnRef} button={<Magasincol setMonrayon={setMonrayon} />} />
            <Rightmaincontent rightContentRef={rightContentRef} content={content} />
            

        </div>
    )
}

export default Magasin;