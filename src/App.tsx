import React from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './components/Pages/Dashboard';
import { Home } from './components/Pages/HomePage';
import { setNodeBalance, WalletConnection } from './components/Wallet';
import { AppFunction } from './components/DWFunction';
import { SigningStargateClient } from '@cosmjs/stargate';
import { AccountData } from '@keplr-wallet/types';

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <header><NavBar /></header>
//         <div>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//           </Routes>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

function App() {
  let [signingClient, setSigningClient] = React.useState<SigningStargateClient|null>(null);
  let [account, setAccount] = React.useState<AccountData|null>(null);
  let [balance, setBalance] = React.useState<number>(NaN);
  // let [username, setUsername] = React.useState<String|null >(null);
  const functionSignOut = () => setSigningClient(null);

  const address: string | undefined = account?.address;


  if (signingClient == null) {
    return (
      <div className="App">
        <WalletConnection setSigningClient = {setSigningClient} setAccount = {setAccount} setBalance = {setBalance} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1> WELCOME </h1>
         Address: {account?.address} <br/>
         Balance: {balance} EAURA
        <AppFunction setBalance = {setBalance} setNodeBalance = {setNodeBalance} functionSignOut = {functionSignOut}  account = {account} signingClient = {signingClient} />
      </div>)
  }
  


}

export default App;
