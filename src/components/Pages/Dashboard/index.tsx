import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { SideBar } from '../../Navigation/Sidebar';
import { GlobalContext, SocketContext } from '../../../App';
import { RoomSet, User } from '../../../type';


export const Dashboard = () => {
    const socket = useContext(SocketContext);
    const globalContext = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    const effectRef = useRef(true);
    useEffect(() => {
        if (effectRef.current) {
            socket.emit('show available room request');
            socket.on('update room set', (roomSet: RoomSet) => {
                console.log(roomSet);
            });


        }
        effectRef.current = false;
    }, [])

    if (globalContext != null) {


        const createRoom = () => {
            let code: number;
            code = Math.random() * 100000;
            let betAmount: number;
            betAmount = 5;
            let address: string | undefined;
            address = globalContext.user?.bech32Address;
            
            socket.emit('create new room request', code, betAmount, address);
        }

        return (
            <div className='App-dashboard'>
                <div>
                    <ProSidebarProvider>
                        <SideBar />
                    </ProSidebarProvider>
                    <div>
                        <h1 style={{ textAlign: "center" }}>Nội Dung Chính</h1>
                        <button onClick={handleClick}>Go Back to Home</button>
                        <button onClick={createRoom}>Create Room</button>

                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                <h1>ERROR!</h1>
            </div>
        )
    }

}