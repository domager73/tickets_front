import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Form} from "antd";
import AuthApi from "../api/AuthApi";

const Login = () => {
    const navigate = useNavigate();
    const apiAuth = new AuthApi();

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');


    return (
        <div>
            login
            <input type='text' value={email} onChange={(event) =>
                setEmail(event.target.value)
            }/>
            <Button onClick={() => {
                apiAuth.login(email);
            }}>send code</Button>
            <input type='text' value={code} onChange={(event) =>
                setCode(event.target.value)
            }/>
            <Button onClick={async () => {
                try {
                    await apiAuth.verifyLogin(email, code)

                    navigate('main', {replace: false});

                } catch (e) {
                    setCode('')
                }
            }}>login/auth</Button>
        </div>
    );
};

export default Login;