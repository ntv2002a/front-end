import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { SideBar } from '../../Navigation/Sidebar';
import { GlobalContext, SocketContext } from '../../../App';
import { RoomSet } from '../../../type';


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

    return (
        <div className='App-dashboard'>
            <div>
                <ProSidebarProvider>
                    <SideBar />
                </ProSidebarProvider>
                <div>
                    <h1 style={{ textAlign: "center" }}>Nội Dung Chính</h1>
                    <button onClick={handleClick}>Go Back to Home</button>
                    

                </div>
            </div>
        </div>
    );
}