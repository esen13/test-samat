import {CREATE_TRANSACTION, FETCH_TRANSACTION, REMOVE_TRANSACTION} from "./types";

const initialState = {
    transactions: []
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
        default:
            return state;
    }
};