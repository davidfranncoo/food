//! poner impor de react y link
import React from "react";
import {Link} from "react-router-dom";
import "./LandiPage.css"


export default function LandiPage(){
    //!entender el link
return(
    <div>
        <h1>bienvenido al incio </h1>
        <Link  to="/home">
        <button>ingresar</button>
        </Link>


    </div>

    )   

}
