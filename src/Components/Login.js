import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, message} from "antd";
import AuthApi from "../api/AuthApi";
import UserWithCodeModel from "../Models/UserWithCodeModel";
import UserModel from "../Models/User";
import localStorage from "../Repository/localStorage";
import LocalStorage from "../Repository/localStorage";

const Login = () => {
    const navigate = useNavigate();
    const apiAuth = new AuthApi();
    const storage = new LocalStorage();

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');


    return (
        <div>
            login
            <input type='text' value={email} onChange={(event) =>
                setEmail(event.target.value)
            }/>
            <Button onClick={() => {
                apiAuth.login(new UserModel(email));
            }}>send code</Button>
            <input type='text' value={code} onChange={(event) =>
                setCode(event.target.value)
            }/>
            <Button onClick={async () => {
                try {
                    const jwt = await apiAuth.verifyLogin(new UserWithCodeModel(email, code));

                    console.log(jwt['data']);
                    storage.set('jwt', jwt['data']);

                    navigate('main', {replace: false});

                } catch (e) {
                    setCode('');

                    message.error('неверный код');
                }
            }}>login/auth</Button>
        </div>
    );
};

export default Login;