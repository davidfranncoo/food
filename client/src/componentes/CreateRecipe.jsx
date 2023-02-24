import React, {useState, useEffect} from "react";
// useHistory es para que me envie a la home una vez creado la receta
import { Link} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import "./CreateRecipe.css"
import { postRecipe } from "../action";

export default function CreateRecipe(){

const dispatch=useDispatch()

const[input,setInput]=useState({
    name:"",
    image:"",
    dish_summary:"",
    diets:[],
    steps:[],
    health_score:"",
})
 //console.log("esto es input:",input)
function handlerChange(e){
    setInput({
        ...input,
        [e.target.name]:e.target.value
    })
}

const [inputSteps,setInputSteps]=useState("")
function handlerCkeck(e){
    if(e.target.checked){
        setInput({
            ...input,
            diets:[...input.diets,e.target.value]
        })
    }
}
function handlerStepClick(){
    if(inputSteps){
        setInput({
            ...input,
            steps:[...input.steps,inputSteps]
        })
        setInputSteps("")
    }else{

        alert("escribir algo")
    }
}
function handlerStepChange(e){
    console.log("esto es inputSteps:",e.target.value)
    
    setInputSteps(e.target.value)

}
function handlerSubmit(e){
   e.preventDefault(); 
   console.log(input)
   dispatch(postRecipe(input))
   alert("personaje creado");

   setInput({
   name:"",
   image:"",
   dish_summary:"",
  diets:[],
    steps:[],
  health_score:"",
})

   // aca podemos usar el history para que directamente me envie al home y ver mi receta
}
    return (
        <div>
            <Link to="/home"><button className="volver">volver</button></Link>
            <h1>crea tu personaje</h1>


            <form onSubmit={(e)=>handlerSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type="text"
                    value={input.name}
                    name="name"
                    onChange={(e)=>handlerChange(e)}/>
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="text"
                    value={input.image}
                    name="image"
                    onChange={(e)=>handlerChange(e)}/>
                </div>
                <div>
                    <label>Procedimiento:</label>
                    <input type="text"
                    value={input.dish_summary}
                    name="dish_summary"
                    onChange={(e)=>handlerChange(e)}/>
                </div>
              <div>
                    <label>Score:</label>
                    <input type="number"
                    value={input.health_score}
                    name="health_score"
                    onChange={(e)=>handlerChange(e)}/>
                </div>
    
                <div>
                    <label>Diets</label>

                    <br/>

                    <label><input
                    type="checkbox"
                    name="gluten free"
                    value="gluten free"
                    onChange={(e)=>handlerCkeck(e)}
                    />gluten free</label>

                     <label><input
                    type="checkbox"
                    name="dairy free"
                    value="dairy free"
                    onChange={(e)=>handlerCkeck(e)}
                    />dairy free</label>

                    <label><input
                    type="checkbox"
                    name="primal"
                    value="primal"
                    onChange={(e)=>handlerCkeck(e)}
                    />primal</label>

                    <label><input
                    type="checkbox"
                    name="gluten free"
                    value="gluten free"
                    onChange={(e)=>handlerCkeck(e)}
                    />gluten free</label>

                    <label><input
                    type="checkbox"
                    name="paleolithic"
                    value="paleolithic"
                    onChange={(e)=>handlerCkeck(e)}
                    />paleolithic</label>




                </div>
                <div >
                    <label >Steps</label>
                    <input
                    type="text"
                    value={inputSteps}
                    name="steps"
                    onChange={(e)=>handlerStepChange(e)}
                    />
                    {/* debemos poner type="button" para que no se confunda con el subtmit */}
                <button type="button"onClick={handlerStepClick}>agregar paso</button> 

                </div>
                <br/>
                <br/>

              <button type="submit"> Create Recipe</button>
            </form>
        </div>
    )
  
        

    }














/*------------------ PSEUDOCODIGO ----------------------- 
INICIO:  
importo react,useState, useEfect
importo link para la home, useHistory para enviar a una url
importo useDispatch para importar las accion y useSelector para seeccionar el stado


LOGICA:
creamos y ecportamos la funcion y dentreo de ella:




 ========== MAKETADO ==============
 *inputs de recipe, 

================ LOGICA ============





*/ 