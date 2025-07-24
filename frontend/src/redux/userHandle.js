import API from "../api/axios";
import {
    authRequest,
    authSuccess,
    authFailed,
    authError,
    stuffAdded,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
    productSuccess,
    productDetailsSuccess,
    getProductDetailsFailed,
    getProductsFailed,
    setFilteredProducts,
    getSearchFailed,
    sellerProductSuccess,
    getSellerProductsFailed,
    stuffUpdated,
    updateFailed,
    getCustomersListFailed,
    customersListSuccess,
    getSpecificProductsFailed,
    specificProductSuccess,
    updateCurrentUser,
} from './userSlice';

// Helper to handle errors safely
const handleError = (dispatch, action, error) => {
    console.error(error);
    dispatch(action(error?.message || "Something went wrong"));
};

export const authUser = (fields, role, mode) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const result = await API.post(`/${role}${mode}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.role) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        handleError(dispatch, authError, error);
    }
};

export const addStuff = (address, fields) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const result = await API.post(`/${address}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded());
        }
    } catch (error) {
        handleError(dispatch, authError, error);
    }
};

export const updateStuff = (fields, id, address) => async (dispatch) => {
    try {
        const result = await API.put(`/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.message) {
            dispatch(updateFailed(result.data.message));
        } else {
            dispatch(stuffUpdated());
        }
    } catch (error) {
        handleError(dispatch, getError, error);
    }
};

export const deleteStuff = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await API.delete(`/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getDeleteSuccess());
        }
    } catch (error) {
        handleError(dispatch, getError, error);
    }
};

export const updateCustomer = (fields, id) => async (dispatch) => {
    dispatch(updateCurrentUser(fields));
    const newFields = { ...fields };
    delete newFields.token;
    try {
        await API.put(`/CustomerUpdate/${id}`, newFields, {
            headers: { 'Content-Type': 'application/json' },
        });
        dispatch(stuffUpdated());
    } catch (error) {
        handleError(dispatch, getError, error);
    }
};

export const getProductsbySeller = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await API.get(`/getSellerProducts/${id}`);
        if (result.data.message) {
            dispatch(getSellerProductsFailed(result.data.message));
        } else {
            dispatch(sellerProductSuccess(result.data));
        }
    } catch (error) {
        handleError(dispatch, getError, error);
    }
};

export const getProducts = () => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await API.get(`/getProducts`);
        if (result.data.message) {
            dispatch(getProductsFailed(result.data.message));
        } else {
            dispatch(productSuccess(result.data));
        }
    } catch (error) {
        handleError(dispatch, getError, error);
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await API.get(`/getProductDetail/${id}`);
        if (result.data.message) {
            dispatch(getProductDetailsFailed(result.data.message));
        } else {
            dispatch(productDetailsSuccess(result.data));
        }
    } catch (error) {
        handleError(dispatch, getError, error);
    }
};

export const getCustomers = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await API.get(`/${address}/${id}`);
        if (result.data.message) {
            dispatch(getCustomersListFailed(result.data.message));
        } else {
            dispatch(customersListSuccess(result.data));
        }
    } catch (error) {
        handleError(dispatch, getError, error);
    }
};

export const getSpecificProducts = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await API.get(`/${address}/${id}`);
        if (result.data.message) {
            dispatch(getSpecificProductsFailed(result.data.message));
        } else {
            dispatch(specificProductSuccess(result.data));
        }
    } catch (error) {
        handleError(dispatch, getError, error);
    }
};

export const getSearchedProducts = (address, key) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await API.get(`/${address}/${key}`);
        if (result.data.message) {
            dispatch(getSearchFailed(result.data.message));
        } else {
            dispatch(setFilteredProducts(result.data));
        }
    } catch (error) {
        handleError(dispatch, getError, error);
    }
};
