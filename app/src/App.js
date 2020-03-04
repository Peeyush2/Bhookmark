import React,{Component} from 'react';
import fire from './fire'
import Dashboard from './Dashboard'
import SignUpCards from './SignUp'
import {BrowserRouter , Router ,Link, Route} from 'react-router-dom'
import 'firebase/auth'
import 'firebase/firestore'
import Cards1 from './Card'
import './CSS/App.css';
import girlphoto from './Assets/Images/woman-in-blue-striped-flannel-shirt-holding-a-book-indoors-698928.jpg'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      attribute : null
    };
  }
  render(){
    return (
      <BrowserRouter>
            <div className="App" >
              <header className="App-header">
              <Link to="/">Home</Link>
              <Link to="/signIn">Sign In</Link>
              <Link to="/signUp">Sign Up</Link>
              </header>
              
              <Route exact path ="/signIn" component={Cards1} />
              <Route exact path ="/signUp" component={SignUpCards} />
              <div className="backphoto" style={{backgroundImage:`url(${girlphoto})`}}/>
            </div>
      </BrowserRouter>
    );
  }
}

export default App;
