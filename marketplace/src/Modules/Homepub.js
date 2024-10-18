import React, { useEffect, useState } from 'react';
import { showpromo, showpromotext } from '../Assets/Functions';
import { useDispatch, useSelector } from 'react-redux';
import { connectuseraction } from '../action/createaccount.action';


// css : ../style/_settings.scss
const Homepub = () => {
    // --------------------------- variables
    let time01 = 8000;
    let time02 = 16000;
    let time03 = 32000;
    let time04 = 40000;
    const dispatch = useDispatch();
    const imagepub01 = "./image/pub.jpg";
    const [todisplay, setTodisplay] = useState(null);
    const [loopindex, setLoopindex] = useState(0);

    const hlproduct = showpromo(111);

    // text 01
    const temptext = [];
    const [texttoshow, setTexttoshow] = useState('');
    const [finaltext, setFinaltext] = useState([]);
    let mytext = ['Créez votre compte en 1mn, ici '];
    const [letterindex, setLetterindex] = useState(0);

    // text 02
    const [finaltext02, setFinaltext02] = useState([]);
    const temptext02 = [];
    const producttext02 = showpromotext(1);
    let mytext02 = producttext02;
    const tralala = [mytext02[0]];
    const [texttoshow02, setTexttoshow02] = useState('');
    const hlproduct02 = showpromo(1);
    const [letterindex02, setLetterindex02] = useState(0);
    const [k, setK] = useState(0);
    const [btncolor, setBtncolor] = useState('homebutton');


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

    const textandproductloop = () => {
        // if (loopindex == 4) {
        if (k == 0) {
            if (letterindex02 < mytext02[0].length) {
                temptext02.push(mytext02[0][letterindex02]);
                setLetterindex02(letterindex02 + 1);
                console.log('le k est : ' + k + ', et je suis au niveau 01');
                console.log(letterindex02);
            } else {
                setK(k + 1);
                console.log(letterindex02);
                console.log('k est égal à 1 maintenant');
            }
        }
        if (k == 1) {
            console.log('------------------- ' + finaltext02);
            if (letterindex02 > 0) {
                console.log('************************************'+ tralala);
                
                temptext02 = tralala.map((_, letterindex02) => {
                    return tralala.pop(letterindex02)
                });
                setLetterindex02(letterindex02 - 1);
                // console.log('le k est : ' + k + ', et je suis au niveau 02');
                console.log('le letterindex02 est : ' + letterindex02 + ', et je suis au niveau 02');
            }
        }
        setFinaltext02(finaltext02 + temptext02);
        
        
        


        // }
    }

    useEffect(() => {
        setTimeout(() => {
            textandproductloop();
        }, 150);
    }, [k, mytext02, producttext02, letterindex02]);
    
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
            //     setTodisplay(texttoshow02);
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
    // calculer le text à afficher avec setTimeout 01
    useEffect(() => {
        setTexttoshow(
            <div style={{ fontSize: '1rem', backgroundColor: 'whitesmoke', textAlign: 'center', padding: '20px' }}>
                <p>{finaltext}|</p>
                <button onClick={() => dispatch(connectuseraction(true))} className={btncolor}>Créer mon compte</button>
            </div>
        );
    }, [finaltext]);

    // calculer le text à afficher avec setTimeout 02
    useEffect(() => {
        setTexttoshow02(
            <div className='productandtext'>
                <p>{finaltext02}|</p>
                <div className="producttof">
                    {/* {hlproduct02} */}
                </div>
            </div>
        );
    }, [finaltext02, hlproduct02]);
    

    // petit test de setTimeout
    useEffect(() => {
        setTimeout(() => {
            setBtncolor('homebutton02');
        }, 4000);
    }, [btncolor]);

    useEffect(() => {
        setTimeout(() => {
            textloop();
        }, 60);
    }, [letterindex, loopindex]);


    // calculer le contenu du loop avec un switch
    useEffect(() => {
        calculatewithindex();
    }, [letterindex, loopindex]);

     // lancer le loop setTimeout final
    useEffect(() => {
        displayme();
    }, []);

    // return todisplay;
    return texttoshow02;
}

export default Homepub;