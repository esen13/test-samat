import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Transaction} from "./Transaction";
import {Loader} from "./Loader";
import {loadFetchTransactions} from "../redux/actions";
import {Link} from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const FetchTransaction = ({loadFetchTransactions, loading, fetchTransactions}) => {
    const [token] = useLocalStorage('tokenId');

    useEffect(() => {
        if(!fetchTransactions.length) {
            loadFetchTransactions();
        }
        // eslint-disable-next-line
    }, []);

    if(loading) {
        return <Loader/>
    }

    if(!token) {
        return <h5 className="text-center mt-5">Чтобы посмотреть транзакции авторизуйтесь,<br/> <Link to={'/login'}> страница авторизации </Link> </h5>
    }


    const transactionItem = fetchTransactions.map(transaction => <Transaction transaction={transaction} key={transaction.id} />);

    return(
        <>
            {fetchTransactions.length ? (
                <table className="table mt-5">
                    <thead>
                    <tr>
                        <th scope="col">Сумма</th>
                        <th scope="col">Названия банка</th>
                        <th scope="col"/>
                    </tr>
                    </thead>
                    <tbody>
                    {transactionItem}
                    </tbody>
                </table>
            ) : <h5 className="text-center mt-5">нет транзакции</h5>}

        </>
    )
};

const mapDispatchToProps = {
    loadFetchTransactions
};

const mapStateToProps = (state) => ({
    alert: state.app.alert,
    loading: state.app.loading,
    fetchTransactions: state.transactions.transactions
});

export default connect(mapStateToProps, mapDispatchToProps)(FetchTransaction);