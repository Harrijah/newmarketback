import React, { useState } from 'react';
import Connexion from './Connexion';
import Backoffice from './Backoffice';

const Home = () => {
    const [isConnected, setIsConnected] = useState(false);

    return (
        isConnected ? <Backoffice /> : <Connexion connect={setIsConnected} />
    )

}

export default Home;