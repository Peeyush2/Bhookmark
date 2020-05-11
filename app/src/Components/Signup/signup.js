import React,{useState} from 'react'
import fire from '../../fire'



export default function Signup() {
    const [name,setName]=useState('')
    const [emails,setEmail]=useState('')
    const [passwords,setPassword]=useState('')
    const [results,setResult]=useState('')
    function SignupUser(){
        fire.auth()
        .createUserWithEmailAndPassword(emails,passwords).then(
            (result)=>{
                console.log(result)
                setResult(result.message)                
                fire.firestore().collection('Users').add({
                    Name:name,
                    Email:emails
                })
            }
        ).catch(( err)=>{
            setResult(err.message)
        })
    }
    return (
        <div>
            <input type="text" value={name} placeholder="name" onChange={e=>setName(e.target.value)}/>
            <input type="text" value={name} placeholder="name" onChange={e=>setName(e.target.value)}/>
            <input type="email" value={emails} placeholder="email" onChange={e=>setEmail(e.target.value)}/>{" "}
            <input type="password" value={passwords} placeholder="password" onChange={e=>setPassword(e.target.value)}/><br/>
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