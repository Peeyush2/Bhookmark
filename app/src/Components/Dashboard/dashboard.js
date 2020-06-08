import React,{useState,useEffect} from 'react'
import Peopleincircle from './People'
import fire from '../../fire'
import NavBar from './NavBar/NavBar'
import Library from './Library/Library'
import YourBooks from './Your Books/YourBooks'
import Map from '../Dashboard/Map/Map'
//import {Redirect} from 'react-router-dom'
//import Signin from '../Signin/signin'
import Book from './Books/Book'
import {Button, Divider} from '@material-ui/core'
import './dashboard.css'

export default function Dashboard() {
    const[usr,setusr]=useState('')
    const [update1,setUpdate1] = useState(false)
    useEffect(()=>{
        fire.auth().onAuthStateChanged(setusr)
        if(usr!='' && usr!=null){
            
            localStorage.setItem('userid',usr.email)
            
        }
        else localStorage.clear()
    },[usr])
    useEffect(()=>{
        if(usr.email){
            fire.firestore().collection('Requests').doc(usr.email).get().then(
                (snap)=>{
                    if(!snap.exists){
                        const Request = []
                        fire.firestore().collection('Requests').doc(usr.email).set(
                           { Request}
                        )
                        .then(
                            setUpdate1(true)
                        )
                    }
                }
            )
        }
    },[usr])
    useEffect(()=>{
        if(usr.email){
            fire.firestore().collection('Requested').doc(usr.email).get().then(
                (snap)=>{
                    if(!snap.exists){
                        const Request = []
                        fire.firestore().collection('Requested').doc(usr.email).set(
                           { Request}
                        )
                        .catch(e=>console.log(e))
                    }
                }
            )
            .catch(e=>console.log(e))
        }
    },[usr])

    if(usr){                                                                                                                                                                                                                
    return (
        <div className='dashboard-container' style={{background:'linear-gradient(#dbeee9 0%, #e9e9e9 100%)'}}>
                 <NavBar/>
          {/* <h2>  You are logged in via  {usr.email}</h2> */}
             {/* <Peopleincircle />
            
            { <div className='library-container'>
                <Library/>
            </div> }/*
            { <div className='yourbook-container'>
                <YourBooks/>
            </div> }
            { <Map/> }
            { {usr.email} }
            { <div className='book-container'>
                <Book/>
            </div> } */}
            <div className='signout-container'>
               
            </div>
        </div>
    )  
    }
    else if(usr === undefined){
        return (
            <h1> Signin</h1>
        )
    }
    else{
        return(
            <>Loading...</>
        )
    }
}
