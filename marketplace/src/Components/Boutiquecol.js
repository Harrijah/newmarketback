import React from 'react';




const Boutiquecol = ({rayonchoice, rayonlist, categorychoice, filteredcategory, souscategorychoice, souscatlist02}) => {
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
        </>
    )
}
export default Boutiquecol;