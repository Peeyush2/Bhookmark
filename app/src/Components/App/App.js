import React from 'react';
import Signin from '../Signin/signin'
import Signup from '../Signup/signup'
import Home from '../Home/home'
import {BrowserRouter , Route} from 'react-router-dom'
import 'firebase/auth'
import 'firebase/firestore'
import './App.css';
import Dashboard from '../Dashboard/dashboard'

function App(){
    return (
      <BrowserRouter>
            <div className="App" >
              <header className="App-header">
              </header>
              <Route exact path = "/" component={Home}/>
              <Route exact path ="/signIn" component={Signin} />
              <Route exact path ="/signUp" component={Signup}/>
              <Route exact path="/dashboard" component={Dashboard}/>
            </div>
      </BrowserRouter>
    );
}

export default App;
