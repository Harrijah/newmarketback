import React, { useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navigation from "../template-parts/Navigation";
import Footer from "../template-parts/Footer";
import Aboutme from "../Components/Aboutme";
import Mywishlist from '../Components/Mywishlist';
import Mesachats from "../Components/Mesachats";
import Panier from "../Components/Panier";
import Espacepro from "../Components/Espacepro";
import Topban from "../Components/Topban";
import Leftlateralcolumn from "../Components/Leftlateralcolumn";
import Rightmaincontent from "../Components/Rightmaincontent";
import { getstoredata } from "../action/store.action";
import { isEmpty } from "../Assets/Utils";
import Bocol from "../Components/Bocol";


// css : /pages/_moncompte.scss
const Moncompte = () => {
    // -------------------
    // --------- variables
    // -------------------
    const [mychoice, setMychoice] = useState('moi');
    const isConnected = useSelector((state) => state.createaccountReducer.isConnected);
    const User = useSelector((state) => state.createaccountReducer.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allproductslist = useSelector((state) => state.productReducer.products);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const marques = useSelector((state) => state.marqueReducer.marques);
    // const User = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : '';
    // les boutons MENU du leftcol
    const bobutton = [
        {
            button: 'moi',
            text: "Mes informations",
        },
        {
            button: 'mywishlist',
            text: 'Liste de souhaits'
        },
        {
            button: 'monpanier',
            text: 'Mon panier'
        },
        {
            button: 'mesachats',
            text: 'Historique d\'achat',
        },
        {
            button: 'espacepro',
            text: 'Espace pro'
        }
    ];
    // Ajuster la longueur des colonnes laterales et principales
    const leftColumnRef = useRef(null);
    const rightContentRef = useRef(null);
    // Définit le contenu (Composant) à afficher dans le backoffice
    let content;
    
    // -------------------
    // --------- fonctions
    // -------------------
    switch (mychoice) {
        case 'moi':
            content = <Aboutme aboutUser={User} />
            break;
        case 'mywishlist':
            content = <Mywishlist />
            break;
        case 'monpanier':
            content = <Panier />
            break;
        case 'mesachats':
            content = <Mesachats />
            break;
        case 'espacepro':
            content = <Espacepro />
            break;
        default:
            content = <Aboutme />
            break;
    }

    // -------------------
    // --------- logiques
    // -------------------
    // Si n'est pas connecté, alors renvoie à la page d'accueil
    useEffect(() => {
        !isConnected && navigate('/');
        !isEmpty(User) ? dispatch(getstoredata(User.id)) : '';
        // sessionStorage.getItem('user');

    }, [isConnected, navigate, User]);

    useEffect(() => {
        const leftColumnHeight = rightContentRef.current.getBoundingClientRect().height;
        leftColumnRef.current.style.minHeight = `${leftColumnHeight}px`;
    }, [mychoice]);

    return (
        <div className="container">
            <Navigation allproductslist={allproductslist} magasins={magasins} marques={marques}  />
            <Topban user={User} />
            <Leftlateralcolumn leftColumnRef={leftColumnRef} button={ <Bocol setMychoice={setMychoice} mychoice={mychoice} bobutton={bobutton} /> } />
            <Rightmaincontent rightContentRef={rightContentRef} content={content} />
            <Footer />
        </div>
    )
}

export default Moncompte;