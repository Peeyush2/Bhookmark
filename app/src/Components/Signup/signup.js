import React,{useState} from 'react'
import fire from '../../fire'
import {Typography,TextField,Card,Button, CardContent} from '@material-ui/core'


export default function Signup(props) {
    const [name,setName]=useState('')
    const [emails,setEmail]=useState('')
    const [mobileno,setMobile]=useState('')
    const [dob,setDob]=useState('')
    const [temppass,setpass]=useState('')
    const [passwords,setPassword]=useState('')
    const [results,setResult]=useState('')

    function SignupUser(){
        //var Request = []
        if(name!=='' &&temppass!=='' && passwords!=='' &&passwords===temppass){
            fire.auth()
            .createUserWithEmailAndPassword(emails,passwords).then(
                (result)=>{
                    var somedate = new Date(dob)
                    setResult(result.message)                
                    fire.firestore().collection('Users').add({
                        Name:name,
                        Email:emails,
                        ContactNo:mobileno,
                        DOB:somedate
                     })
                    .then(
                        // fire.firestore().collection('Requests').doc(emails).set({
                        //     Request
                        // }).catch(()=>{alert('error occured')})
                        props.history.push('/dashboard')
                    )
                    .catch(()=>console.log('error occured'))
                }
            )
            // .then(
            //     props.history.push('/dashboard')
            // )
            .catch(( err)=>{
                setResult(err.message)
            })
        }
        else if(name===''){
            setResult('Name is required')
        }
        else if(temppass!==passwords || temppass==='' || passwords===''){
            setResult('Please give correct password')
        }
        else{
            setResult('Please check all fields properly')
        }
    }
    return (
        <div className='signin-container'>
            <div className = "signin-background1"></div>
            <div className = "signin-background2"></div>
            <div className="signin-block" >
                <div className='signin-content'>
                <Typography gutterBottom variant="h5" component="h2">SignUp</Typography>
                <TextField type="text" id="outlined-basic" label="Name" variant="outlined" value={name} placeholder="name" onChange={(e)=>setName(e.target.value)}/><p></p>
                <TextField type="email" id="outlined-basic" label="Email" variant="outlined" value={emails} placeholder="email" onChange={e=>setEmail(e.target.value)}/><p></p>
                <TextField type="text" id="outlined-basic" label="Mobile No." variant="outlined" value={mobileno} placeholder="Mobile No." onChange={e=>setMobile(e.target.value)}/><p></p>
                <TextField type="date" id="outlined-basic"  variant="outlined" value={dob} placeholder="Date of Birth" onChange={e=>setDob(e.target.value)}/><p></p>
                <TextField type="password" id="outlined-basic" label="Password" variant="outlined" value={temppass} placeholder="password" onChange={e=>setpass(e.target.value)}/><p></p>
                <TextField type="password" id="outlined-basic" label="Confirm Password" variant="outlined" value={passwords} placeholder="confirm password" onChange={e=>setPassword(e.target.value)}/><p></p>
                <Button variant='outlined' onClick={()=>SignupUser()}>SignUp</Button><p></p> 
                {results}
                </div>
            </div>
        </div>
    )
}


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