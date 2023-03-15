import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext, GlobalContext } from '../../../App';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { SideBar } from '../../Navigation/Sidebar';
import "./styles.css";

export type room = {
    id: number,
    BetLevel: number,
    Host: string,
    Players: number
}

export const GameRoom = () => {
    const socket = useContext(SocketContext);
    const globalContext = useContext(GlobalContext);
    const navigate = useNavigate();
    const [rooms, setRooms] = useState<room[]>([]);

    const handleClick = () => {
        navigate('/');
    }

    const handleFetchRoom = async () => {
        let data = null;
        try {
            const response = await fetch("https://640a9ab781d8a32198cc1706.mockapi.io/api/room", {
                // http://localhost:3001
                method: 'GET',
                headers: {
                    "Content-type": "application/json"
                }
            })
            data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        setRooms(data);
        console.log(rooms);
    }

    useEffect(() => {
        console.log(rooms);
    }, [rooms])

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
                    <div>
                        <table style={{ border: '1px solid black' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Host</th>
                                    <th>Number of Player</th>
                                    <th>Bet Level</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rooms.length !== 0 && rooms.map((x, index) => <tr key={index}>
                                        <td>{x.id}</td>
                                        <td>{x.Host}</td>
                                        <td>{x.Players % 4 + 1}/4   </td>
                                        <td>{x.BetLevel}</td>
                                        <td>
                                            <button>Join Room</button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameRoom;