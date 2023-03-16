import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { SideBar } from '../../Navigation/Sidebar';
import { GlobalContext, SocketContext } from '../../../App';
import { Room, RoomSet, User } from '../../../type';


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
            code = (Math.round(Math.random() * 1000000)) ;
            let betAmount: number;
            betAmount = 5;
            let address: string | undefined;
            address = globalContext.user?.bech32Address;
            
            socket.emit('create new room request', code, betAmount, address);
            
        }

        const joinRoom = () => {
            // let address: string | undefined;
            // address = globalContext.user?.bech32Address;
            // socket.emit('join an existed room request', globalContext.currentRoom?.code, address);
            navigate('/joinroom');
        }

        return (
            <div className='App-dashboard'>
                <div>
                    <ProSidebarProvider>
                        <SideBar />
                    </ProSidebarProvider>
                    <div>
                        <button onClick={createRoom}>Create Room</button>
                        <button onClick={joinRoom}>Join an existed room</button>
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