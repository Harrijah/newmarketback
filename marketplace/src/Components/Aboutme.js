import React, { useEffect, useState } from "react";
import Editbutton from "./Editbutton";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from "../action/createaccount.action";
import { showMyproduct } from "../action/showproduct.action";
import { modalposition } from "../action/position.action";
import { rapidsearchmodal, searchresult } from "../Assets/Functions";



// import './_aboutme.scss';
const Aboutme = ({ aboutUser }) => {
    // variables
    const dispatch = useDispatch();

    

    const champs = [aboutUser.nom, aboutUser.prenom, aboutUser.adresse, aboutUser.ville, aboutUser.codepostal, aboutUser.pays, aboutUser.telephone, aboutUser.email];

    const userinfos = [
        ['Nom', champs[0], 'nom'],
        ['Prénom', champs[1], 'prenom'],
        ['Adresse', champs[2], 'adresse'],
        ['Ville', champs[3], 'ville'],
        ['Code postal', champs[4], 'codepostal'],
        ['Pays', champs[5], 'pays'],
        ['Téléphone', champs[6], 'telephone'],
        ['Email', champs[7], 'email'],
    ];


    // fonctions 
    function submitedit(i, newValue) {
        const data = {
            id: aboutUser.id,
            name: userinfos[i][2],
            input: newValue,
            updatedat: new Date().toDateString(),
        }
        dispatch(updateUser(data));
    }

    const [userList, setUserList] = useState([]);
    useEffect(() => { 
        const list = [];
        for (let i = 0; i < userinfos.length; i++) {
            list.push(
                <Editbutton key={i} userinfos={userinfos} champs={champs} i={i} submitedit={submitedit} />
            );
        }
        setUserList(list);
    }, []);
    


    return (
        <div className="monmagasin">
            <h1>A propos de moi</h1>
            <div className="infoblock">
                <h2>Mes informations</h2>
                <ul>
                    {userList} 
                </ul>
            </div>
        </div>
    )
}

export default Aboutme;
