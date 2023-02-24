import { Link } from "react-router-dom";
import React,{useEffect}from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../action";

export default function Detail(props){      
    console.log("esto es props",props.match.params)

    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const myRecipe=useSelector((state)=>state.detail);
console.log("recipe:",myRecipe)
    return (
        <div>
        {myRecipe ? (
          <>
            <h1>La receta {myRecipe.name}</h1>
            <img src={myRecipe.image} alt={myRecipe.name} />
            <br />
            <br />
            <Link to="/home">
              <button>Volver</button>
            </Link>
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    )
}