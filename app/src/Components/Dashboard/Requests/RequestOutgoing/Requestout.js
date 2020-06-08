import React,{useState,useEffect} from 'react'
import fire from '../../../../fire'

export default function Requestout() {
    const [usr,setUsr] = useState('')
    const [request,setRequest] = useState([])
    useEffect(()=>{
        setUsr(localStorage.getItem('userid'))
    })
    useEffect(()=>{
        if(usr){
            fire.firestore().collection('Requested').doc(usr).get().then(
                (snap)=>{
                        setRequest(snap.data())
                        //console.log(snap.data())
                }
            ).catch((e)=>{
                console.log(e)
            })
        }
    },[usr])
    
    if(usr && request.length>0)
    return (
        <div>
            {request.map((req)=>{
                return(
                <l1>{req}</l1>
                )   
            })}
        </div>
    )
    else if(usr && request.length==0){
        return(
            <h2>No requests made</h2>
        )
    }
    else{
        return(
            
            <>{console.log(typeof(request))}Sign In</>
        )
    }
}
