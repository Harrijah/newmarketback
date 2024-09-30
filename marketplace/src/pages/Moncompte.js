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
import Mccol from "../Components/Mccol";
import { getstoredata } from "../action/store.action";
import { isEmpty } from "../Assets/Utils";


// css : /pages/_moncompte.scss
const Moncompte = () => {
    const [mychoice, setMychoice] = useState('moi');
    const isConnected = useSelector((state) => state.createaccountReducer.isConnected);
    const User = useSelector((state) => state.createaccountReducer.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allproductslist = useSelector((state) => state.productReducer.products);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const marques = useSelector((state) => state.marqueReducer.marques);
    

    // const User = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : '';

    // Si n'est pas connecté, alors renvoie à la page d'accueil
    useEffect(() => {
        !isConnected && navigate('/');
        !isEmpty(User) ? dispatch(getstoredata(User.id)) : '';
        // sessionStorage.getItem('user');

    }, [isConnected, navigate, User]);

    
    // Définit le contenu (Composant) à afficher dans le backoffice
    let content;
    
    switch (mychoice) {
        case 'moi':
            content = <Aboutme aboutUser={User} />
            break;
        case 'mywishlist':
            content = <Mywishlist />
            break;
        case 'mesachats':
            content = <Mesachats />
            break;
        case 'monpanier':
            content = <Panier />
            break;
        case 'espacepro':
            content = <Espacepro />
            break;
        default:
            content = <Aboutme />
            break;
    }

    // Ajuster la longueur des colonnes laterales et principales
    const leftColumnRef = useRef(null);
    const rightContentRef = useRef(null);

    useEffect(() => {
        const leftColumnHeight = rightContentRef.current.getBoundingClientRect().height;
        leftColumnRef.current.style.minHeight = `${leftColumnHeight}px`;
    }, [mychoice]);

    return (
        <div className="container">
            <Navigation allproductslist={allproductslist} magasins={magasins} marques={marques}  />
            <Topban user={User} />
            <Leftlateralcolumn leftColumnRef={leftColumnRef} button={ <Mccol setMychoice={setMychoice} mychoice={mychoice} /> } />
            <Rightmaincontent rightContentRef={rightContentRef} content={content} />
            <Footer />
        </div>
    )
}

export default Moncompte;