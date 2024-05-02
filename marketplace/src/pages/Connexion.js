import React from 'react';


export default function Connexion({ connect }){
    function connectme() {
        connect(true);
    }
    return (
        <div className='container'>
            <div className="formback">
                <div className="formcontainer">
                    <h1>Connexion BackOffice</h1>
                    <form>
                        <input type="email" name="email" id="email" />
                        <input type="password" name="pwd" id="pwd" />
                        <input type="submit" value="Valider" />
                    </form>
                    <button onClick={connectme}>Connecter</button>
                    <a href="#">Créer un compte</a>
                </div>
            </div>
        </div>
    )
}
