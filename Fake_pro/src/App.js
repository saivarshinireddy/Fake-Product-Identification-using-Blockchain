import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import VerifyProduct from './components/VerifyProduct';
import AddProduct from './components/AddProduct';
import GetContract from './components/GetContract';
import CentralABI from './abis/Cental_ABI.json';
import DeployContract from './components/DeployContract';
import { ethers } from 'ethers';
import { auth } from './firebase';
import Home2 from './components/Home2/Home2';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import './App.css';

const App = () => {
  const [userName, setUserName] = useState('');
  const [provider, setProvider] = useState(null);
  const [central, setCentral] = useState(null);
  const [account, setAccount] = useState(null);
  const [user,setUser]=useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((use) => {
      if (use) {
        setUserName(use.displayName);
      } else {
        setUserName('');
      }
      if(user==='customer'){
        setUserName("eligible");
      }
    });
  }, []);

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        setProvider(provider);

        const central = new ethers.Contract(
          '0x881c9b0980c100d44e3Cf914Cd6E851D66716249',
          CentralABI,
          signer
        );
        setCentral(central);
      } catch (error) {
        console.log(error);
        showErrorMessage(error);
      }
    };

    loadBlockchainData();
  }, []);

  function showErrorMessage(error) {
    alert(
      `An error occurred while connecting to MetaMask: ${error.message} '\n' 'Check if you have metamask wallet installed'`
    );
  }

  

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="*"
            element={(userName==='') ? <Home2 user={user} setUser={setUser} setUserName={setUserName}/> : (
              <>
                <Navigation account={account} provider={provider} central={central} setAccount={setAccount} setUser={setUser} user={user} setUserName={setUserName}/>
                <Routes>
                  <Route path="/" element={<Home user={user}/>} />
                  <Route
                    path="/createcontract"
                    element={<DeployContract account={account} provider={provider} central={central} />}
                  />
                  <Route
                    path="/getcontract"
                    element={<GetContract account={account} provider={provider} central={central} />}
                  />
                  <Route
                    path="/addproduct"
                    element={<AddProduct account={account} provider={provider} central={central} />}
                  />
                  <Route
                    path="/verify"
                    element={<VerifyProduct account={account} provider={provider} central={central} />}
                  />
                </Routes>
              </>
            )}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
