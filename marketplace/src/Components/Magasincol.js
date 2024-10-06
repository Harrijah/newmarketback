import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { rayongen } from "../Assets/Functions";



const Magasincol = ({setMonrayon}) => {
    // variables
    const rayons = rayongen();

    // fonctions
    const choisirunrayon = (id) => {
        setMonrayon(id);
    }
    

    return (
        <select onChange={(e) => choisirunrayon(e.target.value)} >
            <option key={'0'} value="0">Choisir une catégorie</option>
            {rayons}
        </select>
    )

}
export default Magasincol;