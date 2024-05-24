import {Table} from 'react-bootstrap';
import useStore from "../stores/store";

function TransactionTable({account}) {
    const {transactions} = useStore();
    const revTransactions = [...(transactions[account] || [])].reverse();

    return (
        <Table hover className="border-top border-bottom" style={{fontSize: '0.8rem'}}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Type</th>
                <th className="text-center">Date</th>
                <th className="text-end">Amount</th>
                <th className="text-end">Balance</th>
            </tr>
            </thead>
            <tbody>
            {revTransactions.map((transaction, index) => (
                <tr key={index}>
                    <td>{transaction.id}</td>
                    <td>{transaction.type}</td>
                    <td className="text-center">{transaction.date}</td>
                    <td className="text-end">${parseFloat(transaction.amount).toFixed(2)}</td>
                    <td className="text-end">${parseFloat(transaction.balance).toFixed(2)}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default TransactionTable;