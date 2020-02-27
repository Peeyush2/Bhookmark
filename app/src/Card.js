import React,{Component} from 'react';
import './CSS/Card.css'
function Cards1(){
    var sign = ['email','password'];
    return(
        
      <div className="outerCard">
          <div className="Card">
          <div className="logintext">Login</div>
          <div className="entertext">Enter your details to login</div>
          <div className="fields">
            <input className="field" placeholder= "email/mobile"/><br/>
            <input className="field" type= "password" placeholder="password"/>
        </div>
        <div className="forgottext">Forgot Password?</div>
        <div className="or">
            OR
        </div>
        </div>
    </div>
    )
}
export default Cards1;