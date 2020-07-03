import React,{useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import fire from '../../../../fire'

export default function RequestIncoming() {
    const history = useHistory();
    const [usr,setUsr]=useState('')
    const [reqs,setReq]=useState([])
    const [allbookdata,setallbookdata] = useState([])
    const [refineddata, setrefineddata]=useState([])

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
    
    useEffect(()=>{
        
            console.log(reqs)
            if(reqs.length>0){
                fire.firestore().collection('Books').get().then((snap)=>{
                    setallbookdata(snap.docs)
                })
            }
        
    },[reqs])

    useEffect(()=>{
        if(allbookdata.length>0){
            console.log(allbookdata[0].data())
            reqs.map((r)=>{
                const refdata =  allbookdata.filter((bookdata)=>{return bookdata.data().Name === r.BookName && bookdata.data().current_user === usr && !bookdata.data().in_shelf})
                if(refdata[0])
                    setrefineddata(prev=>[...prev,{BookName:refdata[0].data().Name,Requester:r.Requester}])
            })
     }
    },[allbookdata])
    
    useEffect(()=>{
        
        if(refineddata.length>0 && usr.length!=0){
            console.log(refineddata.length,usr.length)
            console.log(refineddata)
            fire.firestore().collection('Requests').doc(usr).set({Request:refineddata})
            .catch(e=>console.log(e))
        }
    },[refineddata,usr])

    function handleRoute(req){
        history.push('/showbook/'+req.Requester+'/'+req.BookName)
    }

    if(usr){
        return (
            <div>
                <h2>Your Requests - </h2>
                {refineddata.map((req)=>(
                    <ol onClick={()=>handleRoute(req)}>Request For - {req.BookName}<br/>Requested by- {req.Requester}</ol>

                ))}
                {/* {console.log(refineddata)} */}
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
