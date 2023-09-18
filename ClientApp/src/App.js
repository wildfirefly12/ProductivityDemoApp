import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';
import NavBar from "./components/navigation/NavBar";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
        <div>
          <NavBar/>
          <Routes>
{/*            {AppRoutes.map((route, index) => {
              const { element, requireAuth, ...rest } = route;
              return <Route key={index} {...rest} element={requireAuth ? <Route {...rest} element={element} /> : element} />;
            })}*/}
          </Routes>
        </div>
    );
  }
}
