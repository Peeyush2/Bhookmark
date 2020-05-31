import React,{useState,useEffect} from 'react'
import fire from '../../fire'
import './signincss.css'
import {Typography,TextField,Card,Button, CardContent} from '@material-ui/core'


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
    return (
        <Card className="signinblock" style={{alignItems:'center'}}>
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">SignIn</Typography>
            <TextField id="outlined-basic" label="Email" variant="outlined" className='block' type="email" value={emails} placeholder='Email' onChange={e=>setEmail(e.target.value)}/><p></p>
            <TextField id="outlined-basic" label="Password" variant="outlined" className='block' type="password" value={passwords} placeholder='Password' onChange={e=>setPassword(e.target.value)}/><p></p>
            <Button variant='outlined' color='primary'align='center' onClick={()=>LoginUser()}>Sign IN</Button><br/>
            <p></p>
            <Typography>{results}</Typography><p></p>
            </CardContent>
        </Card>

    )
}

export default Signin
/*
        LoginUser=(a,b)=>{
            fire.auth().signInWithEmailAndPassword(a,b).then(
                (result)=>{
                    console.log(result)
                     this.setState({
                        res:"Success",
                        colorval:'green'
                    })
                    
                }
            ).catch(( err)=>{
                console.log(err)
                this.setState({
                    res:err.message,
                    colorval : 'red'
                })
            })
        }
*/