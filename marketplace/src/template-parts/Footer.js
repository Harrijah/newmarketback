import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connectUser } from '../action/connexion.action';


const Footer = ({connectmyuser}) => {
    const isConnected = useSelector((state) => state.connexionReducer.isConnected);
    const dispatch = useDispatch();

    const connectme = () => {
        dispatch(connectUser(true));
    }
    let modal;
    isConnected && isConnected ? modal = ('') : (
        modal = 
        <div id="connexionmodal" style={{display : connectmyuser && 'block'}}>
            <div className="modal-content">
                <div className="modal-header">
                    <h1>Connexion BackOffice</h1>
                </div>
                <div className="modal-body">
                    <div className="formcontainer">
                        <form>
                            <input type="email" name="email" id="email" />
                            <input type="password" name="pwd" id="pwd" />
                            <input type="submit" value="Valider" />
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={ connectme }>Connecter</button>
                    <a href="#">Créer un compte</a>
                </div>
            </div>
        </div>
    );

    
    return (
        <div id='footer'>
            { modal }
            <div className="footercontainer">
                <div className="colone">
                    <h2>La meilleure place pour acheter</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi natus hic, repellendus labore modi ipsam fugit, alias, expedita quas cum nesciunt ducimus reiciendis nulla? Totam provident esse consequuntur voluptatibus voluptates?</p>
                </div>
                <div className="coltwo">
                    <h2>Liens utiles</h2>
                    <ul>
                        <li><a href="#">Créer un compte</a></li>
                        <li><a href="#">Nos services</a></li>
                        <li><a href="#">CGU</a></li>
                        <li><a href="#">A propos de nous</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                </div>
                <div className="colthree">
                    <h2>Nous trouver</h2>
                    <ul>
                        <li><b>Adresse : </b>Lot 123 Rue de la fortune</li>
                        <li><b>Téléphone : </b>034 04 000 11</li>
                        <li><b>Whatsapp : </b>034 04 000 11</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;