import React from "react";
import logo from '../../../Aura-logo-6.png';
import '../../../App.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { WalletConnection } from "../../Wallet/Connection";
import { SigningStargateClient } from "@cosmjs/stargate";
import { AccountData } from "@keplr-wallet/types";

export const NavBar = () => {

  let [signingClient, setSigningClient] = React.useState<SigningStargateClient | null>(null);
  let [account, setAccount] = React.useState<AccountData | null>(null);
  let [balance, setBalance] = React.useState<number>(NaN);

  const functionSignOut = () => setSigningClient(null);
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
              <WalletConnection setSigningClient={setSigningClient} setAccount={setAccount} setBalance={setBalance} />
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
              <Button onClick={functionSignOut} size='lg' variant="outline-light">Sign Out</Button>
            </Nav>
          </Container>
        </Navbar>
        <br />
      </div>
    );
  }
}