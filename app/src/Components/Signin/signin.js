import React,{useState,useEffect} from 'react'
import fire from '../../fire'



 function Signin(props) {
    const [emails,setEmail]=useState('')
    const [passwords,setPassword]=useState('')
    const [results,setResult]=useState('')
    useEffect(()=>{
        if(results==='Success'){
            props.history.push('/dashboard')
        }
    },[results])
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
        <div>
            <input type="email" value={emails} placeholder='Email' onChange={e=>setEmail(e.target.value)}/><br/>
            <input type="password" value={passwords} placeholder='Password' onChange={e=>setPassword(e.target.value)}/><br/>
            <button onClick={()=>LoginUser()}>SignIn</button><br/>
            {results}
        </div>
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