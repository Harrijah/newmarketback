import { ADDTO_MYWHISH, DEL_MYWHISH, UPDATE_WISH } from "../action/whishlist.action";
// const initialState = { panier:  sessionStorage.getItem('panier') ? JSON.parse(sessionStorage.getItem('panier')) : '' };
const initialState = { wishlist: sessionStorage.getItem('wishlist') ? JSON.parse(sessionStorage.getItem('wishlist')) : [] };

export default function mywishlist(state = initialState, action) {
    switch (action.type) {
        case ADDTO_MYWHISH:
            if (sessionStorage.getItem('wishlist')) {
                const tempwish = JSON.parse(sessionStorage.getItem('wishlist'));
                tempwish.push(action.payload);
                sessionStorage.setItem('wishlist', JSON.stringify(tempwish));
            } else {
                sessionStorage.setItem('wishlist', JSON.stringify([action.payload]))
            }
            console.log(action.payload);
            return {
                wishlist: JSON.parse(sessionStorage.getItem('wishlist'))
            }
        case UPDATE_WISH:
            const templist03 = JSON.parse(sessionStorage.getItem('wishlist'));
            templist03[action.payload.index].quantity = action.payload.quantity;
            sessionStorage.setItem('wishlist', JSON.stringify(templist03));
            return {
                wishlist: JSON.parse(sessionStorage.getItem('wishlist')) 
            }

            
        case DEL_MYWHISH:
            const tempwish02 = JSON.parse(sessionStorage.getItem('wishlist'));
            const producttoremove = tempwish02.find((wish) => Number(wish.id) == Number(action.payload));
            const wishind = tempwish02.indexOf(producttoremove);
            tempwish02.splice(wishind, 1);
            sessionStorage.setItem('wishlist', JSON.stringify(tempwish02));
            return {
                wishlist: JSON.parse(sessionStorage.getItem('wishlist'))
            }
        default: 
            return state;
    }
}