import React, { useEffect, useRef, useState } from "react";
import Bomagasin from "../Components/Bomagasin";
import Boproducts from "../Components/Boproducts";
import Bocommands from "../Components/Bocommands";
import Navigation from "../template-parts/Navigation";
import Footer from "../template-parts/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Boban from "../Components/Boban";
import Rightmaincontent from "../Components/Rightmaincontent";
import Bocol from "../Components/Bocol";
import Leftlateralcolumn from "../Components/Leftlateralcolumn";
import { isEmpty } from "../Assets/Utils";
import { getstoredata } from "../action/store.action";


// CSS : pages/_backoffice.scss
const Backoffice = () => {
    const [mychoice, setMychoice] = useState('magasin');
    const isConnected = useSelector((state) => state.createaccountReducer.isConnected);
    const navigate = useNavigate();
    const userdata = useSelector((state) => state.createaccountReducer.user);
    const storedata = useSelector((state) => state.storeReducer.store);
    const Products = useSelector((state) => state.productReducer.products);
    const allproductslist = useSelector((state) => state.productReducer.products);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const marques = useSelector((state) => state.marqueReducer.marques);
    const User = useSelector((state) => state.createaccountReducer.user);

    /* ********************************************
    **** Afficher les produits dans Backoffice ****
    ******************************************** */
    const [myprodlist, setMyprodlist] = useState([]);
    const premyproducts = [];
    
    // les boutons du leftcol
    const bobutton = [
        {
            button: 'magasin',
            text: 'A propos du magasin'
        },
        {
            button: 'products',
            text: 'Produits'
        },
        {
            button: 'commands',
            text: 'Commandes'
        },
    ];

    const myproducts = () => {
        if (!isEmpty(Products)) {
            for (let i = 0; i < Products.length; i++) {
                if (!isEmpty(Products) && Products[i].storeid == storedata.id) {
                    premyproducts.push(Products[i]);
                }
            }
        };

        // const premyproducts = !isEmpty(Products) && Products.filter((chosen) => chosen.storeid == storedata.id);
        setMyprodlist(premyproducts);
        // return myprodlist; // Retourner la liste filtrée}
    }
    // Si n'est pas connecté, alors renvoie à la page d'accueil <= MBOLA TSY MANDEHA
    useEffect(() => {
        !isConnected && navigate('/');
        !isEmpty(User) ? dispatch(getstoredata(User.id)) : '';
        // sessionStorage.getItem('user');

    }, [isConnected, navigate, User]);

    useEffect(() => { 
        if (!isEmpty(Products)) {
            myproducts();
        }
    }, [Products]);
    

    
    // Définit le contenu (Composant) à afficher dans le backoffice
    let content;
    switch (mychoice) {
        case 'magasin':
            content = <Bomagasin userdata={userdata} storedata={storedata} />
            break;
        case 'products':
            content = <Boproducts userdata={userdata} storedata={storedata} productslist={!isEmpty(Products) && Products ? myprodlist : ''} />
            break;
        case 'commands':
            content = <Bocommands />
            break;
        default:
            content = <Bomagasin userdata={userdata} storedata={storedata} />
            break;
    }

    // Si n'est pas connecté, alors renvoie à la page d'accueil
    useEffect(() => {
        !isConnected && navigate('/');
    }, [isConnected, navigate]);

    const leftColumnRef = useRef(null);
    const rightContentRef = useRef(null);

    useEffect(() => {
        const leftColumnHeight = rightContentRef.current.getBoundingClientRect().height;
        leftColumnRef.current.style.minHeight = `${leftColumnHeight}px`;
    }, [mychoice])

    return (
        <div className="container">
            <Navigation allproductslist={allproductslist} magasins={magasins} marques={marques} />
            <Boban />
            <Leftlateralcolumn leftColumnRef={leftColumnRef} button={ <Bocol setMychoice={setMychoice} mychoice={mychoice} bobutton={bobutton} /> } />
            <Rightmaincontent rightContentRef={rightContentRef}  content={content}/>
            <Footer />
        </div>
    ) 
}

export default Backoffice;