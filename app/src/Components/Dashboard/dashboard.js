import React,{useState,useEffect} from 'react'
//import Peopleincircle from './People'
import fire from '../../fire'
import Library from './Library/Library'
import YourBooks from './Your Books/YourBooks'
//import Map from '../Dashboard/Map/Map'
//import {Redirect} from 'react-router-dom'
//import Signin from '../Signin/signin'
import Book from './Books/Book'
import {Button, Divider} from '@material-ui/core'

export default function Dashboard() {
    const[usr,setusr]=useState('')
    useEffect(()=>{
        fire.auth().onAuthStateChanged(setusr)
        if(usr!='' && usr!=null){
            //console.log(usr.email)
            const em = usr.email
           // console.log(usr)
        //    fire.firestore().collection('Users').where('Email','==',usr.email).get().then((snap)=>{
        //     localStorage.setItem('userid',em)
        //     }).catch((e)=>{console.log(e)})
            localStorage.setItem('userid',usr.email)
        }
        else localStorage.clear()
        //console.log(usr)
    },[usr])

    if(usr){                                                                                                                                                                                                                
    return (
        <div>
          <h2>  You are logged in via  {usr.email}</h2>
            {/* <Peopleincircle /><br/> */}
            <Library/><br/>
            <YourBooks/>
            {/* <Map/> */}
            {/* {usr.email} */}
            <Book/>
            <br/>
            <Button variant='outlined' onClick={()=>fire.auth().signOut()}>Sign Out</Button>
        </div>
    )  
    }
    else {
        return (
            <> Signin</>
        )
    }
}
