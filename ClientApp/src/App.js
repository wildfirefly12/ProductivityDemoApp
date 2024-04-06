import React, {Component, useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import './custom.css';
import Tasks from "./components/tasks/Tasks";
import NavBar from "./components/navigation/NavBar";
import {createTheme, ThemeProvider} from "@mui/material";
import axios from "axios";
import {CookiesProvider, useCookies} from "react-cookie";
import Login from "./components/authentication/Login";
import Notes from "./components/notes/Notes";
import Lists from "./components/lists/Lists";

const App = () =>  {

    const theme = createTheme({
        palette: {
            primary: {
                main: "#C0CBA5"
            },
            secondary: {
                main: "#FFCCAA"
            }
        }
    })

    const [cookies, removeCookie] = useCookies(["jwt"]);
    const token = 'Bearer ' + cookies.jwt;

    const navigate = useNavigate();

    const config = {
        headers: {
            'Content-Type': 'application/json-patch+json',
            'Authorization': token,
        }
    }

    const [user, setUser] = useState(null);

    const handleSetUser = (user) => {
        setUser(user);
    }

    useEffect(() => {
        if(cookies.jwt != "undefined"){
            axios.get('/api/Account/CurrentUser', config)
                .then(async function (response){
                    setUser(response.data);
                }).catch(async function (error) {
                    console.log(error);
            });
        }
    }, []);
    
    const [updated, setUpdated] = useState(0);
    
    const handleSetUpdated = () => {
        setUpdated(updated + 1);
    }

    return (
        <ThemeProvider theme={theme}>
            {user ? <div className={"app-container"}>
                <NavBar id={user.id} updated={updated}/>
                <Routes>
                    <Route path={"tasks/:type"} element={<Tasks id={user.id} config={config}/>}/>
                    <Route path={"notes/:id"} element={<Notes id={user.id} config={config} updateAll={handleSetUpdated} navigate={navigate}/>}/>
                    <Route path={"lists/:id"} element={<Lists id={user.id} config={config} updateAll={handleSetUpdated} navigate={navigate}/>}/>
                </Routes>
            </div> :
            <Login config={config} handleSetUser={handleSetUser} navigate={navigate}/>}
        </ThemeProvider>
    );
}

export default App
