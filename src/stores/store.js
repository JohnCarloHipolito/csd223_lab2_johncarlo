import {create} from 'zustand';
import {produce} from "immer";

const useStore = create(set => ({
    balance: 0,
    setBalance: (amount) => set({balance: amount}),
    userName: null,
    setUserName: (name) => set({userName: name}),
    account: null,
    setAccount: (account) => set({account: account}),
    userEmail: null,
    setUserEmail: (email) => set({userEmail: email}),
    transactions: {
        "1234567890": [
            {
                "id": "1",
                "type": "deposit",
                "date": "2024-05-17",
                "amount": 500,
                "balance": 500
            }
        ],
        "0123456789": [
            {
                "id": "1",
                "type": "deposit",
                "date": "2024-05-17",
                "amount": 250,
                "balance": 250
            }
        ]
    },
    setTransactions: (account, transaction) => set(produce((state) => {
        state.transactions[account] = state.transactions[account] || [];
        state.transactions[account].push(transaction);
    })),
}));

export default useStore;