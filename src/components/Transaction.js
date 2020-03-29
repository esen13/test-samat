import React from "react";
import {removeTransaction} from "../redux/actions";
import {useDispatch} from "react-redux";

export const Transaction = ({transaction}) => {
    const dispatch = useDispatch();

    let bankName;
    const transactionBankID = Number(transaction.bankId);

    if(transactionBankID === 1) {
        bankName = 'Бай-тушум'
    } else if(transactionBankID === 2) {
        bankName = 'Оптима'
    } else if (transactionBankID === 3) {
        bankName = 'КИКБ'
    } else {
        bankName = 'Неизвестно банк'
    }

    return (
        <tr>
            <td>{transaction.amount}</td>
            <td>Банк: {bankName}</td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => dispatch(removeTransaction(transaction.id))}
                >
                    &times;
                </button>
            </td>
        </tr>
    )
};