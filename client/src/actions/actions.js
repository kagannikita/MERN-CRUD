import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    SAVE_PRODUCTS_SUCCESS,
    SAVE_PRODUCTS_ERROR,
    EDIT_PRODUCTS_SUCCESS,
    EDIT_PRODUCTS_ERROR,
    DELETE_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_ERROR,
} from "./../types/types";
import axios from 'axios';
export const getProducts = () => (dispatch) => {
    axios.get('http://localhost:3001/api/products')
        .then((response) => {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                data: response.data.products
            });
        }).catch((error) => {
        console.log(error);
        dispatch({
            type: GET_PRODUCTS_ERROR,
            message: error.response.message || 'INTERNAL SERVER ERROR'
        });
    })
};
export const saveProduct = (addName, addDescription, addCountry,addPrice, addValue, saveImage, changeState) => (dispatch) => {
    const fd = new FormData();
    fd.append('name', addName);
    fd.append('description', addDescription);
    fd.append('country', addCountry);
    fd.append('price', addPrice);
    fd.append('value', addValue);
    fd.append('file', saveImage);
    axios.post('http://localhost:3001/api/products', fd).then((success) => {
        const savedProduct = success.data.savedProduct;
        dispatch({
            type: SAVE_PRODUCTS_SUCCESS,
            data: savedProduct
        });
        changeState()
    }).catch((error) => {
        console.log(error);
        dispatch({
            type: SAVE_PRODUCTS_ERROR,
            message: error.response.message || 'INTERNAL SERVER ERROR'
        })
    });
};
export const editProduct = (id, newProduct, changeState) => (dispatch) => {
    const fd = new FormData();
    fd.append('name', newProduct.name);
    fd.append('description', newProduct.description);
    fd.append('country', newProduct.country);
    fd.append('price', newProduct.price);
    fd.append('value', newProduct.value);
    fd.append('file', newProduct.file);
    axios.put('http://localhost:3001/api/products/' + id, fd)
        .then((success) => {
            const updatedProduct = success.data.updatedProduct;
            dispatch({
                type: EDIT_PRODUCTS_SUCCESS,
                data: updatedProduct,
            });
            changeState();
        })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: EDIT_PRODUCTS_ERROR,
                error: error.message || "ERROR HAPPENED"
            });
        });
};
export const deleteProduct = (id) => (dispatch) => {
    axios.delete('http://localhost:3001/api/products/' + id)
        .then((success) => {
            dispatch({
                type: DELETE_PRODUCTS_SUCCESS,
                data: id,
            });
        }).catch((error) => {
        console.log(error);
        dispatch({
            type: DELETE_PRODUCTS_ERROR,
            error: error.message || "ERROR HAPPENED"
        });
    });
};
