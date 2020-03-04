import React,{Component} from 'react';
import {BrowserRouter , Router ,Link, Route} from 'react-router-dom'
import fire from './fire'
import './CSS/Card.css';
class SignUpCards extends Component{
    constructor(props){
        super(props);
        this.state= {
            email: '',
            password: "",
            error:"",
            colorval:"green"
        }
    }
    updateEmail=(e)=>{
        e.persist();
       // console.log(e);
       const value = e.target.value;
       // console.log(value)
        this.setState({
            email:e.target.value 
        })
    }
    updatePassword=(e)=>{
        e.persist();
        //console.log(e);
       const value = e.target.value;
       // console.log(value)
        this.setState({
            password:e.target.value 
        })
    }
    LoginUser=(e)=>{
        e.persist();
        fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(
            (result)=>{
                //console.log(result)
                this.setState({
                    error:"Successfully created",
                    colorval:"green"
                })
            }
        ).catch(( err)=>{
            //console.log(err)
             this.setState({
                error:err.message,
                colorval:"red"
             })
        })
    }
    render(){
        return(       
            <div className="outerCard">
                <div className="Card">
                <div className="logintext">SignUp</div>
                <div className="entertext">Enter your details to SignUp</div>
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
                  <button onClick={this.LoginUser}>SignUp</button>
              </div>
                <div style={{color:this.state.colorval}}>{this.state.error}</div>
              <Link to="/signIn">Already have a account.Sign In</Link>
              <Link to="/">Home</Link>
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
export default SignUpCards;