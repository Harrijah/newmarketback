import React, {useState, useEffect} from "react";
import Editbutton from "./Editbutton";
import { useDispatch } from "react-redux";
import { updatestore } from "../action/store.action";




// css :  './components/_bomagasin.scss'
const Bomagasin = ({ userdata, storedata }) => {
    const dispatch = useDispatch();

    const champs = [storedata.nommagasin, storedata.adresse, storedata.email, storedata.phone, storedata.description, storedata.userid, storedata.cgv, storedata.cgvtext, storedata.createdat, storedata.updatedat];

    const storeinfos = [
        ['Nom du magasin', champs[0], 'nommagasin'],
        ['Adresse', champs[1], 'adresse'],
        ['Email', champs[2], 'email'],
        ['Téléphone', champs[3], 'phone'],
        ['Description', champs[4], 'description'],
    ];

    function submitedit(i, newValue) {
        const data = {
            id: storedata.id,
            name: storeinfos[i][2],
            input: newValue,
            updatedat: new Date().toDateString(),
        }
        dispatch(updatestore(data));
    }


    const [storeinfolist, setStoreinfolist] = useState([]);
    useEffect(() => {
        const list = [];
        for (let i = 0; i < storeinfos.length; i++) {
            list.push(
                <Editbutton key={i} userinfos={storeinfos} champs={champs} i={i} submitedit={submitedit} />
            )
        }
        setStoreinfolist(list)
    }, []);
    
    return (
        <div className="monmagasin">
            <h1>A propos du magasin</h1>
            <div className="infoblock">
                <h2>Mes informations</h2>
                <ul>
                    {storeinfolist}
                </ul>
            </div>

        </div>
    )
}

export default Bomagasin;