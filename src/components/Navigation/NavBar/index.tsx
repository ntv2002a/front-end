import React from "react";
import logo from '../../../Aura-logo-6.png';
import '../../../App.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { WalletConnection } from "../../Wallet/Connection";
import { SigningStargateClient } from "@cosmjs/stargate";
import { AccountData } from "@keplr-wallet/types";
import "./styles.css";

export const NavBar = () => {

  let [signingClient, setSigningClient] = React.useState<SigningStargateClient | null>(null);
  let [account, setAccount] = React.useState<AccountData | null>(null);
  let [balance, setBalance] = React.useState<number>(NaN);
  let [user, setUser] = React.useState<string>('');

  const functionSignOut = () => {
    setSigningClient(null);
    setAccount(null);
    setBalance(NaN);
    setUser('');
  }

  const showInfo = () => {
    alert("User: " + user + "\n" + "Address: " + address + "\n" + "Balance: " + balance + "eaura");
  }

  const address: string | undefined = account?.address;

  if (signingClient == null) {
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
              <WalletConnection setSigningClient={setSigningClient} setAccount={setAccount} setBalance={setBalance} setUser={setUser} />
            </Nav>
          </Container>
        </Navbar>
        <br />
      </div>
    );
  }
  else {
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
              <DropdownButton variant="outline-light" id="dropdown-basic-button" title={user}>
                <Dropdown.Item className="Dropdown-item" onClick={showInfo}>Info</Dropdown.Item>
                <Dropdown.Item className="Dropdown-item" onClick={functionSignOut}>Sign Out</Dropdown.Item>
              </DropdownButton>
            </Nav>
          </Container>
        </Navbar>
        <br />
      </div>
    );
  }
}