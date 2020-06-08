import React,{useState,useEffect} from 'react'
import fire from '../../../fire'
import {Button, Checkbox} from '@material-ui/core'
// function useLibrary(){
//     const [lib,setlib] = useState([])
//     const [curr_user,setCurr_user]=useState('')
//     useEffect(()=>{
//         setCurr_user(localStorage.getItem('userid'))
//     },[])
//     useEffect(()=>{
//         fire.firestore().collection('Books')
//         .get().then(
//             (snapshot)=>{
//                 setlib(snapshot.docs)
//                // console.log(snapshot.docs[0].data())
//             }
//         )
//         .catch((e)=>
//             console.log(e)
//         )
//     },[curr_user])
//     return lib
// }

export default function Library() {
    //const lib = useLibrary();    
    const [lib,setlib] = useState([])
    const [curr_user,setCurr_user]=useState('')
    useEffect(()=>{
        setCurr_user(localStorage.getItem('userid'))
    })
    useEffect(()=>{
        fire.firestore().collection('Books')
        .get().then(
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

    // function updateRequested(){
    //     fire.firestore().collection('Requested').doc(curr_user).get().then(
    //         (snap)=>{
    //             var request = []
    //             if(!snap.exists){
    //                 fire.firestore().collection('Requested').doc(curr_user).set({
    //                     request
    //                 })
    //             }else{
                    
    //             }
    //         }
    //     )
    // }

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
                    ).catch(e=>console.log(e))
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
        <div>
          <h2>Books in your Library</h2>
            {lib.map((d)=>(
             !d.data().in_shelf &&  <li key={d.id}>{d.data().Name}
                {boolcheck(d) && <Button  onClick={()=>handleClick(d)}>Return Book to shelf</Button>}
                {!boolcheck(d) && <Button  onClick={()=>handleBorrow(d)}>Borrow</Button>}
             </li>
            ))}
        </div>
    )
}
