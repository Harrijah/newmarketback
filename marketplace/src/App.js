import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Moncompte from "./pages/Moncompte";
import Backoffice from "./pages/Backoffice";
import Magasin from "./pages/Magasin";
import Boutique from "./pages/Boutique";
import Productpage from "./pages/Productpage";
import Allproducts from "./pages/Allproducts";
import Commande from "./pages/Commande";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/moncompte" element={<Moncompte />}></Route>
        <Route path="/backoffice" element={<Backoffice />}></Route>
        <Route path="/boutiques" element={<Magasin />}></Route>
        <Route path="/boutique/:id" element={<Boutique />}></Route>
        <Route path="/product/:id" element={<Productpage />}></Route>
        <Route path="/allproducts" element={<Allproducts />}></Route>
        <Route path="/commandes" element={<Commande />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
