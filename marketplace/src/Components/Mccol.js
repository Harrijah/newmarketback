export default function Mccol({mychoice, setMychoice}) {
    return (
        <>
            <button style={{backgroundColor : (mychoice == 'moi') && '#f0ad4e'}} onClick={() => setMychoice('moi')}>Mes informations</button>
            <button style={{backgroundColor : (mychoice == 'mywishlist') && '#f0ad4e'}} onClick={() => setMychoice('mywishlist')}>Liste de souhaits</button>
            <button style={{backgroundColor : (mychoice == 'monpanier') && '#f0ad4e'}} onClick={() => setMychoice('monpanier')}>Mon panier</button>
            <button style={{backgroundColor : (mychoice == 'mesachats') && '#f0ad4e'}} onClick={() => setMychoice('mesachats')}>Historique d'achat</button>
            <button style={{backgroundColor : (mychoice == 'espacepro') && '#f0ad4e'}} onClick={() => setMychoice('espacepro')}>Espace pro</button>
        </>
    )
}