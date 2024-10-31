import React, { useEffect, useState } from "react";
import { addtowishlist } from "../Assets/Functions";




const Addtowish = ({ product }) => {
    // variables
    const [newwish, setNewwish] = useState('');
    
    // fonctions
    const addingwish = addtowishlist(newwish);

    const addmetowish = (e, id) => {
        setNewwish(id);
    }

    // logiques
    useEffect(() => {
        addingwish;
    }, [newwish]);
    
    return <button onClick={(e) => addmetowish(e, product.id)}>Plus tard</button>
}

export default Addtowish;