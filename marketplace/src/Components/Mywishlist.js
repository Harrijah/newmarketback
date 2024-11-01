import React from "react";
import { wishlistfirstpart } from "../Assets/Functions";

const Mywishlist = () => {
    const thewishes = wishlistfirstpart();
    return (
        <div className="monmagasin">
            <h1>Mes préférences</h1>
            <div className="infoblock">
                <h2>Ma liste de souhaits</h2>
                {thewishes}
            </div>

        </div>
    )
}

export default Mywishlist;