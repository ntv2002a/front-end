import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { NavBar } from './components/Navigation/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './components/Pages/Dashboard';
import { Home } from './components/Pages/HomePage';
import { SigningStargateClient } from '@cosmjs/stargate';
import { Key } from '@keplr-wallet/types';
import _ from 'lodash';
import { io, Socket } from 'socket.io-client';
import { Room, RoomSet } from './type';

export type GlobalContent = {
  user: Key | undefined,
  setUser: React.Dispatch<React.SetStateAction<Key | undefined>>,
  signingClient: SigningStargateClient | null,
  setSigningClient: React.Dispatch<React.SetStateAction<SigningStargateClient | null>>,
  asset: number,
  setAsset: React.Dispatch<React.SetStateAction<number>>,
  functionGlobal: any,
  setFunctionGlobal: React.Dispatch<any>,
  roomSet: RoomSet | null,
  setRoomSet: React.Dispatch<React.SetStateAction<RoomSet | null>>,
  currentRoom: Room | null,
  setCurrentRoom: React.Dispatch<React.SetStateAction<Room | null>>
}

const socket : Socket = io('192.168.10.68:3001/');

export const GlobalContext = createContext<GlobalContent | null>(null);
export const SocketContext = createContext<Socket>(socket);

function App() {

  const [user, setUser] = useState<Key>();
  const [signingClient, setSigningClient] = useState<SigningStargateClient | null>(null);
  const [asset, setAsset] = useState<number>(NaN);
  const [roomSet, setRoomSet] = useState<RoomSet | null>(null);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);


  useEffect(() => {

  }, [])

  useEffect(() => {
    if (signingClient != null) {
      localStorage.setItem('signingClient', JSON.stringify({ signingClient }));
      // handleFetchSignIn();
    }
  }, [signingClient]);

  useEffect(() => {
    if (typeof user != 'undefined') {
      localStorage.removeItem('Last-User-Login')
      localStorage.setItem('Last-User-Login', JSON.stringify({ user, asset }));
    }
  }, [user, asset])

  useEffect(() => {
    if (checkLastLoginUser != null) {
      let rawUser = localStorage.getItem('Last-User-Login');
      let rawSigingClient = localStorage.getItem('signingClient');
      if (rawUser != null) {
        setUser(JSON.parse(rawUser).user);
        setAsset(JSON.parse(rawUser).asset)
      }
      if (rawSigingClient != null) {
        setSigningClient(JSON.parse(rawSigingClient).signingClient)
      }
    }
  }, [])

  const handleFetchSignIn = async () => {
    let username: string = '';
    let address: string = '';

    if (typeof user != 'undefined') {
      username = user.name;
      address = user.bech32Address;
    }
    try {
      const response = await fetch("http://192.168.10.68:3001/sign-in", {
        // http://localhost:3001
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ username, address })
      })

      const data = await response.json();
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.log(error)
    };
  }

  //token holding
  const handleFetchToken = async () => {
    try {
      const token: string | null = localStorage.getItem('token');
      if (token !== null) {
        const response = await fetch("http://192.168.10.68:3001/session-validate", {
          method: 'POST',
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ token })
        })
        const data = await response.json();
        if (!_.isEqual(data, {})) {
          console.log(data);
          if (data.user.address != user?.bech32Address) {
            setUser(undefined)
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleFetchGetDeposit = async () => {
    let data = null;
    try {
      const response = await fetch("http://192.168.10.65:3001/get-verify-token", {
        // http://localhost:3001
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({})
      })
      data = await response.json();
    } catch (error) {
      console.log(error);
    }
    return data;
  }

  const functionSignOut = () => {
    setUser(undefined);
    localStorage.removeItem('signingClient');
    localStorage.removeItem('Last-User-Login');
    localStorage.removeItem('token');
  }

  const checkLastLoginUser = () => {
    let rawUser = localStorage.getItem('Last-User-Login')
    if (rawUser != null) {
      setUser(JSON.parse(rawUser));
      return JSON.parse(rawUser);
    }
    else
      return null;
  }

  async function isKeplr(): Promise<boolean | string> {
    const { keplr } = window;
    if (typeof keplr != 'undefined') {
      const address = (await keplr.getKey('euphoria-2')).bech32Address;
      return address;
    }
    else {
      return false;
    }
  }

  const [functionGlobal, setFunctionGlobal] = useState<any>({ handleFetchSignIn, functionSignOut, handleFetchToken, isKeplr, checkLastLoginUser, handleFetchGetDeposit });
  return (
    <GlobalContext.Provider value={{ user, setUser, signingClient, setSigningClient, asset, setAsset, functionGlobal, setFunctionGlobal, roomSet, setRoomSet, currentRoom, setCurrentRoom }}>
      <BrowserRouter>
        <div className="App">
          <header><NavBar /></header>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/waitingroom" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </GlobalContext.Provider>

  );
}

export default App;
