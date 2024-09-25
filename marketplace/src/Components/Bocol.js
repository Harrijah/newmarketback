import { useNavigate } from "react-router-dom"
export default function Bocol({ mychoice, setMychoice }) {
    const navigate = useNavigate();
    return (
        <> 
            <button style={{backgroundColor : (mychoice == 'magasin') && '#f0ad4e'}} onClick={() => setMychoice('magasin')}>A propos du magasin</button>
            <button style={{backgroundColor : (mychoice == 'products') && '#f0ad4e'}} onClick={() => setMychoice('products')}>Produits</button>
            <button style={{backgroundColor : (mychoice == 'commands') && '#f0ad4e'}} onClick={() => setMychoice('commands')}>Commandes</button>
            <button style={{backgroundColor : (mychoice == 'moncompte') && '#f0ad4e'}} onClick={() => navigate('/moncompte')}>Retour à Mon compte</button>
        </>
    )
}