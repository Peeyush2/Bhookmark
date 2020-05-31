import React from 'react';
import Signin from '../Signin/signin'
import Signup from '../Signup/signup'
import Chat from '../Dashboard/Chat/Chat'
import Home from '../Home/home'
import RequestOutgoing from '../Dashboard/Requests/RequestOutgoing/Requestout'
import {BrowserRouter , Route} from 'react-router-dom'
import 'firebase/auth'
import 'firebase/firestore'
import './App.css';
import Dashboard from '../Dashboard/dashboard'
import requestIncoming from '../Dashboard/Requests/RequestIncoming/requestIncoming';
import ShowBook from '../Dashboard/Requests/RequestIncoming/ShowBook';

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
              <Route exact path="/chat" component={Chat}/>
              <Route exact path="/reqin" component={requestIncoming}/>
              <Route exact path="/ShowBook/:id/:book" component={ShowBook}/>
              <Route exact path="/reqout" component={RequestOutgoing}/>
            </div>
      </BrowserRouter>
    );
}

export default App;
