import React, { useState } from 'react';
import Navigation from '../template-parts/Navigation';
import Footer from '../template-parts/Footer';

const Home = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [connectmyuser, setConnectmyuser] = useState(false);

    return (
        <div className="container">
            <Navigation isConnected={isConnected} setConnectmyuser={ setConnectmyuser } />
            <div className="hpban"></div>
            <Footer isConnected={isConnected} connect={setIsConnected} connectmyuser={connectmyuser} />
        </div>
    )

}

export default Home;