import React, {useEffect, useRef, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { connectUser, disconnectUser } from '../action/createaccount.action';
import { createUser } from '../action/createaccount.action';
import Showproductmodal from '../Components/Showproductmodal';
import { showMyproduct } from '../action/showproduct.action';
import { getOneproduct } from '../action/produit.action';
import { isEmpty } from '../Assets/Utils';


// CSS : template-parts/_navigation.scss
const Navigation = () => {
    // Redux => Session connectée ou non
    const isConnected = useSelector((state) => state.createaccountReducer.isConnected);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const closeSession = () => {
        dispatch(disconnectUser());
    }

    // Montrer le modal de connexion utilisateur
    const [connectmyuser, setConnectmyuser] = useState(false);
    const connectuser = () => {
        setConnectmyuser(true);
    }

    // Toggle modal-content : create ou connect
    const [createorconnect, setCreateorconnect] = useState(true);
    const createaccount = () => {
        setCreateorconnect(!createorconnect);
    }

    // Cacher le modal de connexion utilisateur
    const hidemodal = (e) => {
        if (e.target.className == 'modal') {
            setConnectmyuser(false);
        }
    }

    // Création d'un nouveau compte
    const connectuserform = useRef();
    // Future validation de formulaire de connexion
    const connectme = (e) => {
        e.preventDefault();
        setConnectmyuser(false);
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
    const producttoshow = useSelector((state) => state.showproductReducer.producttoshow);
    const [dispatchproductdetails, setDispatchproductdetails] = useState(null);
    const productdetails = useSelector((state) => state.productReducer.myproduct);
    const hideproductmodal = (e) => {
        e.target.className == "modal" && dispatch(showMyproduct(0));
    }    
    
    useEffect(() => {
        if (producttoshow) {
            if(productdetails){
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
            } else {
                setProductpreview(false);
                dispatch(showMyproduct(0));
                setDispatchproductdetails("");
            }
        }
    }, [producttoshow, productdetails]);
    
    return (
        <div id="navigation">
            {/* Menu */}
            <div className="mylinks">
                <div className="logocontainer">
                    <span><i className='fa fa-store'></i></span>
                </div>
                <div className="linkcontainer">
                    <NavLink to='/'>Accueil</NavLink>
                    { isConnected && <NavLink to='/moncompte'>Moncompte</NavLink> } 
                    { !isConnected ? <button onClick={connectuser}><i className='fa fa-power-off'></i></button> : <button onClick={closeSession}><i className='fa fa-share-square'></i></button> } 
                </div>
            </div>

            {/* Modal de connexion */}
            <div id="connexionmodal" className='modal'
                style={{ display: connectmyuser && 'flex' }} onClick={ (e) => hidemodal(e) }>
                <div className="modal-content">
                    { contenttodisplay }
                </div>
            </div>
            <div id="productpreview" className="modal"
                style={{ display: productpreview && "flex" }} onClick={(e) => hideproductmodal(e)}>
                <Showproductmodal myproductdetails={dispatchproductdetails} />
            </div>
        </div>
    )
}

export default Navigation;