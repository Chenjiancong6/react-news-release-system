import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// BrowserRouter调用的是H5 history AP
import { BrowserRouter } from 'react-router-dom'
import './utils/http'

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root"))

