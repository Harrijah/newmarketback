import React, { useEffect, useRef, useState } from "react";
import { addproduct } from "../Assets/Functions";

const Ajoutpanier = ({product}) => {
    const [number, setNumber] = useState(1);
    const formref = useRef();
    const [productval, setProductval] = useState([]);
    const addprod = addproduct(productval);
    
    // clic sur l'ajout de produit
    const clickonadd = (e, id) => {
        e.preventDefault();
        setProductval([Number(id), Number(formref.current[0].value)]);
        setNumber(1);
    }

    useEffect(() => {
        addprod;
    }, [productval]);

    return (
        <div className="quantityproduit">
            <form ref={formref} onSubmit={(e) => clickonadd(e, product.id)} style={{display: 'flex'}}>
                <input type="number" className="quantityinput" min={1} onChange={(e) => setNumber(e.target.value)} value={number} style={{maxWidth: '50px'}} />
                <input  type="submit" value='Ajouter au panier'/>
            </form>
        </div>
    )
}

export default Ajoutpanier;