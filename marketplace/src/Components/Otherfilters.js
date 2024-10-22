export const Otherfilters = ({ brands, brandchoice, listofstore, magasinchoice }) => {
    



    return (
        <>
            <select name="" id="" onChange={(e) => brandchoice(e)}>
                <option key={'0'} value={'0'}>{'Marque (Veuillez choisir un rayon)'}</option>
                {brands}
            </select>
            <select onChange={(e) => magasinchoice(e)}>
                <option key={0} value={0}>Magasin</option>
                {listofstore}
            </select>
        </>
    );
}