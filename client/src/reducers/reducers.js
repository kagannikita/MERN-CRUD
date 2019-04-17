import { combineReducers } from 'redux'
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
const initialState = {
    products: [],
};
function products(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.data
            };
        case GET_PRODUCTS_ERROR:
            return {
                ...state,
                error: action.message
            };
        case SAVE_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: state.products.concat([action.data])
            };
        case SAVE_PRODUCTS_ERROR:
            return {
                ...state,
                error: action.message
            };
        case EDIT_PRODUCTS_SUCCESS:
            const copyProducts = state.products.slice();
            const index = copyProducts.findIndex(product => product._id === action.data._id);
            if (index >= 0) {
                copyProducts[index] = action.data;
            }
            return {
                ...state,
                products: copyProducts
            };
        case EDIT_PRODUCTS_ERROR:
            return {
                ...state,
                error: action.error
            };
        case DELETE_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.data),
            };
        case DELETE_PRODUCTS_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}
const reducers = combineReducers({
    products: products
});
export default reducers;
