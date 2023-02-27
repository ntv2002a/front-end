import React from "react";
import logo from '../../Aura-logo-6.png';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { setNodeBalance, WalletConnection } from "../Wallet";
import { SigningStargateClient } from "@cosmjs/stargate";
import { AccountData } from "@keplr-wallet/types";
import { AppFunction } from "../DWFunction";

export const NavBar = () => {
  return (
    <div className="App-navbar">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="">
            <img src={logo} className="App-logo" alt="logo" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="./">Home</Nav.Link>
            <Nav.Link href="./dashboard">Dashboard</Nav.Link>
          </Nav>
          <Nav>
            {DisplayConnect()}
          </Nav>
        </Container>
      </Navbar>
      <br />
    </div>
  );
}

const DisplayConnect = () => {
  let [signingClient, setSigningClient] = React.useState<SigningStargateClient | null>(null);
  let [account, setAccount] = React.useState<AccountData | null>(null);
  let [balance, setBalance] = React.useState<number>(NaN);

  const functionSignOut = () => setSigningClient(null);
  const address: string | undefined = account?.address;

  if (signingClient === null) {
    return (
      <WalletConnection setSigningClient={setSigningClient} setAccount={setAccount} setBalance={setBalance} />
    );
  }
  else {
    console.log('Address: ' + {address});
    console.log('Balance: ' + {balance});
    return (
      <Navbar.Brand>
        Welcome
        <AppFunction setBalance = {setBalance} setNodeBalance = {setNodeBalance} functionSignOut = {functionSignOut}  account = {account} signingClient = {signingClient} />
      </Navbar.Brand>
    );
  }
}