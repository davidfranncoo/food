//! poner impor de react y link
import React from "react";
import {Link} from "react-router-dom";
import "./LandiPage.css"

export default function LandiPage(){
    //!entender el link
return(
    <div className="img" >
       
        <div className="conteiner">
            <h1 className="inicio">Comida Rica <br/>
                &<br/> Saludable</h1>
            <Link  to="/home">
                <button className="ingresar">Bienvenido</button>
            </Link>
        </div>
    </div>
    )}
