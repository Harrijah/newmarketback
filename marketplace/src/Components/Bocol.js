import { useNavigate } from "react-router-dom"
export default function Bocol({ mychoice, setMychoice, bobutton }) {
    const navigate = useNavigate();

    const allbutton = bobutton.map((bouton, index) => (
        <button key={index}
            style={{ backgroundColor: (mychoice == bouton.button) && '#f0ad4e' }}
            onClick={() => setMychoice(bouton.button)}>{bouton.text}
        </button>
    ));

    return (
        <> 
            {allbutton}
            {/* <button style={{backgroundColor : (mychoice == 'moncompte') && '#f0ad4e'}} onClick={() => navigate('/moncompte')}>Retour à Mon compte</button> */}
        </>
    )
}