import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Moncompte from './pages/Moncompte';
import Backoffice from './pages/Backoffice';
import Magasin from './Components/Magasin';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/moncompte' element={ <Moncompte /> }></Route>
                <Route path='/backoffice' element={<Backoffice />}></Route>
                <Route path='/magasin' element={<Magasin />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;

