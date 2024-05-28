import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {produce} from "immer";

const useStore = create(persist(
    (set) => ({
        user: null,
        setUser: (user) => set({user}),

        addTransaction: (transaction) => set(produce((state) => {
            state.user.About.Accounts.Saving.Transactions.push(transaction);
        })),

    }),
    {
        name: 'banking-store',
        storage: createJSONStorage(() => sessionStorage),
    }
));

export default useStore;