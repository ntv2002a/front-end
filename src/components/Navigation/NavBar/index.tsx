import React, { useEffect } from "react";
import logo from '../../../Aura-logo-6.png';
import '../../../App.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { WalletConnection } from "../../Wallet/Connection";
import { SigningStargateClient } from "@cosmjs/stargate";
import { AccountData } from "@keplr-wallet/types";
import "./styles.css";
import { error } from "console";

export const NavBar = () => {

  let [signingClient, setSigningClient] = React.useState<SigningStargateClient | null>(null);
  let [account, setAccount] = React.useState<AccountData | null>(null);
  let [balance, setBalance] = React.useState<number>(NaN);
  let [username, setUsername] = React.useState<string>('');

  const functionSignOut = () => {
    setSigningClient(null);
    setAccount(null);
    setBalance(NaN);
    setUsername('');
  }

  useEffect(() => {
    if (username !== "" || signingClient !== null) {
      fetch("http://192.168.10.68:3001/sign-in", {
      method: 'POST',
      body: JSON.stringify({ username, address }),
      headers: {
        "Content-type": "application/json"
      },
    }).then(() => {
      //process data

    }).catch((error) => {
      console.log(error);
    });
    }
    
  }, [username])

  const showInfo = () => {
    alert("User: " + username + "\n" + "Address: " + address + "\n" + "Balance: " + balance + "eaura");
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
              <WalletConnection setSigningClient={setSigningClient} setAccount={setAccount} setBalance={setBalance} setUser={setUsername} />
            </Nav>
          </Container>
        </Navbar>
        <br />
      </div>
    );
  }
  else {
    localStorage.setItem('user', JSON.stringify({ username, address }));

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
              <DropdownButton variant="outline-light" id="dropdown-basic-button" title={username}>
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

export default NavBar;