import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";

import {TopBar} from "./components/TopBar";
import Routers from "./pages/routers";

function App() {
  return (
    <div className="app-page">
        <Router>
            <TopBar/>
            <Routers/>
        </Router>
    </div>
  );
}

export default App;
