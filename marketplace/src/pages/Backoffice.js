import React, { useState } from "react";
import Bomagasin from "../Components/Bomagasin";
import Boproducts from "../Components/Boproducts";
import Bocommands from "../Components/Bocommands";
import Navigation from "../template-parts/Navigation";
import Footer from "../template-parts/Footer";


// CSS : pages/_backoffice.scss
const Backoffice = () => {
    const [mychoice, setMychoice] = useState('');
    const [connectmyuser, setConnectmyuser] = useState(false);
    let content;

    switch (mychoice) {
        case 'magasin':
            content = <Bomagasin />
            break;
        case 'products':
            content = <Boproducts />
            break;
        case 'commands':
            content = <Bocommands />
            break;
        default:
            content = <Bomagasin />
            break;
    }

    return (
        <div className="container">
            <Navigation setConnectmyuser={ setConnectmyuser }/>
            <div className="bocontainer">
                <div className="pplban"></div>
                <div className="secondban">
                    <div className="column01">
                        <div className="block01">
                            <button onClick={() => setMychoice('magasin')}>A propos du magasin</button>
                            <button onClick={() => setMychoice('products')}>Produits</button>
                            <button onClick={() => setMychoice('commands')}>Commandes</button>
                        </div>
                    </div>
                    <div className="column02">
                        <div className="contentcontainer">
                            { content }
                        </div>
                    </div>
                </div>

            </div>
            <Footer connectmyuser={connectmyuser} />
        </div>
    )
}

export default Backoffice;