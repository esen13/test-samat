import axios from 'axios';
import {
    CREATE_TRANSACTION,
    FETCH_TRANSACTION,
    HIDE_ALERT,
    HIDE_LOADER,
    REMOVE_TRANSACTION,
    SHOW_ALERT,
    SHOW_LOADER,
    FETCH_BANK_LIST
} from "./types";
const url = process.env.REACT_APP_DB_URL;

export function createTransaction (transaction) {
    return {
        type: CREATE_TRANSACTION,
        payload: transaction
    }
}

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

export function showAlert(text, type = 'warning') {
    return dispatch => {
        dispatch({
            type: SHOW_ALERT,
            payload: {text, type}
        });
        setTimeout(() => {
            dispatch(hideAlert())
        }, 2000)
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}

export const addTransaction = (amount, bankId) => {
    return async dispatch => {
        try {
            const transactions = {
                amount,
                bankId
            };
            const res = await axios.post(`${url}/transactions.json`, transactions);
            const payload = {
                ...transactions,
                id: res.data.name
            };
            dispatch({
                type: CREATE_TRANSACTION,
                payload
            })
        } catch (e) {
            console.log(e.message);
            dispatch(showAlert('Что то пошло не так c добавлением', 'danger'));
            dispatch(hideLoader())
        }
    }
};


export function loadFetchTransactions() {
    return async dispatch => {
        try {
            dispatch(showLoader());
            const res = await axios.get(`${url}/transactions.json`);
            const payload = Object.keys(res.data || []).map(key => {
                return {
                    ...res.data[key],
                    id: key
                }
            });
            dispatch({
                type: FETCH_TRANSACTION,
                payload
            });
            dispatch(hideLoader());
        } catch (e) {
            dispatch(showAlert('Что то пошло не так c server api','danger'));
            dispatch(hideLoader())
        }
    }
}

export function loadFetchBankList() {
    return async dispatch => {
        try {
            dispatch(showLoader());
            const res = await axios.get(`${url}/notes.json`);
            const payload = Object.keys(res.data || []).map(key => {
                return {
                    ...res.data[key],
                    id: key
                }
            });
            console.log(payload, "payload");
            dispatch({
                type: FETCH_BANK_LIST,
                payload
            });
            dispatch(hideLoader());
        } catch (e) {
            dispatch(showAlert('Что то пошло не так c server api','danger'));
            dispatch(hideLoader())
        }
    }
}

export const removeTransaction = (id) => {
    return async dispatch => {
        await axios.delete(`${url}/transactions/${id}.json`);

        dispatch({
            type: REMOVE_TRANSACTION,
            payload: id
        })
    }
};