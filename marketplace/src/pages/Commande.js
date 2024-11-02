import React, { useState } from "react";
import Navigation from "../template-parts/Navigation";
import { useSelector } from "react-redux";
import Footer from "../template-parts/Footer";
import Leftlateralcolumn from "../Components/Leftlateralcolumn";
import Rightmaincontent from "../Components/Rightmaincontent";
import Boban from "../Components/Boban";
import Commandpage from "../Components/Commandpage";
import Aboutme from "../Components/Aboutme";
import Bocol from "../Components/Bocol";

// css : './pages/_commandpage.scss'
const Commande = () => {

  // -------------------
  // --------- variables
  // -------------------
  const allproductslist = useSelector((state) => state.productReducer.products);
  const marques = useSelector((state) => state.marqueReducer.marques);
  const magasins = useSelector((state) => state.storeReducer.allstore);
  const user = useSelector((state) => state.createaccountReducer.user)
  const currentcart = useSelector((state) => state.sessionReducer.panier);
  const [ttlgeneral, setTtlgeneral] = useState(0);
  const [mychoice, setMychoice] = useState('commande');
  const [commandmenu, setCommandmenu] = useState('');
  let content;
  // les boutons du leftcol
  const bobutton = [
      {
          button: 'apropos',
          text: 'Mes informations'
      },
      {
          button: 'commande',
          text: 'Ma commande'
      },
  ];

  
  // -------------------
  // --------- fonctions
  // -------------------

  switch (mychoice) {
    case 'apropos':
      content = <Aboutme aboutUser={user} />
      break;
    case 'commandpage':
      content = <Commandpage allproductslist={allproductslist} marques={marques} magasins={magasins} currentcart={currentcart} ttlgeneral={ttlgeneral} setTtlgeneral={setTtlgeneral} />
      break;
    
    default:
      content = <Commandpage allproductslist={allproductslist} marques={marques} magasins={magasins} currentcart={currentcart} ttlgeneral={ttlgeneral} setTtlgeneral={setTtlgeneral} />
  }

    

  // -------------------
  // ---------- logiques
  // -------------------
    


    return (
      <div className="container">
        <Navigation allproductslist={allproductslist} marques={marques} magasins={magasins} />
        <Boban />
        <Leftlateralcolumn button={<Bocol setMychoice={setMychoice} mychoice={mychoice} bobutton={bobutton} />} />
        <Rightmaincontent content={content} />
        <Footer />
        </div>
    )
 }

export default Commande;