import React, {Component} from 'react';
import API from "../../API/api";
import "./style.css";
import {Link,Redirect} from "react-router-dom";
import Axios from 'axios';
import ViewFriend from '../ViewFriend'

class Friends extends Component {
    state = {
        id: JSON.parse(localStorage.getItem("loginInfo")).id,
        friendsList: JSON.parse(localStorage.getItem("loginInfo")).friends,
        friends: [],
        hasFriends: true,
        viewFriend : false,
        clickFriend: [],
        displaySad: true
    }

    clickHandle = (username)=>{
        for(var i = 0;i < this.state.friends.length; i++){
            if(this.state.friends[i].username === username){
                this.setState({viewFriend:true, clickFriend:this.state.friends[i]})
            }
        }
    }

    componentDidMount = () => {
        API.getUserFriends(this.state.id).then(res => {
            
            console.log(res.data);
            if (res.data.friends.length) {
                this.setState({
                    hasFriends: true,
                    friends: res.data.friends
                });
                
            } else {
                this.setState({hasFriends: false});
            }
        }).catch(err => {
            console.log(err);
        });
    }

    changeEmoji = () => {
        this.setState({
            displaySad: false
        });
    }
    
    render = () => {
        if (this.state.hasFriends && this.state.viewFriend===false) {      
            return (
                <div>
                    <div className="container">
                        <header>
                            <h1>Your Friends</h1>
                            <Link to="/main">
                                <button className="btn btn-md" id="main" style={{backgroundColor: "#B33434"}}>Main</button>
                            </Link>
                        </header>
                        <hr/>
                    </div>
                    <div className="container" id="friendContainer">
                        {this.state.friends.map(friend => {
                            return (
                                <div key={friend.username} onClick ={()=>this.clickHandle(friend.username)} className="friendBox">
                                    <div className="userAvatar"></div>
                                    <p>{friend.firstName} {friend.lastName}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            );
        } 
        else if(this.state.viewFriend===true){
            console.log(this.state.clickFriend.username)
            return(
                
                <Redirect push to={{
                    pathname : `/friends/${this.state.clickFriend.username}`
                }}/>
            // <ViewFriend user={this.state.clickFriend}/>
            )
        } 
        else {
            return (
                // TODO: flesh this section out more - low priority
                <div className="container">
                    <h2 id="noFriendText">No friends to display</h2>
                    <div id="iconDiv">
                        <i className="far fa-sad-tear" style={{display: this.displaySad ? "none" : "block"}}></i>
                    </div>
                    <div id="findFriendDiv">
                        <Link to="/findFriends">
                            <button className="btn btn-md navButtons" onMouseEnter={this.changeEmoji}>Find Friends!</button>
                        </Link>
                        <Link to="main">
                            <button className="btn btn-md navButtons">Back to Homepage</button>
                        </Link>
                    </div>

                </div>
            );
        }
    }
}

export default Friends;
