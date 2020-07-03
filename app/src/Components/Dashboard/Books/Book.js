import React,{useState,useEffect} from 'react'
import axios from 'axios'
import fire from '../../../fire'
import {Button,input} from '@material-ui/core'


export default function Book(props) {
const [book,setbook] = useState('')
const [result,setResult]=useState([])
const [vis,setVis]=useState(false)
const [idx, setIdx]=useState(0)
function bookhandle(){
    console.log(book)
    const apikey ='AIzaSyCbfVBZZOIYWOExqvI5V1SwTC_7zD6vQ_s'
     axios.get('https://www.googleapis.com/books/v1/volumes?q='+book+'&key='+apikey+'&startIndex='+idx).then(
         (result)=>{
             console.log(result.data.items)
             setResult(result.data.items)
             setVis(true)
         }
     ).catch((error)=>{console.log(error)})
}
function addbookcall(st){
    if(window.confirm('You want to add this book?')){
        fire.firestore().collection('Books').add({
            Name:st.title,
            imagelink:st.imageLinks.smallThumbnail,
            otherdata:st,
            original_user:localStorage.getItem('userid'),
            current_user:localStorage.getItem('userid'),
            in_shelf:true
        })        
    }
}
    return (

        <div>
         <h2>   Hey add Your books here -</h2> <br/>
            <input className='booksearch' placeholder='search book' value={book} onChange={(e)=>{setbook(e.target.value);bookhandle();}} />
            <Button onClick={()=>{setIdx(0);bookhandle()}}>Search Book</Button><br/>
            <br/>
             {result && result.map((res)=>(
                 <li style={{border:'solid'}} key = {res.id} onClick={()=>{addbookcall(res.volumeInfo)}}>
                     {console.log(res)}
                     <br/>
                     {res.volumeInfo.imageLinks && <img src={res.volumeInfo.imageLinks.smallThumbnail}/>}
                     <h3 >{res.volumeInfo.title}</h3>
                    <p>{res.volumeInfo.authors && res.volumeInfo.authors.map((val)=>(<span key={val}>{val}{', '}</span>))}</p>
                 </li>
             ))}
             {vis && <div>
                 <button onClick={()=>{if(idx>=10){(setIdx(prev=>prev-10))};bookhandle()}}>Prev Page</button>
                 <p style={{display:'inline-block'}}>{idx/10}</p>
                 <Button onClick={()=>{setIdx(prev=>prev+10);bookhandle()}}>Next Page</Button>
                 </div>}
        </div>
    )
}
