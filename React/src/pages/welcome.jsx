import React, { cloneElement, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import { AuthContext } from '../components/context/auth.context';

const WelcomePage = () => {
    const [count, setCount] = useState(6);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev > 0) return prev - 1;
                clearInterval(timer);
                return 0;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (count === 0) {
            navigate('/');
        }
    }, [count, navigate]);

    return (
        <>
            <div style={{ textAlign: "center" }} className="body">
                <span style={{ fontSize: 35 }}>
                    Chào mừng {user.name} đến với KTN3!
                </span>
                <br /><br />
                <span style={{ fontSize: 30 }}>
                    Bạn sẽ được chuyển hướng tới trang chủ sau
                </span>
                <br /><br />
                <div className="timer-container" style={{ marginTop: 20, textAlign: "center" }}>
                    {count - 1}
                </div>
            </div>
        </>
    );
};

export default WelcomePage;
