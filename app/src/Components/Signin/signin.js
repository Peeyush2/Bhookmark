import React,{useState,useEffect} from 'react'
import fire from '../../fire'
import './signincss.css'
//import {Typography,TextField,Card,Button, CardContent} from '@material-ui/core'
import girlimg from './woment.jpg'
import { motion } from 'framer-motion'


 function Signin(props) {
    const [emails,setEmail]=useState('')
    const [passwords,setPassword]=useState('')
    const [results,setResult]=useState('')
    const [usr,setUsr]=useState('')
    useEffect(()=>{
        fire.auth().onAuthStateChanged(setUsr)
        if(usr){
            props.history.push('/dashboard')
        }
    },[usr])
    function LoginUser(){
        fire.auth()
        .signInWithEmailAndPassword(emails,passwords).then(
            (result)=>{
                console.log(result)
                setResult('Success')                
            }
        ).catch(( err)=>{
            setResult(err.message)
        })
    }
    function gotosignup(){
        props.history.push('/signup')
    }
    return (
        <div className='signin-container'>
            <div className = "signin-background1"></div>
            <div className = "signin-background2"></div>
            <motion.div className="signin-block" 
                initial={{y:'-100vw'}}
                animate={{y:0}}
            >
                <div className='signin-content'>
                <div className='block-heading'><h2>Login</h2></div>
                <input
                    className='email-input' 
                    label="Email"   
                    type="email" 
                    value={emails} 
                    placeholder='Email' 
                    onChange={e=>setEmail(e.target.value)}
                    onKeyPress={event=>{
                        if(event.key==='Enter'){
                            LoginUser()
                        }
                    }}
                />
                <p></p>
                <input 
                    className='email-input'  
                    label="Password"   
                    type="password" 
                    value={passwords} 
                    placeholder='Password' 
                    onChange={e=>setPassword(e.target.value)}
                    onKeyPress={event=>{
                        if(event.key==='Enter'){
                            LoginUser()
                        }
                    }}
                    />
                    <p></p>
                <div style={{display:'flex',justifyContent:'center'}}>
                <button className='login-button' onClick={()=>LoginUser()}>Login</button><br/>
                </div>
                <p></p>
                {results && <motion.div style={{display:'flex',justifyContent:'center'}}
                 initial={{x:'-100vw'}}
                 animate={{x:0}}
                >
                <span style={{color:'red'}}>{results}</span><p></p>
                </motion.div>}
                <div style={{display:'flex',justifyContent:'center'}}>
                <span onClick={()=>gotosignup() }style={{cursor:'pointer'}}>New Here? Create free account now!!</span><p></p>
                </div>
                </div>
            </motion.div>
        </div>

    )
}

export default Signin
