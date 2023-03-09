import React, { useContext } from "react";
import logo from '../../../Aura-logo-6.png';
import '../../../App.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { WalletConnection, setNodeBalance } from "../../Wallet/Connection";
import "./styles.css";
import { De_WI } from "../../Wallet/De-Wi";
import { GlobalContext } from "../../../App";

export const NavBar = () => {

  const globalContext = useContext(GlobalContext);

  if (globalContext != null) {
    const {handleFetchSignIn, functionSignOut, handleFetchToken, isKeplr, checkLastLoginUser} = globalContext.functionGlobal;

    const showInfo = () => {
      if (globalContext != null && typeof globalContext.user != 'undefined')
        alert("Username: " + globalContext.user.name + "\nAddress: " + globalContext.user.bech32Address + "\nAsset: " + globalContext.asset);
    }

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
              {(typeof globalContext.user == 'undefined') ? <WalletConnection setSigningClient={globalContext.setSigningClient} setBalance={globalContext.setAsset} setUser={globalContext.setUser} />
                :
                <DropdownButton variant="outline-light" id="dropdown-basic-button" title={globalContext.user.name}>
                  <Dropdown.Item className="Dropdown-item" onClick={showInfo}>Info</Dropdown.Item>
                  <Dropdown.Item className="Dropdown-item">
                    <De_WI setBalance={globalContext.setAsset} setNodeBalance={setNodeBalance} address={globalContext.user.bech32Address} signingClient={globalContext.signingClient} />
                  </Dropdown.Item>
                  <Dropdown.Item className="Dropdown-item" onClick={functionSignOut}>Sign Out</Dropdown.Item>
                </DropdownButton>}

            </Nav>
          </Container>
        </Navbar>
        <br />
      </div>
    )
  }

  return (
    <div><h1>ERROR!</h1></div>
  )


  //   return (
  //     <div className="App-navbar">
  //       <Navbar bg="dark" variant="dark">
  //         <Container>
  //           <Navbar.Brand href="">
  //             <img src={logo} className="App-logo" alt="logo" />
  //           </Navbar.Brand>
  //           <Nav className="me-auto">
  //             <Nav.Link href="./">Home</Nav.Link>
  //             <Nav.Link href="./dashboard">Dashboard</Nav.Link>
  //           </Nav>
  //           <Nav>
  //             <WalletConnection setSigningClient={setSigningClient} setBalance={setBalance} setUser={setUser} />
  //             {/* setAccount={setAccount} */}
  //           </Nav>
  //         </Container>
  //       </Navbar>
  //       <br />
  //     </div>
  //   );
  // }
  // else {
  //   return (
  //     <div className="App-navbar">
  //       <Navbar bg="dark" variant="dark">
  //         <Container>
  //           <Navbar.Brand href="">
  //             <img src={logo} className="App-logo" alt="logo" />
  //           </Navbar.Brand>
  //           <Nav className="me-auto">
  //             <Nav.Link href="./">Home</Nav.Link>
  //             <Nav.Link href="./dashboard">Dashboard</Nav.Link>
  //           </Nav>
  //           <Nav>
  //             <DropdownButton variant="outline-light" id="dropdown-basic-button" title={username}>
  //               <Dropdown.Item className="Dropdown-item" onClick={showInfo}>Info</Dropdown.Item>
  //               <Dropdown.Item className="Dropdown-item">
  //                 <De_WI setBalance={setBalance} setNodeBalance={setNodeBalance} address={address} signingClient={signingClient} />
  //               </Dropdown.Item>
  //               <Dropdown.Item className="Dropdown-item" onClick={functionSignOut}>Sign Out</Dropdown.Item>
  //             </DropdownButton>
  //           </Nav>
  //         </Container>
  //       </Navbar>
  //       <br />
  //     </div>
  //   );
}

export default NavBar;