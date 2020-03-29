import React from "react";
import {connect} from 'react-redux';
import {Transaction} from "./Transaction";

const GlobalTable = ({fetchTransactions}) => {

    if(!fetchTransactions.length) return <p className="text-center mt-5">Нет транзакции</p>;

    const transactionItem = fetchTransactions.map((transaction) => <Transaction transaction={transaction} key={transaction.id}/>);

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Сумма</th>
                                <th scope="col">Названия банка</th>
                                <th scope="col"/>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionItem}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        fetchTransactions: state.transactions.transactions
    }
};

export default connect(mapStateToProps, null)(GlobalTable);


