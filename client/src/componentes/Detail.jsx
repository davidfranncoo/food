import { Link } from "react-router-dom";
import React,{useEffect}from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../action";

export default function Detail(){  

    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getDetail())
    },[dispatch])
    const myRecipe=useSelector((state)=>state.detail);

    return (
        <div>
            <Link to="/home">
                <button> volver</button>
            </Link>
        </div>
    )
}