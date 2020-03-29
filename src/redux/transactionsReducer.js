import {CREATE_TRANSACTION, FETCH_BANK_LIST, FETCH_TRANSACTION, REMOVE_TRANSACTION} from "./types";

const initialState = {
    transactions: [],
    bankList: []
};

export const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TRANSACTION:
            return { ...state, transactions: state.transactions.concat([action.payload]) };
        case FETCH_TRANSACTION:
            return { ...state, transactions: action.payload};
        case REMOVE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            };
        case FETCH_BANK_LIST:
            return { ...state, bankList: action.payload};
        default:
            return state;
    }
};