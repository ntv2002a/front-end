import React, { JSXElementConstructor, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext, GlobalContext } from '../../../App';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { SideBar } from '../../Navigation/Sidebar';

export type room = {
    roomId: number,
    betAmount: number,
    host: string,
    numberOfPlayers: number
}

export const GameRoom = () => {
    const socket = useContext(SocketContext);
    const globalContext = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    const handleFetchRoom = async () => {
        let data = null;
        try {
            const response = await fetch("https://640a9ab781d8a32198cc1706.mockapi.io/api/room", {
                // http://localhost:3001
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({})
            })
            data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        return data;
    }

    return (
        <div className='App-dashboard'>
            <div>
                <ProSidebarProvider>
                    <SideBar />
                </ProSidebarProvider>
                <div>
                    <h1 style={{ textAlign: "center" }}>Nội Dung Chính</h1>
                    <button onClick={handleClick}>Go back to Home Page</button>
                    <button onClick={handleFetchRoom}>Test Fetch</button>
                </div>
            </div>
        </div>
    );
}

export default GameRoom;