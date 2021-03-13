import React, { useState, useEffect } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

export function Web3Provider(props){
    const [storageValue, setStorageValue] = useState(0);
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [contract, setContract] = useState(null);

    async function runExample() {
        await contract.methods.set(5).send({ from: accounts[0] });

        // Get the value from the contract to prove it worked.
        const response = await contract.methods.get().call();

        // Update state with the result.
        setStorageValue(response);
    };

    async function initializeApp() {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            setWeb3(web3);
            setAccounts(accounts);
            setContract(instance);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
            return <>Whoops</>
        }
    }
    
    useEffect(() => {
        initializeApp();
    }, []);

    useEffect(() => {
        if(contract){
            runExample();
        }
    }, [contract]);

    if (!web3) {
        return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
        <>
            <h1>Good to Go!</h1>
            <div>The stored value is: {storageValue}</div>
            {props.children}
        </>
    )
}