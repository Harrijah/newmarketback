const Boutiquecol = ({ rayonchoice, rayonlist, categorychoice, filteredcategory, souscategorychoice, souscatlist02, brands, maxprice, changeprice, currentmaxprice }) => {
    
    return (
        <>
            <select name="" id="" onChange={(e) => rayonchoice(e)}>
                <option key={'0'} value='0'>{'Tous les rayons'}</option>
                {rayonlist}
            </select>
            <select name="" id="" onChange={(e) => categorychoice(e)}>
                <option key={'0'} value={'0'}>{'Toutes les catégories'}</option>
                {filteredcategory}
            </select>
            <select name="" id="" onChange={(e) => souscategorychoice(e)}>
                <option key={'0'} value={'0'}>{'Toutes les sous-catégories'}</option>
                {souscatlist02}
            </select>
            <div className='pricerange' style={{padding: '10px', color: '#fff'}}>
                <label htmlFor="prix">Prix max</label>
                <input type="range" name="prix" style={{ margin: 0, padding: 0 }} value={maxprice} max={currentmaxprice} onChange={(e) => changeprice(e)} />
            <span>{maxprice} Ar</span>
            </div>
        </>
    )
}
export default Boutiquecol;