import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../action";


export default function SearchBar(){
    const dispatch=useDispatch()
    //!estado del nombre de la receta
    const[name, setName]=useState("")

    function hanlerInputChange(e){
        e.preventDefault()
        //!seteamos el nombre al estado
        setName(e.target.value)
        
    }
    function hadleSubmit(e){
        e.preventDefault();
        dispatch(getNameRecipe(name))
        setName(" ")
      
    }
console.log(name)
    return (
        <div>
            <input
            type="text"
            placeholder="Ingresa Receta..."
            onChange={(e)=>hanlerInputChange(e)}></input>

            <button type="submit" onClick={(e)=>hadleSubmit(e)}>buscar</button>
        </div>
    )
}