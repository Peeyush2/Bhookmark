import React,{useState,useEffect} from 'react'
import fire from '../../fire'

function usePeople(){
    const [people,setPeople]=useState([])
    useEffect(()=>{
        fire.firestore()
        .collection('Users')
        .onSnapshot((snapshot)=>{
            //console.log(snapshot.docs)
            setPeople(snapshot.docs)
        })
    },[])
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