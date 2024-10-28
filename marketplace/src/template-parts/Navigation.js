import React, {useEffect, useRef, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { connectUser, connectuseraction, disconnectUser } from '../action/createaccount.action';
import { createUser } from '../action/createaccount.action';
import Showproductmodal from '../Components/Showproductmodal';
import { showMyproduct } from '../action/showproduct.action';
import { getOneproduct } from '../action/produit.action';
import { isEmpty } from '../Assets/Utils';
import { modalposition } from '../action/position.action';
import { rapidsearchmodal, searchinfo, addproduct, searchresult } from '../Assets/Functions';
import Productbox from '../Components/Productbox';
import Paniermodal from '../Modules/Paniermodal';


// CSS : template-parts/_navigation.scss
const Navigation = ({allproductslist, magasins, marques}) => {
    
    // Redux => Session connectée ou non
    const isConnected = useSelector((state) => state.createaccountReducer.isConnected);

    const navigate = useNavigate();
    const closeSession = () => {
        dispatch(disconnectUser());
    }

    // Montrer le modal de connexion utilisateur
    const connectmyuser = useSelector((state) => state.createaccountReducer.connectmyuser);
    
    const connectuser = () => {
        dispatch(connectuseraction(true));
    }

    // Toggle modal-content : create ou connect
    const [createorconnect, setCreateorconnect] = useState(true);
    const createaccount = () => {
        setCreateorconnect(!createorconnect);
    }

    // Cacher le modal de connexion utilisateur
    const hidemodal = (e) => {
        if (e.target.className == 'modal') {
            dispatch(connectuseraction(false));
        }
    }

    // Création d'un nouveau compte
    const connectuserform = useRef();
    // Future validation de formulaire de connexion
    const connectme = (e) => {
        e.preventDefault();
        dispatch(connectuseraction(false));
        const data = {
            email: connectuserform.current[0].value,
            pwd: connectuserform.current[1].value,
        }
        dispatch(connectUser(data));
    }
    
    // Création d'un nouveau compte
    const createaccountform = useRef();
    function newaccount(e) {
        e.preventDefault();
        const data = {
            role: createaccountform.current[0].value,
            niveau: createaccountform.current[1].value,
            nom: createaccountform.current[2].value,
            prenom: createaccountform.current[3].value,
            email: createaccountform.current[4].value,
            pwd: createaccountform.current[5].value,
            adresse: createaccountform.current[7].value,
            ville: createaccountform.current[8].value,
            codepostal: createaccountform.current[9].value,
            pays: createaccountform.current[10].value,
            telephone: createaccountform.current[11].value,
            createdat: createaccountform.current[12].value,
            updatedat: createaccountform.current[13].value,
        };
        dispatch(createUser(data));
        setAccountcreated(true);
    }


    // Intérieur du modal
    let contenttodisplay;
    const [accountcreated, setAccountcreated] = useState(false);
    createorconnect ?
        contenttodisplay = (
            <>
                <div className="modal-header">
                    <h2>Connexion</h2>
                </div>
                <div className="modal-body">
                    <div className="formcontainer">
                        <form ref={connectuserform}>
                            <input type="email" name="email" id="email" />
                            <input type="password" name="pwd" id="pwd" />
                            <input type="submit" value="Valider" onClick={(e) => connectme(e)} />
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={createaccount} className='linkbutton'>Créer un compte</button>
                </div>
            </>
        ) : (
        contenttodisplay =
            accountcreated ? (
                <>
                    <div className="modal-header">
                        <h2>Félicitations, votre compte a été créé !</h2>
                    </div>
                    <div className="modal-body">
                        <p>Vous pouvez maintenant vous connecter, en cliquant sur le bouton ci-dessous.</p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={createaccount} className='linkbutton'>Se connecter</button>
                    </div>
                
                </> 
            
            ) : (
                <>
                    <div className="modal-header">
                        <h2>Créer un compte</h2>
                    </div>
                    <div className="modal-body">
                        <div className="formcontainer">
                            <form ref={createaccountform}>
                                <input type='hidden' name='role' value='client' />
                                <input type='hidden' name='niveau' value='1' />
    
                                <input type='text' name='nom' id='nom' placeholder='Votre nom' />
    
                                <input type='text' name='prenom' id='prenom' placeholder='Votre prénom' />
    
                                <input type="email" name='email' id='email02' placeholder='Votre email, ici' />
    
                                <input type="password" name="pwd" id="pwd" placeholder='Votre mot de passe' />
    
                                <input type="password" name="pwdconfirm" id="pwdconfirm" placeholder='Confirmez votre mot de passe' />
                                
                                <input type='hidden' name='adresse' id='adresse' value='' />
                                <input type='hidden' name='ville' id='ville' value='' />
                                <input type='hidden' name='codepostal' id='codepostal' value='' />
                                <input type='hidden' name='pays' id='pays' value='' />
                                <input type='hidden' name='telephone' id='telephone' value='' />
                                <input type='hidden' name='createdat' id='createdat' value={Date()} />
                                <input type='hidden' name='updatedat' id='updatedat' value='' />
                                
                                <input type="submit" onClick={(e) => newaccount(e)} value="Valider" />
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={createaccount} className='linkbutton'>Se connecter</button>
                    </div>
                </>
            )
        );
    
    
    // ------------------------------------------  Montrer modal produit
    const [productpreview, setProductpreview] = useState(false);
    const [cartpreview, setCartpreview] = useState(false);
    const producttoshow = useSelector((state) => state.showproductReducer.producttoshow);
    const [dispatchproductdetails, setDispatchproductdetails] = useState(null);
    const productdetails = useSelector((state) => state.productReducer.myproduct);
    
    // Position modal
    const modaly = useSelector((state) => state.positionReducer.position);
    const [myy, setMyy] = useState(0);
    const hideproductmodal = (e) => {
        e.target.className == "modal" && dispatch(showMyproduct(0));
    }    

    // Modal panier
    const currentcart = useSelector((state) => state.sessionReducer.panier);
    const hidecartmodal = (e) => {
        e.target.className == 'modal' && setCartpreview(false);
    }
    
    // variables
    const [filteredproductlist, setFilteredproductlist] = useState([]);
    const defaultimage = './image/imageicon.png';
    
    const [rapidsearch, setRapidsearch] = useState(false);
    const [clientsearchvalue, setClientsearchvalue] = useState('');
    const dispatch = useDispatch();
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    // ------------------------------------------- fonctions
    const toppanier = (e) => {
        document.body.style.overflow = 'hidden';
        setCartpreview(true);
    }
    // communiquer la position-Y pour le modal
    const showaproduct = (e, id) => {
        setClientsearchvalue('');
        dispatch(showMyproduct(id));
        dispatch(modalposition(e.pageY - e.clientY));  
    }
    
    // panier
    const mylink = useNavigate();
    const goto = (id) => {
        mylink(id);
    }



    // afficher le résultat de recherche avec la liste des produits
    useEffect(() => {
        if (typeof(allproductslist) == 'object') {
            const templist = allproductslist && allproductslist
                .filter((product) => clientsearchvalue ? removeAccents(product.nomproduit.toLowerCase()).includes(clientsearchvalue)
                    // || removeAccents(product.courtdescript.toLowerCase()).includes(clientsearchvalue)
                    : true)      
                    .map((product, index) => (  
                        <Productbox key={product.id} product={product} index={index} goto={goto} showaproduct={showaproduct} searchinfo={searchinfo} marques={marques} magasins={magasins} isEmpty={isEmpty}/>
                        ) 
                    );             
          setFilteredproductlist(templist);
        }
        rapidsearchmodal(clientsearchvalue, setRapidsearch);
    }, [allproductslist, clientsearchvalue]);


    // ------------------------------------ logiques
    useEffect(() => {
        setMyy(modaly);
    }, [modaly]);

    useEffect(() => {
        if (productpreview) {
            document.body.style.overflow = 'hidden';
        }
    }, [productpreview]);

    // mettre le modal en pleine page
    useEffect(() => {
        if (connectmyuser) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [connectmyuser]);
    
    // mettre le modal - CART - en pleine page
    useEffect(() => {
        if (cartpreview) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [connectmyuser]);
    
    useEffect(() => {
        if (producttoshow) {
            if (productdetails) {
                setDispatchproductdetails(productdetails);
                setProductpreview(true);
            } else {
                dispatch(getOneproduct(producttoshow));
            }
        } else {
            if (productdetails) {
                setProductpreview(false);
                dispatch(getOneproduct(0));
                dispatch(showMyproduct(0));
                setDispatchproductdetails("");
                document.body.style.overflow = 'auto';
            } else {
                setProductpreview(false);
                dispatch(showMyproduct(0));
                setDispatchproductdetails("");
                document.body.style.overflow = 'auto';
            }
        }
    }, [producttoshow, productdetails]);

    // /* --------------------------------------------------------------------------------------
    // ------------------------------------------ JSX ------------------------------------------
    // --------------------------------------------------------------------------------------- */
    return (
        <div id="navigation">
            {/* Menu */}
            <div className="mylinks">
                {/* // ---------------------- LOGO */}
                <div className="logocontainer">
                    <span><NavLink to='/'><i className='fa fa-store'></i></NavLink></span>
                </div>

                <div className="linkcontainer">
                    {/* // ---------------------- BARRE DE RECHERCHE */}
                    <input type="text" name="" id="" className='otherinputs' placeholder='Recherche rapide ...' onChange={(e) => setClientsearchvalue(e.target.value)} value={clientsearchvalue} />

                    {/* // ---------------------- DIVERS LIENS */}
                    <NavLink to='/'>Accueil</NavLink>
                    <NavLink to='/allproducts'>Produits</NavLink>
                    <NavLink to='/boutiques'>Boutiques</NavLink>

                    {/* // ---------------------- COMPTE */}
                    {isConnected && <NavLink to='/moncompte'>Moncompte</NavLink>} 
                    {currentcart && currentcart.length > 0 && <button onClick={(e) => toppanier(e)}><i className='fa fa-cart-plus'></i></button> }
                    
                    {!isConnected ? <button onClick={connectuser}><i className='fa fa-power-off'></i></button> : <button onClick={closeSession}><i className='fa fa-share-square'></i></button>} 
                </div>
            </div>

            {/* ---------------------------------------------------------------------
            --------------------------------- MODALS -------------------------------
            ---------------------------------------------------------------------- */}
        
            {/* // ---------------------- MODAL DE CONNEXION */}
            {/* Modal de connexion */}
            <div id="connexionmodal" className='modal'
                style={{ display: connectmyuser && 'flex' }} onClick={ (e) => hidemodal(e) }>
                <div className="modal-content">
                    { contenttodisplay }
                </div>
            </div>

            {/* // ---------------------- MODAL DE PREVISUALISATION - PRODUIT */}
            {/* Modal de prévisualisation de produit */}
            <div id="productpreview" className="modal"
                style={{
                    display: productpreview && "flex",
                    top: (myy) ? myy+'px' : ''
                }} onClick={(e) => hideproductmodal(e)}>
                <Showproductmodal myproductdetails={dispatchproductdetails} />
            </div>

            {/* // ---------------------- MODAL DE PREVISUALISATION - PANIER */}
            {/* Modal de prévisualisation de panier */}
            <div id="cartpreview" className="modal"
                style={{
                    display: cartpreview && "flex",
                    top: (myy) ? myy+'px' : ''
                }} onClick={(e) => hidecartmodal(e)}>
                <Paniermodal />
            </div>

            {/* // ---------------------- MODAL DE RESULTATS - RECHERCHE RAPIDE */}
            {/* Modal de recherche rapide */}
            <div className="modal" style={{ display: rapidsearch && "flex"}}>          
                {
                    (filteredproductlist != '') ?
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Résultats de recherche pour " { clientsearchvalue } "</h3>
                        </div>
                        <div className="modal-body">
                            <div className="productslister">
                                <div className="filteredproducts">
                                    <div className="productscontainer">
                                        {filteredproductlist}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => setClientsearchvalue('')}>Fermer</button>    
                        </div>
                    </div>
                    : (
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Résultats de recherche pour { clientsearchvalue }</h3>
                            </div>
                            <div className="modal-body">
                                Aucun résultat, essayez un autre mot-clé svp.
                            </div>
                            <div className="modal-footer">
                                <button onClick={() => setClientsearchvalue('')}>Fermer</button>    
                            </div>
                        </div>
                    
                    )
                }             
            </div>
            
        </div>
    )
}

export default Navigation;