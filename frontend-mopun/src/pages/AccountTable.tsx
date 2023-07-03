import React, { useEffect, useState } from 'react';

// Define the shape of an account
interface Account {
    id: number;
    username: string;
    password: string;
    privilege: string;
}

// Define the component
function AccountTable() {
    // Define a state variable to store the accounts
    const [accounts, setAccounts] = useState<Account[]>([]);

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
    async function getAccounts(): Promise<Account[]> {
        const response = await fetch('https://localhost:7056/api/Accounts');
        if (!response.ok) {
            throw new Error('Failed to fetch accounts');
        }
        return response.json();
    }

    // Render the account table
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Privilege</th>
                </tr>
            </thead>
            <tbody>
                {/* Map over the accounts and render each account as a table row like for loop */}
                {accounts.map((account) => (
                    <tr key={account.id}>
                        <td>{account.id}</td>
                        <td>{account.username}</td>
                        <td>{account.password}</td>
                        <td>{account.privilege}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default AccountTable;
