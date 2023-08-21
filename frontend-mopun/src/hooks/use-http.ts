import axios from 'axios';
import { useEffect, useState } from 'react';
import accountTypes from '../types/accountTypes';



const useHttp =(url : string) =>{
    // Define a state variable to store the accounts
    const [accounts, setAccounts] = useState<accountTypes[]>([]);

    // Fetch the accounts when the component mounts
    useEffect(() => {
        getAccounts()
            .then((fetchedAccounts) => {
                // Update the accounts state with the fetched accounts
                setAccounts(fetchedAccounts);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Function to fetch the accounts and consume endpoint from controller
    async function getAccounts(): Promise<accountTypes[]> {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch Accounts');
        }
    }
    return accounts;
}

export default useHttp;