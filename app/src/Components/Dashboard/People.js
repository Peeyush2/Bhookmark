import React,{useState,useEffect} from 'react'
import fire from '../../fire'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

/*function usePeople(){
    const [people,setPeople]=useState([])
    const [email,setEmail] = useState('')
    const [zip,setZip]=useState('')
    useEffect(()=>{
        new Promise((res,rej)=>{
            setEmail(localStorage.getItem('userid'))
            if(email.length!=0) res();
            else rej(email);
        }).then(
            fire.firestore()
            .collection('Users').where('Email','==',email)
            .get().then((snapshot)=>{
                console.log(email)
                setZip(snapshot.docs[0].data().PinCode)
            })
            .then(()=>{
                fire.firestore()
            .collection('Users').where('PinCode','==',zip)
            .get().then((snapshot)=>{
                console.log('hello')
                setPeople(snapshot.docs)
            })
            .catch(()=>{console.log('error')})
            })
            .catch(e=>{console.log(e)})
        )
        .catch((e)=>{console.log(e)})

    },[email])
    return people
}*/
function usePeople(){
    const [people,setPeople]=useState([])
    const [email,setEmail] = useState('')
    const [zip,setZip]=useState('')
    useEffect(()=>{
        setEmail(localStorage.getItem('userid'))
       // console.log(email)
    })
    useEffect(()=>{
        if(email){
            console.log(email)
            fire.firestore()
            .collection('Users').where('Email','==',email)
            .get().then((snapshot)=>{
                //console.log(snapshot.docs[0].data().PinCode)
                setZip(snapshot.docs[0].data().PinCode)
            })
            .then(()=>{
                console.log(zip)
            })
            .catch(e=>{console.log(e)})
        }
    },[email])
    useEffect(()=>{
        if(zip){
        //    console.log(zip)
            fire.firestore()
            .collection('Users').where('PinCode','==',zip)
            .get().then((snapshot)=>{
                setPeople(snapshot.docs)
              //  console.log(people)
            })
            .catch(()=>{console.log('error')})
        }
    },[zip])
    return people
}
export default function People() {
   const pop= usePeople();
  // console.log(pop)
    return (
        <div className="People">
            
            <List>
            <h2>People Near You</h2>
            { pop.map((p)=>(
                    <ListItem key={p.email} alignItems="flex-start">{console.log(p)}
                        <ListItemAvatar key={p.email}>
                        <Avatar key={p.email}    alt={p.data().Name} src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText key={p.email}
                        primary={p.data().Name}
                        secondary={
                            <React.Fragment key={p.email}>
                            <Typography key={p.email}
                                component="span"
                                variant="body2"
                            >
                                0.5 KM away
                            </Typography>
                            {" — I love reading"}
                            </React.Fragment>
                        }
                        />
                    </ListItem>
            )) }
            </List>
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