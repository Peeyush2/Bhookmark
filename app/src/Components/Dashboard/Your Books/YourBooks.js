import React,{useState,useEffect} from 'react'
import fire from './../../../fire'
import { Button } from '@material-ui/core'

export default function YourBooks() {
    const [curr_owner,setCurrOwn] = useState('')
    const [book,setBook] = useState([])
    useEffect(()=>{
        setCurrOwn(localStorage.getItem('userid'))
    })
    useEffect(()=>{
        fire.firestore().collection('Books').where('current_user','==',curr_owner).get()
        .then((snapshot)=>{
            console.log(curr_owner)
            console.log(snapshot.docs)
            setBook(snapshot.docs)
        }
        ).catch(e=>console.log(e))
    },[curr_owner])
    function handleclick(bookdata){
        if(bookdata.data().current_user == curr_owner){
            fire.firestore().collection('Books').doc(bookdata.id).update({
                in_shelf:false
            }).then(()=>{
                const booklist = book
                setBook(booklist.filter((curr_book)=>curr_book.id!=bookdata.id))
            }
            )
        }
        else{
            alert('you are not authorized for this action!! Should i call police for investigation?')
        }

    }
    return (
        <div>
            <h2>Books in Your Shelf</h2>
            {book.map((b)=>(
                b.data().in_shelf && <li>{b.data().Name} <Button onClick={()=>handleclick(b)}>Add to Library</Button></li>
            ))}
        </div>
    )
}
