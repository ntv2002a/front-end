import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { GlobalContext, SocketContext } from '../../../App';
import { SideBar } from '../../Navigation/Sidebar';


export const GameRoom = () => {
    const socket = useContext(SocketContext);
    const globalContext = useContext(GlobalContext);
    const navigate = useNavigate();

    return (
        <div className='App-dashboard'>
                <div>
                    <ProSidebarProvider>
                        <SideBar />
                    </ProSidebarProvider>
                    <div>
                        GameRoom
                    </div>
                </div>
            </div>
    )
}