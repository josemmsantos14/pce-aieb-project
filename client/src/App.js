import logo from "./logo.svg";
import "./App.css";
import { LoginPage } from "./LoginPage";
import Login from "./components/login";
import React, {useState} from "react"

function App() {
  
  const [currentForm, setCurrentForm] = useState('login');
  return (
    <div className="App">
      <LoginPage />
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</ code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> 
        <Login/>
        <h2>
          <a href="#bottom">Scroll down</a>
        </h2>
      </header>  */}
    </div>
  );
}

export default App;
