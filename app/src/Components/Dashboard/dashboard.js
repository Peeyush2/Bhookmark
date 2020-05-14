import React,{useState,useEffect} from 'react'
import Peopleincircle from './People'
import fire from '../../fire'
import Library from './Library/Library'
//import {Redirect} from 'react-router-dom'
//import Signin from '../Signin/signin'


export default function Dashboard() {
    const[usr,setusr]=useState('')
    useEffect(()=>{
        console.log(fire.auth().currentUser)
        fire.auth().onAuthStateChanged(setusr)
    },[])

    if(usr){                                                                                                                                                                                                                
    return (
        <div>
            <Peopleincircle/>
            <Library/>
            {/* {usr.email} */}
            <button onClick={()=>fire.auth().signOut()}>Sign Out</button>
        </div>
    )  
    }
    else {
        return (
            <> Signin</>
        )
    }
}
