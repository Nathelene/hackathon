import React from "react";

interface Props {
        factText: string;
        gif: string;
}

export default function Card(props: Props) {

    return (
        <div className="fact-container">
             <img className="cat-gif" src={props.gif}/>
          <div className="fact-card">
             <p>{props.factText}</p>
          </div>
        </div>
    )
}