import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { connectUser } from '../action/connexion.action';

// CSS : template-parts/_navigation.scss
const Navigation = ({ connectmyuser, setConnectmyuser }) => {
    function connectuser() {
        setConnectmyuser(true);
    }
    const isConnected = useSelector((state) => state.connexionReducer.isConnected);

    return (
        <div id="navigation">
            <div className="mylinks">
                <div className="logocontainer">
                    <span>MonLogo</span>
                </div>
                <div className="linkcontainer">
                    <NavLink to='/'>Accueil</NavLink>
                    { !isConnected && <button onClick={connectuser} >Connexion</button> } 
                    { isConnected && <NavLink to='/backoffice'>Back office</NavLink> } 
                </div>
            </div>
        </div>
    )
}

export default Navigation;