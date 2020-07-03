import React,{useState,useEffect} from 'react'
//import Peopleincircle from './People'
import fire from '../../fire'
import NavBar from './NavBar/NavBar'
import Library from './Library/Library'
import YourBooks from './Your Books/YourBooks'
import RequestIncoming from './Requests/RequestIncoming/requestIncoming'
import RequestOut from './Requests/RequestOutgoing/Requestout'
//import Map from '../Dashboard/Map/Map'
//import {Redirect} from 'react-router-dom'
//import Signin from '../Signin/signin'
import Book from './Books/Book'
//import {Button, Divider} from '@material-ui/core'

import './dashboard.css'

export default function Dashboard() {
    const[usr,setusr]=useState('')
    const [update1,setUpdate1] = useState(false)
    const [tab, setTab] = useState('Library')
    useEffect(()=>{
        fire.auth().onAuthStateChanged(setusr)
        if(usr!='' && usr!=null){
            
            localStorage.setItem('userid',usr.email)
            
        }
        else localStorage.clear()
    },[usr])
    useEffect(()=>{
        if(usr!='' && usr!=null){
            fire.firestore().collection('Requests').doc(usr.email).get().then(
                (snap)=>{
                    if(!snap.exists){
                        const Request = [{dummy:'dummy-data'}]
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
        if(usr!='' && usr!=null){
            fire.firestore().collection('Requested').doc(usr.email).get().then(
                (snap)=>{
                    if(!snap.exists){
                        const Request = [{dummy:'dummy-data'}]
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
            <div className='dash-container'>
                <div>
                    {usr.email}
                </div>
                <div className="dashboardList">
                        <ol className="libList" onClick={()=>setTab('Library')}>Library</ol>
                        <ol onClick={()=>setTab('BookShelf')}>My BookShelf</ol>
                        <ol onClick={()=>setTab('RequestIn')}>Requests Incomming</ol> 
                        <ol onClick={()=>setTab('RequestOut')}>Requests Made by you</ol>   
                        <ol onClick={()=>setTab('addBook')}>Add Book</ol>   
                </div>
                <div >    
                    {(tab==='Library') && <Library/> }
                    {(tab==='BookShelf') &&<YourBooks/>}
                    {(tab==='RequestIn') &&<RequestIncoming/>}
                    {(tab==='RequestOut') &&<RequestOut/>}
                    {(tab==='addBook') &&<Book/>}
                </div>
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
