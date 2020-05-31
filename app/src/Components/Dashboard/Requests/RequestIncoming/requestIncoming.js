import React,{useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import fire from '../../../../fire'

export default function RequestIncoming() {
    const history = useHistory();
    const [usr,setUsr]=useState('')
    const [reqs,setReq]=useState([])

    useEffect(()=>{
        setUsr(localStorage.getItem('userid'))
    })
    useEffect(()=>{
       // console.log(usr)
        if(usr){
          //  console.log('hey')
            fire.firestore().collection('Requests').doc(usr).get().then((snap)=>{
                setReq(snap.data().Request)
                //console.log(snap.data().Request)
            })
        }
    },[usr])

    function handleRoute(req){
        history.push('/showbook/'+req.Requester+'/'+req.BookName)
    }

    if(usr){
        return (
            <div>
                <h2>Your Requests - </h2>
                {reqs.map((req)=>(
                    <ol onClick={()=>handleRoute(req)}>Request For - {req.BookName}<br/>Requested by- {req.Requester}</ol>

                ))}
                
            </div>
        )
    }
    else {
        return (
            <div>
                Please SignIN        
           </div>
        )
    }
}
