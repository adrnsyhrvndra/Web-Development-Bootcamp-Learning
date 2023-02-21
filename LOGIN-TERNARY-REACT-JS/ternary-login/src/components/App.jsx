import React from "react";

import Login from "./Login";

var isLoggedIn = true;

const currentTime = new Date().getHours();

function App() {

    return (

        <div className="container">

            {isLoggedIn === true ? <h1>Hello</h1> : <Login/>}

        </div>

    );

}

export default App;
