import React, { useEffect, useState } from 'react';
import { showpromo } from '../Assets/Functions';
import { useDispatch, useSelector } from 'react-redux';
import { connectuseraction } from '../action/createaccount.action';


// css : ../style/_settings.scss
const Homepub = () => {
    // --------------------------- variables
    let time01 = 8000;
    let time02 = 16000;
    let time03 = 24000;
    let time04 = 32000;
    const imagepub01 = "./image/pub.jpg";
    const [texttoshow, setTexttoshow] = useState('');
    const [todisplay, setTodisplay] = useState(null);
    const [loopindex, setLoopindex] = useState(0);
    const hlproduct = showpromo(111);
    const hlproduct02 = showpromo(1);
    const temptext = [];
    const [finaltext, setFinaltext] = useState([]);
    let mytext = ['Créez votre compte en 1mn, ici '];
    const [letterindex, setLetterindex] = useState(0);
    const [btncolor, setBtncolor] = useState('homebutton');
    const dispatch = useDispatch();


    // --------------------------- fonctions
    // fonction pour afficher un produit dynamiquement
    const textloop = () => {
        if (loopindex == 1) {
            if (letterindex < mytext[0].length) {
                temptext.push(mytext[0][letterindex]);
                setLetterindex(letterindex + 1);
                }
            setFinaltext(finaltext + temptext);
        } else {
            setFinaltext('');
            setLetterindex(0);
            setBtncolor('homebutton');
        }
    }
    
    useEffect(() => {
        setTimeout(() => {
            textloop();
        }, 60);
        setTimeout(() => {
            setBtncolor('homebutton02');
        }, 2500)
    }, [letterindex, btncolor]);

    // switch avec le contenu du loop setTimeout
    const calculatewithindex = () => {
        switch (loopindex) {
            case 1:
                setTodisplay(texttoshow);
                break;
            case 2:
                setTodisplay(hlproduct);
                break;
            case 3:
                setTodisplay(<img src={imagepub01} alt="" />);
                break;
            // case 4:
            //     setTodisplay(hlproduct02);
            //     break;
            default:
                setTodisplay(<img src={imagepub01} alt="" />);
        }
    }

    // fonciton pour la boucle principale
    const displayme = () => {
        setTimeout(() => {
            setLoopindex(1);
        }, 0);
        setTimeout(() => {
            setLoopindex(2);
        }, time01);
        setTimeout(() => {
            setLoopindex(3);
        }, time02);
        // setTimeout(() => {
        //     setLoopindex(4);
        // }, time03);
        setTimeout(() => {
            displayme();
        }, time03);
    }

    // --------------------------- logiques

    // petit test de setTimeout
    useEffect(() => {
        textloop();
    }, [loopindex]);

    // calculer le contenu du loop avec un switch
    useEffect(() => {
        calculatewithindex();
    }, [letterindex, loopindex]);

    // calculer le text à afficher avec setTimeout
    useEffect(() => {
        setTexttoshow(
            <div style={{ fontSize: '1rem', backgroundColor: 'whitesmoke', textAlign: 'center', padding: '20px' }}>
                <p>{finaltext}|</p>
                <button onClick={() => dispatch(connectuseraction(true))} className={btncolor}>Créer mon compte</button>
            </div>
        );
    }, [finaltext]);
    
     // lancer le loop setTimeout final
    useEffect(() => {
        displayme();
    }, []);

    return todisplay;
}

export default Homepub;