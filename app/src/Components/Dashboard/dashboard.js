import React,{useState,useEffect} from 'react'
import Peopleincircle from './People'
import fire from '../../fire'


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
            {/* {usr.email} */}
            <button onClick={()=>fire.auth().signOut()}>Sign Out</button>
        </div>
    )  
    }
    else{
        return (
        <>Please SignIn</>
        )
    }
}
