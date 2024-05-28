import {Table} from 'react-bootstrap';
import useStore from "../stores/store";

function TransactionTable() {
    const {user} = useStore();
    const revTransactions = [...(user.About.Accounts.Saving.Transactions)].reverse();

    return (
        <Table hover className="border-top border-bottom" style={{fontSize: '0.8rem'}}>
            <thead>
            <tr>
                <th>Type</th>
                <th className="text-center">Date</th>
                <th className="text-end">Amount</th>
                <th className="text-end">Balance</th>
            </tr>
            </thead>
            <tbody>
            {revTransactions.map((transaction, index) => (
                <tr key={index}>
                    <td>{transaction.Description}</td>
                    <td className="text-center">{transaction.Date}</td>
                    <td className="text-end">${parseFloat(transaction.Amount).toFixed(2)}</td>
                    <td className="text-end">${parseFloat(transaction.Balance).toFixed(2)}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default TransactionTable;