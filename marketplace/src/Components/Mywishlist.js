import React from "react";

const Mywishlist = () => {
    return (
        <div className="monmagasin">
            <h1>Mes préférences</h1>
            <div className="infoblock">
                <h2>Ma liste de souhaits</h2>
                <ul>
                    <li><b>Produit 01 </b> : <a href="#">Produit 01</a><button className='myfontawesome'> <i className="fa fa-trash-alt"></i> </button><button className='myfontawesome'><i className="fa fa-cart-arrow-down"></i></button></li>
                    <li><b>Produit 02 </b> : <a href="#">Produit 02</a><button className='myfontawesome'> <i className="fa fa-trash-alt"></i> </button><button className='myfontawesome'><i className="fa fa-cart-arrow-down"></i></button></li>
                    <li><b>Produit 03 </b> : <a href="#">Produit 03</a><button className='myfontawesome'> <i className="fa fa-trash-alt"></i> </button><button className='myfontawesome'><i className="fa fa-cart-arrow-down"></i></button></li>
                    <li><b>Produit 04 </b> : <a href="#">Produit 04</a><button className='myfontawesome'> <i className="fa fa-trash-alt"></i> </button><button className='myfontawesome'><i className="fa fa-cart-arrow-down"></i></button></li>
                    <li><b>Produit 05 </b> : <a href="#">Produit 05</a><button className='myfontawesome'> <i className="fa fa-trash-alt"></i> </button><button className='myfontawesome'><i className="fa fa-cart-arrow-down"></i></button></li>
                </ul>
            </div>

        </div>
    )
}

export default Mywishlist;