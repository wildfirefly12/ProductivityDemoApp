import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import './custom.css';
import Tasks from "./components/tasks/Tasks";
import NavBar from "./components/navigation/NavBar";
import {createTheme, ThemeProvider} from "@mui/material";

export default class App extends Component {
    static displayName = App.name;
       
    render() {

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

        return (
            <ThemeProvider theme={theme}>
                <div className={"app-container"}>
                    <NavBar/>
                    <Routes>
                        <Route path={"tasks/:type"} element={<Tasks />} />
                    </Routes>
                </div>
            </ThemeProvider>
        );
    }
}
