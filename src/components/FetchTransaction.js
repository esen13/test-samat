import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Transaction} from "./Transaction";
import {Loader} from "./Loader";
import {loadFetchTransactions} from "../redux/actions";
import {Link} from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const FetchTransaction = () => {
    const [token] = useLocalStorage('tokenId');
    const dispatch = useDispatch();
    const fetchTransactions = useSelector(state => {
        return state.transactions.transactions
    });
    const loading = useSelector(state => {
        return state.app.loading
    });

    if(!token) {
        return <h5 className="text-center mt-5">Чтобы посмотреть транзакции авторизуйтесь,<br/> <Link to={'/login'}> страница авторизации </Link> </h5>
    }

    if(loading) {
        return <Loader/>
    }

    if(!fetchTransactions.length) {
        return (
            <div className="text-center mt-5">
                <button
                    className="btn btn-primary"
                    onClick={() => dispatch(loadFetchTransactions())}
                >
                    Загрузить транзакции
                </button>
            </div>
        )
    }

    const transactionItem = fetchTransactions.map(transaction => <Transaction transaction={transaction} key={transaction.id} />);

    return(
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
    )
};

export default FetchTransaction;