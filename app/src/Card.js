import React,{Component} from 'react';
import './CSS/Card.css';
class Cards1 extends Component{
    constructor(props){
        super(props);
        this.state= {
            email: '',
            password: ""
        }
    }
    updateEmail=(e)=>{
        e.persist();
        console.log(e);
       const value = e.target.value;
        console.log(value)
        this.setState({
            email:e.target.value 
        })
    }
    updatePassword=(e)=>{
        e.persist();
        console.log(e);
       const value = e.target.value;
        console.log(value)
        this.setState({
            password:e.target.value 
        })
    }
    render(){
        return(       
            <div className="outerCard">
                <div className="Card">
                <div className="logintext">Login</div>
                <div className="entertext">Enter your details to login</div>
                <div className="fields">
                  <input 
                  className="field"
                  placeholder= "email/mobile" 
                  value = {this.state.email}
                  onChange={this.updateEmail}/><br/>
                  <input
                   className="field" 
                   value = {this.state.password}
                   onChange = {this.updatePassword}
                   type= "password" 
                   placeholder="password"/>
              </div>
              <div className="forgottext">Forgot Password?</div>
              <div className="or">
                  OR
              </div>
              <div>
                  <button>Login</button>
              </div>
              <div>New here? Create free account</div>
              <div>
                  <a>Help.</a>
                  <a>Privacy.</a>
                  <a>Terms</a>
              </div>
              </div>
          </div>
          )
    }
    
}
export default Cards1;