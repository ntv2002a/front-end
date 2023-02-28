import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { SideBar } from '../../Navigation/Sidebar';


export const Dashboard = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
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
                </div>
            </div>
        </div>
    );
}