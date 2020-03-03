import React,{Component} from 'react';
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
      <div className="App" >
        <header className="App-header"/>
        <Cards1/>
        <div className="backphoto" style={{backgroundImage:`url(${girlphoto})`}}/>
      </div>
    );
  }
}

export default App;
