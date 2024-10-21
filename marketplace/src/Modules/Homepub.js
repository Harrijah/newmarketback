import React, { useEffect, useState } from 'react';
import { showpromo, showpromotext } from '../Assets/Functions';
import { useDispatch, useSelector } from 'react-redux';
import { connectuseraction } from '../action/createaccount.action';


// css : ../style/_settings.scss
const Homepub = () => {
    // --------------------------- variables
    let time01 = 8000;
    let time02 = 16000;
    let time03 = 24000;
    let time04 = 40000;
    const dispatch = useDispatch();
    const [todisplay, setTodisplay] = useState(null);
    const [loopindex, setLoopindex] = useState(0);

    // Pub slide 01 || loopindex == 1
    const temptext = [];
    const [finaltext, setFinaltext] = useState([]);
    const [letterindex, setLetterindex] = useState(0);
    const [texttoshow, setTexttoshow] = useState('');
    const [btncolor, setBtncolor] = useState('homebutton');
    let mytext = ['Créez votre compte en 1mn, ici '];


    // Pub slide 02 || loopindex == 2
    const hlproduct = showpromo(111, 'promo');


    // Pub slide 03 || loopindex == 3
    const imagepub01 = "./image/pub.jpg";


    // Pub slide 04 || loopindex == 4
    const hlproduct02 = showpromo(60);
    const producttext02 = showpromotext(60);
    const temptext02 = [];
    const [k, setK] = useState(0);
    const [finaltext02, setFinaltext02] = useState([]);
    const [letterindex02, setLetterindex02] = useState(0);
    const [loopindex02, setLoopindex02] = useState(0);
    const [texttoshow02, setTexttoshow02] = useState('');


   

    // --------------------------- fonctions
    // fonction pour afficher un produit dynamiquement
    const textloop = () => {
        // console.log('tonga eto @point d\'entrée eto ve 01 01 01');
        if (loopindex == 1) {
            if (letterindex < mytext[0].length) {
                temptext.push(mytext[0][letterindex]);
                setLetterindex(letterindex + 1);
                // setTimeout(() => {
                    setBtncolor('homebutton02');
                // }, 2000);
                }
            setFinaltext(finaltext + temptext);
        } else {
            setFinaltext('');
            setLetterindex(0);
            setBtncolor('homebutton');
        }
    }
    // afficher le texte qui va avec le produit
    const textandproductloop = () => {
        
        if (loopindex == 4) {
            if (loopindex02 == 0 && k == 0) {
                if (letterindex02 < producttext02[loopindex02].length) {
                    temptext02.push(producttext02[loopindex02][letterindex02]);
                    setLetterindex02(letterindex02 + 1);
                } else {
                    setK(k + 1);
                }
                setFinaltext02(finaltext02 + temptext02);
            }
            if (loopindex02 == 0 && k == 2) {
                const test = [...finaltext02];
                if (letterindex02 > 0) {
                    test.pop();              
                    setLetterindex02(letterindex02 - 1);
                } else {
                    setLoopindex02(loopindex02 + 1);
                    setK(0);
                }
                setFinaltext02(test);
            }
            if (loopindex02 == 1 && k == 0) {
                if (letterindex02 < producttext02[loopindex02].length) {
                    temptext02.push(producttext02[loopindex02][letterindex02]);
                    setLetterindex02(letterindex02 + 1);
                } else {
                    setK(k + 1);
                }
                
                setFinaltext02(finaltext02 + temptext02);
            }
            if (loopindex02 == 1 && k == 2) {
                const test = [...finaltext02];
                if (letterindex02 > 0) {
                    test.pop();              
                    setLetterindex02(letterindex02 - 1);
                } else {
                    setLoopindex02(loopindex02 + 1);
                    setK(0);
                }
                setFinaltext02(test);
            }
            if (loopindex02 == 2 && k == 0) {
                if (letterindex02 < producttext02[loopindex02].length) {
                    temptext02.push(producttext02[loopindex02][letterindex02]);
                    setLetterindex02(letterindex02 + 1);
                } else {
                    setK(k + 1);
                }
                
                setFinaltext02(finaltext02 + temptext02);
            }
            if (loopindex02 == 2 && k == 2) {
                const test = [...finaltext02];
                if (letterindex02 > 0) {
                    test.pop();              
                    setLetterindex02(letterindex02 - 1);
                } else {
                    setLoopindex02(loopindex02 + 1);
                    setK(0);
                }
                setFinaltext02(test);
            }
        } else {
            setFinaltext02('');
            setLetterindex02(0);
            setK(0);
        }
    }
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
                setTodisplay(<a href='http://localhost:3000/boutique/19'><img src={imagepub01} alt="" /></a>);
                break;
            case 4:
                setTodisplay(texttoshow02);
                break;
            default:
                setTodisplay(<img src={imagepub01} alt="" />);
        }
    }

    // fonciton pour la boucle principale - avec les temps
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
        setTimeout(() => {
            setLoopindex(4);
        }, time03);
        setTimeout(() => {
            displayme();
        }, time04);
    }

    // --------------------------- logiques
    // calculer le text à afficher avec setTimeout 01
    useEffect(() => {
        setTexttoshow(
            <div className='productandtext' style={{ fontSize: '1rem', backgroundColor: 'whitesmoke', textAlign: 'center', padding: '20px' }}>
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
                    {hlproduct02}
                </div>
            </div>
        );
    }, [finaltext02, hlproduct02]);
    


    useEffect(() => {
        setTimeout(() => {
            textloop();
        }, 60);
    }, [letterindex, loopindex]);

    useEffect(() => {
        if (loopindex02 == producttext02.length) {
            setLoopindex02(0);
        } else  if (producttext02[loopindex02]) {
            setTimeout(() => {
                textandproductloop();
            }, 100);
        }
        
    }, [letterindex02, loopindex, producttext02, k, loopindex02]);

    useEffect(() => {
        if (k == 1) {
            setTimeout(() => {
                setK(k + 1);
            }, 1500);
        }
    }, [k]);
    

    // calculer le contenu du loop avec un switch
    useEffect(() => {
        calculatewithindex();
    }, [letterindex, letterindex02, loopindex]);

     // lancer le loop setTimeout final
    useEffect(() => {
        displayme();
    }, []);

    return todisplay;
}

export default Homepub;