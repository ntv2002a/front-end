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

export const JoinRoom = () => {
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

    const joinRoom = (roomId: number) => {
        if (globalContext != null) {
            let address: string | undefined;
            address = globalContext.user?.bech32Address;
            socket.emit('join an existed room request', address);

            navigate('/gameroom');
        }
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
                                            <button onClick={() => joinRoom(1)}>Join Room</button>
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

export default JoinRoom;