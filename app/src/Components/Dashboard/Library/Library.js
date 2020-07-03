import React,{useState,useEffect} from 'react'
import fire from '../../../fire'
import './Library.css'
import ImgMediaCard from './../../Card/card'
import {Button, Checkbox} from '@material-ui/core'


export default function Library() {
    const [lib,setlib] = useState([])
    const [curr_user,setCurr_user]=useState('')

    useEffect(()=>{
        setCurr_user(localStorage.getItem('userid'))
    })
    useEffect(()=>{
        fire.firestore().collection('Books').get().then(
            (snapshot)=>{
                setlib(snapshot.docs)
                //console.log(snapshot.docs[0].data())
            }
        )
        .catch((e)=>
            console.log(e)
        )
    },[curr_user])



    function handleClick(bookdata){
        console.log(curr_user)
        if(bookdata.data().current_user===curr_user){
            fire.firestore().collection('Books').doc(bookdata.id).update({
                in_shelf:true
            }).then(()=>{
                const templib = lib
                //console.log(templib)
                //templib.filter((valu)=>valu.id!=bookdata.id)
                setlib(templib.filter((valu)=>valu.id!=bookdata.id))
                //console.log(lib)
            }
            )
        }
        else{
            alert('Not authorized')
        }
    }

    function handleBorrow(bookdata){
        //console.log(bookdata.data())
        //alert('go talk to this guy '+JSON.stringify(bookdata.data()))
        // console.log(bookusr)
        var Request= []
        if(bookdata){
            fire.firestore().collection('Requests').doc(bookdata.data().current_user).get().
            then((snap)=>{
                Request = snap.data().Request
                //console.log(oldarr)
            }).then(()=>{
                if(!Request.find((val)=>{ return val.BookName===bookdata.data().Name && val.Requester === curr_user }))
                {
                    Request.push({BookName:bookdata.data().Name,Requester:curr_user})
                    fire.firestore().collection('Requests').doc(bookdata.data().current_user).set(
                       {Request} 
                    )
                    .then(()=>{
                        fire.firestore().collection('Requested').doc(curr_user).get().then(
                            (snap)=>{
                                Request = snap.data().Request
                            }
                        ).then(()=>{
                            Request.push({BookName:bookdata.data().Name,Requstedto:bookdata.data().current_user})
                            fire.firestore().collection('Requested').doc(curr_user).set(
                                {Request} 
                             ).catch((e)=>{console.log(e)})
                            
                        }).catch(e=>console.log(e))
                    })
                    .catch(e=>console.log(e))
                }
                else {
                    alert('you already have requested for this book')
                }
                }
                ).catch(e=>console.log(e))
            }
        }

    function boolcheck(bookdata){
        if(bookdata.data().current_user===curr_user){
            return true
        }
        else return false
    }




    return (
        <div className='Library-container'>
          <h2 className='Library-heading'>Library</h2>
          <div >
            {lib.map((d)=>(
             !d.data().in_shelf &&  <div key={d.id} className="each-crd"><ImgMediaCard props={d.data()}/>
                {boolcheck(d) && <Button  onClick={()=>handleClick(d)}>Return Book to shelf</Button>}
                {!boolcheck(d) && <Button  onClick={()=>handleBorrow(d)}>Borrow</Button>}
             </div>
            ))}
            </div>
        </div>
    )
}
