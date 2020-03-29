import React from "react";

export const OptionItem = ({bankLists}) => {

    let bankName;
    const bankListID = Number(bankLists.title);

    if(bankListID === 1) {
        bankName = 'Бай-тушум'
    } else if(bankListID === 2) {
        bankName = 'Оптима'
    } else if (bankListID === 3) {
        bankName = 'КИКБ'
    } else {
        bankName = 'Неизвестно банк'
    }

    return (
        <>
            <option value={bankListID}>{bankName}</option>
        </>
    )
};