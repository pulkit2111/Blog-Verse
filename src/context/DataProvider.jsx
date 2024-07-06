import { createContext, useState , useEffect} from "react"

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    // Retrieve account data from localStorage if available, otherwise initialize with empty values
    const [account, setAccount] = useState(() => {
        const storedAccount = localStorage.getItem('account');
        return storedAccount ? JSON.parse(storedAccount) : { email: '', name: '', picture: '' };
    });

    // Update localStorage whenever account state changes
    useEffect(() => {
        localStorage.setItem('account', JSON.stringify(account));
    }, [account]);

    return (
        <DataContext.Provider value={{
            account,
            setAccount
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;