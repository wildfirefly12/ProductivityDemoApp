import "./Login.css";

import React, {useState} from "react";
import {useCookies} from "react-cookie";
import {Button, FormControl, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import axios from "axios";

const Login = (props) => {
    const [cookies, setCookie] = useCookies([]);

    const handleSetCookie = (token) => {
        setCookie("jwt", token, {
            path: "/"
        })
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSetEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleSetPassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmitForm = async (event) => {
        let loginDto = {
            Email: email,
            Password: password
        }
        axios.post('/api/Account/Login', loginDto, props.config)
            .then(function (response) {
                let user = response.data;
                if(user.token != null) {
                    handleSetCookie(user.token);
                    props.handleSetUser(user);
                    props.history.push("/")
                }
            }).catch(function (error) {
            console.log(error);
        });
    }
    
    return (
        <div className={"login-container"}>
            <FormControl className={"login-form"} sx={{padding: 2}}>
                <TextField label={"Email"} variant={"outlined"} size={"small"} required onChange={handleSetEmail}/>
                <TextField label={"Password"} variant={"outlined"} size={"small"} margin={"normal"} required type={"password"} onChange={handleSetPassword}/>
                <Link to={"/forgotPassword"}>Forgot password</Link>
                <Button sx={{marginTop: "20px"}} variant={"contained"} color={"secondary"} onClick={handleSubmitForm}>Login</Button>
            </FormControl>
        </div>
    )
}

export default Login