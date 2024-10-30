import { ADDTO_MYWHISH, DEL_MYWHISH } from "../action/whishlist.action";
// const initialState = { panier:  sessionStorage.getItem('panier') ? JSON.parse(sessionStorage.getItem('panier')) : '' };
const initialState = { wishlist: sessionStorage.getItem('wishlist') ? JSON.parse(sessionStorage.getItem('wishlist')) : '' };

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
        case DEL_MYWHISH:
            const tempwish02 = JSON.parse(sessionStorage.getItem('whishlist'));
            const wishind = tempwish02.indexOf(tempwish02 && tempwish02.find((wish) => wish.id == action.payload));
            const tempwish03 = tempwish02.splice(wishind, 1);
            sessionStorage.setItem('wishlist', JSON.stringify(tempwish03));
            return {
                wishlist: JSON.parse(sessionStorage.getItem('wishlist'))
            }
        default: 
            return state;
    }
}