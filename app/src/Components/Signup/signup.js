import React,{useState} from 'react'
import fire from '../../fire'


export default function Signup() {
    const [name,setName]=useState('')
    const [emails,setEmail]=useState('')
    const [mobileno,setMobile]=useState('')
    const [dob,setDob]=useState('')
    const [temppass,setpass]=useState('')
    const [passwords,setPassword]=useState('')
    const [results,setResult]=useState('')

    function SignupUser(){
        if(temppass!=='' && passwords!=='' &&passwords===temppass){
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
                }
            ).catch(( err)=>{
                setResult(err.message)
            })
        }
        else{
            setResult('Passwords Dont match! Please check again')
        }
    }
    return (
        <div>
            <input type="text" value={name} placeholder="name" onChange={e=>setName(e.target.value)}/><br/>
            <input type="email" value={emails} placeholder="email" onChange={e=>setEmail(e.target.value)}/><br/>
            <input type="text" value={mobileno} placeholder="Mobile No." onChange={e=>setMobile(e.target.value)}/><br/>
            <input type="date" value={dob} placeholder="Date of Birth" onChange={e=>setDob(e.target.value)}/><br/>
            <input type="password" value={temppass} placeholder="password" onChange={e=>setpass(e.target.value)}/><br/>
            <input type="password" value={passwords} placeholder="confirm password" onChange={e=>setPassword(e.target.value)}/><br/>
            <button onClick={()=>SignupUser()}>SignUp</button><br/>
            {results}
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