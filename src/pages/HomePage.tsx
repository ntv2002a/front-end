import React from 'react';
import { NavBar } from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard');
    }

    return (
        <div className="App">
            <div>
                <div>
                    <h1>
                        HomePage
                    </h1>
                    <button onClick={handleClick}>
                        Chuyển đến Dashboad
                    </button>
                </div>
            </div>
        </div>
    );
}