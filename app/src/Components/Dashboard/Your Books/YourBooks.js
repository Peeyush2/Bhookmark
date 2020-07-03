import React,{useState,useEffect} from 'react'
import './YourBooks.css'
import fire from './../../../fire'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles({
    root: {
      maxWidth: 196,
      maxHeight:315,
      minHeight:315,
      minWidth:196
      
    },
  });


export default function YourBooks() {
    const [curr_owner,setCurrOwn] = useState('')
    const [book,setBook] = useState([])
    const classes = useStyles();

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
            <h2 className='Library-heading'>Books in Your Shelf</h2>
            <div className='your-book-content'>
            {book.map((b)=>(
                b.data().in_shelf &&
                <div className='each-book'>
                    {/* {b.data().Name} <Button onClick={()=>handleclick(b)}>Add to Library</Button> */}
                    <Card  className={classes.root}>
                    <CardActionArea >
                        <CardMedia
                        component="img"
                        alt={b.data().Name}
                        height="140"
                        image={b.data().otherdata.imageLinks.thumbnail}
                        title={b.data().Name}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {b.data().Name}
                        </Typography>
                       
                        </CardContent>
                    </CardActionArea>
                    </Card>
                    <Button onClick={()=>handleclick(b)}>Add to Library</Button>
                </div>
            ))}
        </div>
        </div>
    )
}
