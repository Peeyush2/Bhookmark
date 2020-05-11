import React,{useState} from 'react'
import fire from '../../fire'



export default function Signin() {
    const [emails,setEmail]=useState('')
    const [passwords,setPassword]=useState('')
    const [results,setResult]=useState('')
    function LoginUser(){
        fire.auth()
        .signInWithEmailAndPassword(emails,passwords).then(
            (result)=>{
                console.log(result)
                setResult(result.message)                
            }
        ).catch(( err)=>{
            setResult(err.message)
        })
    }
    return (
        <div>
            <input type="email" value={emails} onChange={e=>setEmail(e.target.value)}/>
            <input type="password" value={passwords} onChange={e=>setPassword(e.target.value)}/>
            <button onClick={()=>LoginUser()}>SignIn</button>
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