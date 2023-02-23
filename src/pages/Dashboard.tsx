import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { SideBar } from '../components/Sidebar';
import { Stack } from 'react-bootstrap';


export const Dashboard = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    return (
        <div className='App' style={{paddingLeft: "300px"}}>
            <Stack direction='horizontal' gap={2}>
                <div className='bg'>
                    <ProSidebarProvider>
                        <SideBar />
                    </ProSidebarProvider>
                </div>
                <div className='bg'>
                    <h1>Nội Dung Chính</h1>
                </div>{xcxcxcxc}
            </Stack>
        </div>
    );
}