import React from 'react';

//1 // css :  './Template-parts/_footer.scss'
//2 // css :  './Template-parts/_modal.scss'
const Footer = () => {

    return (
        <div id='footer'>
            <div className="footercontainer">
                <div className="colone">
                    <h2>La meilleure place pour acheter</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi natus hic, repellendus labore modi ipsam fugit, alias, expedita quas cum nesciunt ducimus reiciendis nulla? Totam provident esse consequuntur voluptatibus voluptates?</p>
                </div>
                <div className="coltwo">
                    <h2>Liens utiles</h2>
                    <ul>
                        <li><a href="#">Créer un compte</a></li>
                        <li><a href="#">Nos services</a></li>
                        <li><a href="#">CGU</a></li>
                        <li><a href="#">A propos de nous</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                </div>
                <div className="colthree">
                    <h2>Nous trouver</h2>
                    <ul>
                        <li><b>Adresse : </b>Lot 123 Rue de la fortune</li>
                        <li><b>Téléphone : </b>034 04 000 11</li>
                        <li><b>Whatsapp : </b>034 04 000 11</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;