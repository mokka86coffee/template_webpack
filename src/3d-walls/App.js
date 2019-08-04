import React, { useState } from 'react';
import Header from './components/header';

const App = (props) => {
    const [animate, setAnimate] = useState(false);
    return (
        <React.Fragment>
            <button onClick={ () => setAnimate(!animate) }>setAnimation</button>
            <Header animate={animate} setAnimate={setAnimate} />
        </React.Fragment>
    )
}

export default App;