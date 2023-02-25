import React from "react";
import "./Card.css"
 export default function Card({name, image, diets}){
    return (
        <div className="card">
            <h3>{name}</h3>
            <h5>{diets}</h5>
            <img src={image}
            alt="imagene no funciona"
            width="200px"
            height="250px"/>
        </div>
    )
 }