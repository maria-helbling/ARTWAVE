import React from 'react';
import './style.css';

function ListCard(props) {
    console.log(props.listId);
    let cardClass = "card-body " + props.id;
    return(
        <div className="card col-2">
            {/* <img className="card-img-top" src={props.listItem.items[0].poster} alt="Card image cap"></img> */}

            <div className={cardClass} id={props.listId} onClick = {()=> props.onClick(props.listId,props.category)}>
                {/* <h4 className="card-title"> {props.listItem.title} </h4> */}
                <h4 className="card-title"> {props.listItem.title} </h4>
            </div>          
        </div>
    );
}

export default ListCard;