import React from 'react';
import './App.css';
import girlphoto from './Assets/Images/woman-in-blue-striped-flannel-shirt-holding-a-book-indoors-698928.jpg'

function App() {
  return (
    <div className="App" >
      <header className="App-header">
      </header>
      <div className="backphoto" style={{backgroundImage:`url(${girlphoto})`}}></div>
    </div>
  );
}

export default App;
