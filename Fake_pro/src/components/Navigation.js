import { ethers } from 'ethers';
import './app.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ account, setAccount, setUser, user, setUserName }) => {
    function showErrorMessage(error) {
        alert(`An error occurred while connecting to MetaMask: ${error.message}`);
    }
    
    const navigate = useNavigate();
    
    const handleLogout = () => {               
        signOut(auth).then(() => {
            setUser("");
            setUserName("")
            setAccount("")
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

    const connectHandler = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = ethers.utils.getAddress(accounts[0]);
            setAccount(account);
        } catch(error) {
            console.log(error);
            showErrorMessage(error);
        }
    }

    if (user === "customer") {
        return (
            <div className="customer-navigation">
                {account ? (
                                <button
                                    type="button"
                                    className='button__toggle'
                                >
                                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className='button__toggle'
                                    onClick={connectHandler}
                                >
                                    Connect
                                </button>
                            )}
                <button
                    type="button"
                    className='button__toggle'
                    onClick={handleLogout}
                >
                    Exit
                </button>
            </div>
        );
    }

    return (
        <div>
            <nav className='nav container'>
                <a href="/" className="nav__logo">Product Verifier</a>
                <div className='nav__menu'>
                    <ul className='nav__list grid'>
                        <li className='nav__item'>
                            <Link className='nav__link' to="/">Home</Link>
                        </li>
                        <li className='nav__item'>
                            <Link className='nav__link' to="createcontract">CreateContract</Link>
                        </li>
                        <li className='nav__item'>
                            <Link className='nav__link' to="getcontract">FetchAddress</Link>
                        </li>
                        <li className='nav__item'>
                            <Link className='nav__link' to="addproduct">AddProducts</Link>
                        </li>
                        <li className='nav__item'>
                            <Link className='nav__link' to="verify">VerifyProduct</Link>
                        </li>
                        <li>
                            {account ? (
                                <button
                                    type="button"
                                    className='button__toggle'
                                >
                                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className='button__toggle'
                                    onClick={connectHandler}
                                >
                                    Connect
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
            <button
                type="button"
                className='button__toggle'
                onClick={handleLogout}
            >
                Log Out
            </button>
        </div>
    );
}

export default Navigation;
