import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Backoffice from './pages/Backoffice';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/backoffice' element={<Backoffice />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;

