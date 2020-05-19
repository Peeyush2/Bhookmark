import React,{useState,useEffect} from 'react'
import fire from '../../fire'

function usePeople(){
    const [people,setPeople]=useState([])
    const [email,setEmail] = useState('')
    const [zip,setZip]=useState('')
    useEffect(()=>{
        setEmail(localStorage.getItem('userid')) 
        fire.firestore()
        .collection('Users').where('Email','==',email)
        .get().then((snapshot)=>{
            console.log(snapshot.docs[0].data().PinCode)
            setZip(snapshot.docs[0].data().PinCode)
        })
        .then(()=>{
            fire.firestore()
        .collection('Users').where('PinCode','==',zip)
        .get().then((snapshot)=>{
            //console.log(snapshot.docs)
            setPeople(snapshot.docs)
        })
        })
        .catch(e=>{console.log(e)})
    },[email,zip])
    return people
}
export default function People() {
   const pop= usePeople();
    return (
        <div className="People">
            <h2>People</h2>
            { pop.map((p)=>(
                    <div key={p.id}>{p.data().Name}</div>
            )
                
            ) }
        </div>
    )
}
/*

Dashboard -
Nearby(users) - 
Library(books) -  
Books
Feed


book - Pincode
*/