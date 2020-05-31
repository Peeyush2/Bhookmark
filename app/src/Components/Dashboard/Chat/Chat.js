import React,{useEffect,useState} from 'react'
//import ChatStyle from './chatStyles'
import fire from '../../../fire'
import {Button,Paper} from '@material-ui/core'
import styles from './chatStyles'

function Chat() {
    const [usr,setUsr]=useState('')
    useEffect(()=>{
        fire.auth().onAuthStateChanged(setUsr)
    })
    if(usr)
    return (
        <div className='chat' style={{width:'100%',alignItems:'center'}}>
            <Paper style={{width:'100%',alignItems:'center'}}><h2>Chat</h2></Paper>
            

        </div>
    )
    else return(
        <div>Sign In</div>
    )
}

export default Chat