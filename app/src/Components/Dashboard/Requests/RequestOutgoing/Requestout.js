import React,{useState,useEffect} from 'react'
import fire from '../../../../fire'

export default function Requestout() {
    const [usr,setUsr] = useState('')
    const [request,setRequest] = useState([])
    const [allbookdata,setallbookdata] = useState([])
    const [refineddata, setrefineddata]=useState([])
    useEffect(()=>{
        setUsr(localStorage.getItem('userid'))
    })
    useEffect(()=>{
        if(usr){
            fire.firestore().collection('Requested').doc(usr).get().then(
                (snap)=>{
                        setRequest(snap.data().Request)
                        //console.log(snap.data().refineddata)
                }
            ).catch((e)=>{
                console.log(e)
            })
        }
    },[usr])

    useEffect(()=>{
        if(request.length>0){
            console.log(request)
            if(request.length>0){
                fire.firestore().collection('Books').get().then((snap)=>{
                    setallbookdata(snap.docs)
                })
            }
        }
    },[request])

    useEffect(()=>{
        if(allbookdata.length>0){
            console.log(allbookdata[0].data())
            request.map((r)=>{
                const refdata =  allbookdata.filter((bookdata)=>{return bookdata.data().Name === r.BookName && bookdata.data().current_user === r.Requstedto && !bookdata.data().in_shelf})
                if(refdata[0])
                setrefineddata(prev=>[...prev,{BookName:refdata[0].data().Name,Requstedto:refdata[0].data().current_user}])
            })
     }
    },[allbookdata])
    
    useEffect(()=>{
        if(refineddata.length>0 && usr.length>0){
            console.log(refineddata,usr)
            console.log(refineddata)
            fire.firestore().collection('Requested').doc(usr).set({Request:refineddata})
            .catch(e=>console.log(e))
        }
    },[refineddata,usr])
    if(usr &&request.length>0)
    return (
        <div>
            <h2>Requests made by you - </h2>
            {request.map((req)=>{
                return(
                <li>{req.BookName} {req.Requstedto}</li>
                )   
            })}
        </div>
    )
    else if(usr  &&request.length==0){
        return(
            <h2>No requests made</h2>
        )
    }
    else{
        return(
            
            <>Sign In</>
        )
    }
}
