import React,{useState,useEffect} from 'react'
import fire from './../../../../fire'
export default function ShowBook(props) {
    const [usr,setUsr] = useState('')
    const [reqbook,setReqBook] = useState('')
    const [books,setBooks]=useState([])
    useEffect(() => {
        console.log(props.match.params)
        setUsr(props.match.params.id)
    })
    useEffect(()=>{
        setReqBook(props.match.params.book)
    })
    useEffect(()=>{
        fire.firestore().collection('Books').where('current_user','==',usr).get().then((snap)=>{
            console.log(snap.docs[0].data())
            setBooks(snap.docs)
        }).catch(e=>console.log(e))

    },[usr])

    function handleclick(bookdata){
        alert(reqbook+' for '+JSON.stringify(bookdata))
    }
    if(books){
        return (
            <div>
                <h2>Books of {usr} available for exchange -</h2>
                {books.map((book=>(
                   !book.data().in_shelf && <ol>{book.data().Name} <button onClick={()=>{handleclick(book.data())}}>Exchange</button></ol>
                )))}
            </div>
        )
    }
    else{
        return(
            <>loading...</>
        )
        
    }

}
