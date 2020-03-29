import {combineReducers} from "redux";
import {transactionsReducer} from "./transactionsReducer";
import {appReducer} from "./appReducer";

export const rootReducer = combineReducers({
    transactions: transactionsReducer,
    app: appReducer
});