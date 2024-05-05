import React from "react";;


const Bomagasin = () => {
    return (
        <div className="monmagasin">
            <h1>A propos du magasin</h1>
            <div className="infoblock">
                <ul>
                    <li><b>Nom du magasin</b> : Mon magasin <button>Editer</button></li>
                    <li><b>Adresse</b> : 3, Rue delafortune Antananarivo Madagascar <button>Editer</button></li>
                    <li><b>Gérant</b> : Rakoto Dupont <button>Editer</button></li>
                    <li><b>Téléphone 01</b> : +261 33 00 123 45 <button>Editer</button></li>
                    <li><b>Téléphone 02</b> : +261 32 00 123 45 <button>Editer</button></li>
                    <li><b>Page Facebook</b> : <a href="#">Mon beau magasin</a> <button>Editer</button></li>
                </ul>
            </div>

        </div>
    )
}

export default Bomagasin;