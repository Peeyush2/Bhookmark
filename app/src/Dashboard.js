import React ,{COmponent, Component} from 'react'
 import './CSS/Card.css'
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
        <div className="outerCard">Peeyush</div>
        )
    }

    
}
export default Dashboard;