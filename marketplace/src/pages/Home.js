import React, { useEffect, useState } from 'react';
import Navigation from '../template-parts/Navigation';
import Footer from '../template-parts/Footer';
import Slideshow from '../Components/Slideshow';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../Assets/Utils';
import { all } from 'axios';
import { categorygen, filteredcategorygen, finalsouscatgen, findmaxprice, rapidsearchmodal, rayongen, searchinfo, searchresult, souscatgen } from '../Assets/Functions';
import Productslister from '../Components/Productslister';
import { positionReducer } from '../reducers/position.reducer';
import { showMyproduct } from '../action/showproduct.action';
import { modalposition } from '../action/position.action';


// CSS : pages/_home.scss
const Home = () => {
    // --------------------------------- Variables
    const defaultimage = './image/imageicon.png';
    const allproductslist = useSelector((state) => state.productReducer.products);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const marques = useSelector((state) => state.marqueReducer.marques);
    const [enavant, setEnavant] = useState('enavant');
    const [rayonselect, setRayonselect] = useState(0);
    const [categorieselect, setCategorieselect] = useState(0);
    const [souscategorieselect, setSouscategorieselect] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [maxprice, setMaxprice] = useState(0); 



  
    // --------------------------------- Fonctions
    // afficher la liste de rayons avec des produits
    const rayonlist = rayongen();

    // sélectionner un rayon
    const rayonchoice = (e) => {
        setRayonselect(e.target.value);
        setCategorieselect(0);
        setSouscategorieselect(0);
    };

    // obtenir une liste de catégories
    const categorielist = categorygen(rayonselect);
    const filteredcategory = filteredcategorygen(rayonselect);


    // sélectionner une catégorie
    const categorychoice = (e) => {
        setCategorieselect(e.target.value);
    }
    // sélectionner une catégorie
    const souscategorychoice = (e) => {
        setSouscategorieselect(e.target.value);
    }

    // changer la rangée de prix
    useState(() => {

     }, [maxprice]);


    // obtenir une liste de sous-catégories
    const souscatlist = souscatgen(rayonselect, rayonlist, categorielist, categorieselect);
    const souscatlist02 = finalsouscatgen(rayonselect, rayonlist, categorielist, categorieselect, souscatlist, filteredcategory);

    // --------------------------------- Logiques
    
    // trouver le prix maximal
    const currentmaxprice = findmaxprice();

    // Générer la liste de rayons disponibles
    useEffect(() => {
        rayonlist;
        currentmaxprice;
    }, [allproductslist]);

    

    return (
        <div className="container">
            <Navigation allproductslist={allproductslist} magasins={magasins} marques={marques} />
            <div className="mphome">
                <div className="firstbarr">
                    <div className="leftpart">
                        <button>Boutiques</button>
                        <button>Services</button>
                    </div>
                    <div className="rightpart">
                        {/* <input type="text" name="" id="" className='otherinputs' placeholder='Recherche rapide ...' onChange={(e) => setClientsearchvalue(e.target.value)} value={clientsearchvalue} /> */}
                        
                       
                    </div>
                </div>
                <div className="secondbarr">
                    <div className="leftpart">
                        <div className="carouselheader">
                            <h2>Articles en avant</h2>
                            <div className="buttonline">
                                <div className="first">
                                    <button onClick={() => setEnavant('enavant')} className={(enavant == 'enavant' ? 'highlightme' : '')} style={{backgroundColor: enavant == 'enavant' ? '#fff' : ''}}>Coups de coeur</button>
                                    <button onClick={() => setEnavant('special')} className={(enavant == 'special' ? 'highlightme' : '')} style={{backgroundColor: enavant == 'special' ? '#fff' : ''}}>Les nouveautés</button>
                                    <button onClick={() => setEnavant('promo')} className={(enavant == 'promo' ? 'highlightme' : '')} style={{backgroundColor: enavant == 'promo' ? '#fff' : ''}}>Promos</button>
                                </div>
                                <div className="last"></div>
                            </div>
                            <div className="pplcarousel">
                                <Slideshow listederayons={rayonlist} allproductslist={allproductslist} magasins={magasins} enavant={enavant} />
                            </div>
                        </div>
                    </div>
                    <div className="rightpart">
                        <div className="imgcontainer">
                            <img src="./image/pub.jpg" alt="" />
                        </div>
                    </div>
                </div>
                <div className="firstbann">
                    <div className="banncontainer">
                        <div className="col01">
                            <div className="textcontainer">
                                <h2>Trouver un magasin</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis alias, ipsum quia aliquid ullam assumenda perspiciatis laudantium consequuntur autem in maxime, qui quam exercitationem nihil illo dicta tempore earum pariatur!</p>
                            </div>
                        </div>
                        <div className="col02">
                            <div className="formcontainer">
                                <form>
                                    <select name="" id="">
                                        <option value="0">Sélectionner un rayon</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="0">Sélectionner un magasin</option>
                                    </select>
                                    <button type='submit' value='Voir le magasin'>Voir le magasin</button>
                                </form>
                            </div>
                        </div>
                        <div className="col03"></div>
                    </div>
                </div>
                <div className="productfilter">
                    <div className="filtercontainer">
                        <h2>Trouvez un produit en 3 clics</h2>
                            <div className="barfilter">
                                <select name="" id="" onChange={(e) => rayonchoice(e)}>
                                    <option key={'0'} value='0'>{'Tous les rayons'}</option>
                                    {rayonlist}
                                </select>
                                <select name="" id="" onChange={(e) => categorychoice(e)}>
                                    <option key={'0'} value={'0'}>{'Toutes les catégories'}</option>
                                    {filteredcategory}
                                </select>
                                <select name="" id="" onChange={(e) => souscategorychoice(e)}>
                                    <option key={'0'} value={'0'}>{'Toutes les sous-catégories'}</option>
                                    {souscatlist02}
                                </select>
                                <input type="text" name="" id="" onChange={(e) => setKeyword(e.target.value)} placeholder="Entrer un mot-clé" />
                                <div className='pricerange'>
                                    <label htmlFor="prix">Prix max</label>
                                <input type="range" name="prix" value={maxprice} onChange={(e) => setMaxprice(e.target.value)} />
                                <span>{maxprice} Ar</span>
                                </div>
                            </div>
                        <Productslister rayonselect={rayonselect} categorieselect={categorieselect} souscategorieselect={souscategorieselect} keyword={keyword} id={0} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}

export default Home;