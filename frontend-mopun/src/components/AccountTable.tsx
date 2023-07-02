import React, { useEffect, useState } from 'react';

interface Account {
    id: number;
    username: string;
    password: string;
    privilege: string;
}

function AccountTable() {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        getAccounts()
            .then((fetchedAccounts) => {
                setAccounts(fetchedAccounts);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
   // 
    async function getAccounts(): Promise<Account[]> {
        const response = await fetch('https://localhost:7056/api/Accounts');
        if (!response.ok) {
            throw new Error('Failed to fetch accounts');
        }
        return response.json();
    }

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
