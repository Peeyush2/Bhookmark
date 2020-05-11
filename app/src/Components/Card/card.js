import React, { Component } from 'react'
import './Card.css'
import {Link} from 'react-router-dom'
class Card extends Component{

    //update constructor 
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:""
        }
    }
    

    //update email and phone
    updateEmail=(e)=>{
        e.persist();
       //const value = e.target.value;
        this.setState({
            email:e.target.value 
        })
    }

    //update password
    updatePassword=(e)=>{
        e.persist();
       //const value = e.target.value;
        this.setState({
            password:e.target.value 
        })
    }

    render(){ 
        return(
        <div className="outerCard">
        <div className="Card">
    <div className="logintext">{this.props.logintext}</div>
    <div className="entertext">Enter your details to {this.props.logintext}</div>
        <div className="fields">
          <input 
          className="field"
          placeholder= "Email/Mobile" 
          value = {this.state.email}
          onChange={this.updateEmail}/>
          <br/>
          <input
           className="field" 
           value = {this.state.password}
           onChange = {this.updatePassword}
           type= "password"
           placeholder="Password"/>
      </div>
        <div className="forgottext">{this.props.forgottext}</div>
      <div>
        <button onClick={()=>this.props.loginfun(this.state.email,this.state.password)}>{this.props.logintext}</button>
      </div>
        <div>{this.props.res}</div>
      <div className="or">
          OR
      </div>
        <div style={{color:this.state.colorval}}>{this.state.error}</div>
    <Link to={this.props.otherpagelink}>{this.props.otherpage}</Link>
      <div>
          <a href="#">Help.</a>
          <a href="#">Privacy.</a>
          <a href="#">Terms</a>
      </div>
      </div>
  </div>
    )
}
}

export default Card