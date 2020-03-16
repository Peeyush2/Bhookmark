import React ,{COmponent, Component} from 'react'
import fire from './fire'
class Dashboard extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state={
            userName:null
        }
    }
    render(){
        return(
        <div className="outerCard">
            <button onClick={fire.auth().signOut()}>Sign Out</button>
        </div>
        )
    }

    
}
export default Dashboard;