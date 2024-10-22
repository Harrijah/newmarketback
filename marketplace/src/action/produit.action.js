import axios from 'axios';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const GET_PRODUCT = 'GET_PRODUCT';
export const DEL_PRODUCT = 'DEL_PRODUCT';
export const MOD_PRODUCT = 'MOD_PRODUCT';
export const GET_ONEPRODUCT = 'GET_ONEPRODUCT';

export const addProduct = (data) => {
    return (dispatch) => {
        
        const formData = new FormData();
        formData.append('storeid', data.storeid);
        formData.append('userid', data.userid);
        formData.append('nomproduit', data.nomproduit);
        formData.append('rayon', data.rayon);
        formData.append('categorie', data.categorie);
        formData.append('souscategorie', data.souscategorie);
        formData.append('reference', data.reference);
        formData.append('marque', data.marque);
        formData.append('prix', data.prix);
        formData.append('courtdescript', data.courtdescript);
        formData.append('longdescript', data.longdescript);

        // Ajout des fichiers à FormData
        if (data.image01) formData.append('image01', data.image01);
        if (data.image02) formData.append('image02', data.image02);
        if (data.image03) formData.append('image03', data.image03);
        if (data.image04) formData.append('image04', data.image04);
        if (data.image05) formData.append('image05', data.image05);
        if (data.image06) formData.append('image06', data.image06);

        // Utilisez axios pour envoyer la requête
        axios.post('http://localhost:8080/addproduct', formData, {headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => {
            dispatch({type: ADD_PRODUCT, payload: response.data})
        }).catch(error => {
            console.error('Erreur lors de l\'upload du produit', error);
        });

    };
};

export const modifyProduct = (data) => {
    return (dispatch) => {
        
        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('storeid', data.storeid);
        formData.append('userid', data.userid);
        formData.append('nomproduit', data.nomproduit);
        formData.append('rayon', data.rayon);
        formData.append('categorie', data.categorie);
        formData.append('souscategorie', data.souscategorie);
        formData.append('reference', data.reference);
        formData.append('marque', data.marque);
        formData.append('prix', data.prix);
        formData.append('courtdescript', data.courtdescript);
        formData.append('longdescript', data.longdescript);

        // Ajout des fichiers à FormData
        if (data.image01) formData.append('image01', data.image01);
        if (data.image02) formData.append('image02', data.image02);
        if (data.image03) formData.append('image03', data.image03);
        if (data.image04) formData.append('image04', data.image04);
        if (data.image05) formData.append('image05', data.image05);
        if (data.image06) formData.append('image06', data.image06);

        // Utilisez POST pour simuler un PUT
        axios.post('http://localhost:8080/modifyProduct', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => {
            dispatch({type: MOD_PRODUCT, payload: response.data})
        }).catch(error => {
            console.error('Erreur lors de la modification du produit', error);
        });

    };
};


export const getProduct = () => {
    return (dispatch) => {        
        return axios.get('http://localhost:8080/getproduct').then((res) => {
             dispatch({ type: GET_PRODUCT, payload: res.data });
        });
    }
}

export const getOneproduct = (id) => {
    return (dispatch) => {
        return axios.get(`http://localhost:8080/getoneproduct/${id}`).then((res) => {
            dispatch({ type: GET_ONEPRODUCT, payload: res.data });
        });
    }
}

export const deleteProduct = (id) => {
    return (dispatch) => {
        return axios.delete(`http://localhost:8080/deleteproduct/${id}`).then((res) => {
            dispatch({type: DEL_PRODUCT, payload: res.data})
        })
    }
}
