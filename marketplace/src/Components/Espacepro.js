import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch, useSelector } from "react-redux";
import { createstore } from "../action/store.action";
import { createuserstore, updateUser } from "../action/createaccount.action";
import { isEmpty } from "../Assets/Utils";

// css : './components/_espacepro.scss'
const Espacepro = ({ products }) => {
    const user = useSelector((state) => state.createaccountReducer.user);
    const rayons = useSelector((state) => state.rayonReducer.rayon);
    const [listerayon, setListrayon] = useState([]);
    
    // Dispose déjà d'un magasin ou non
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userstore, setUserstore] = useState(user.store);

    // Toggle de la form
    const [displayformpart, setDisplayformpart] = useState(Number(1));

    const addnumber = () => {
        displayformpart < 3 && setDisplayformpart(displayformpart + 1);
    }
    const menonumber = () => {
        displayformpart > 1 && setDisplayformpart(displayformpart -1);
    }

    // vue liste de rayon

    const afficherayon = () => {
        const templist = !isEmpty(rayons) && rayons.map((rayon) => (
            <option key={rayon.id} value={rayon.id}>{rayon.rayon}</option>
        ));
        setListrayon(templist);
    }
    useEffect(() => { afficherayon() }, [rayons]);


    const storeref = useRef();
    const [shopoption, setShopoption] = useState('1'); 

    const submitshop = (e) => {
        e.preventDefault();
        setUserstore(!userstore);
        const data = {
            nommagasin: storeref.current[0].value,
            adresse: storeref.current[1].value,
            email: storeref.current[2].value,
            phone: storeref.current[3].value,
            categorie: storeref.current[4].value,
            description: storeref.current[5].value,
            cgv: storeref.current[6].value,
            cgvtext: storeref.current[7].value,
            userid: user.id,
            createdat: new Date().toDateString(),
            updatedat: '',

    };
        dispatch(createstore(data));

        const userdata = {
            id: user.id,
            name: 'store',
            input: 'true',
            updatedat: new Date().toDateString(),
        }
        dispatch(updateUser(userdata));
        console.log(userdata);
        navigate('/backoffice');

    }

    // Si user dispose déjà d'un store, alors le renvoyer vers Backoffice
    useEffect(() => {
        (userstore == 'true') && navigate('/backoffice');
    }, [userstore]);

    return(
        <div className="monmagasin">
            <h1>Mon magasin</h1>
            <div className="infoblock">
                <h2>Créer un magasin</h2>
                <form className="createshop" encType='multipart/form-data' ref={storeref} onSubmit={(e) => submitshop(e)}>
                    <span className="partone" style={{display : (displayformpart == 1) ? 'block' : 'none'}}>
                        <h3>Etape {displayformpart}/3 : Coordonnées</h3>
                        <label htmlFor="nommagasin">Nom de la boutique</label>
                        <input className="maginput" type="text" name="nommagasin" id="nommagasin" />

                        <label htmlFor="adresse">Adresse</label>
                        <input className="maginput" type="text" name="adresse" id="adresse" />

                        <label htmlFor="email">Email</label>
                        <input className="maginput" type="email" name="email" id="email" />

                        <label htmlFor="phone">Téléphone</label>
                        <input className="maginput" type="text" name="phone" id="phone" />
                    </span>

                    <span className="parttwo" style={{display : (displayformpart == 2) ? 'block' : 'none'}}>
                        <h3>Etape {displayformpart}/3 : A propos de la boutique</h3>
                        <label htmlFor="categorie">Catégorie</label>
                        <select name='categorie' id='categorie' defaultValue='1' >
                            {listerayon}
                        </select>
                        <label htmlFor="description">Description</label>
                        {/* <textarea name='description' rows={4} > </textarea> */}
                    </span>

                    <span className="partthree" style={{display : (displayformpart == 3) ? 'block' : 'none'}}>
                        <h3>Etape {displayformpart}/3 : Informations additionnelles</h3>
                        <label htmlFor="cgv">Conditions Générales de ventes</label>
                        <p>Importez vos CGV ici</p>
                        <input type="file" name="cgv" id="cgv" />

                        <p>ou bien, remplissez-les ici</p>
                        <div style={{background : '#fff'}}>
                            <Editor name='cgvtext'></Editor>
                        </div>
                        <input type="submit" value="Enregistrer" />

                    </span>


                </form>
                
                {displayformpart != 1 && <button onClick={menonumber}>Précédent</button>}
                {displayformpart != 3 && <button onClick={addnumber}>Suivant</button>}
            </div>

        </div>
    )

}

export default Espacepro;