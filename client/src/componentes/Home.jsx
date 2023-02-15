import React,{useEffect, Fragment,useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRecipes} from "../action"
import {Link} from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";


export default function Home(){
    const dispatch=useDispatch();
    
    const allRecipe=useSelector(state=>state.recipes) || [];
    console.log("cantidaddd",allRecipe.length)
    //? creo los estados locales para el paginado
    //! es par la pagina actual que comienza en la pag 1
    const[currenPage,setCurrenPage]=useState(1) 
    //!guarmae en la cantidad de receta por pagina
    const recipePerPage = 9;//?const[recipePerPage,setRecipePerPage]=useState(9)
    //! indice del ultimpo personaje
    const indexOfLastRecipe=currenPage*recipePerPage
    //! indice del primer personaje
    const indexOfFirstRecipe= indexOfLastRecipe - recipePerPage
    //! guardo todos los personajes por pagina
    const currentRecipes=allRecipe.slice(indexOfFirstRecipe,indexOfLastRecipe)
    //! const paginado

    //!ayudara al renderizado
    const paginado=(pageNumber)=>{
        setCurrenPage(pageNumber)
    }


    useEffect(()=>{//!esto es lo que va montar al inicio 
        dispatch(getRecipes())
    }, [dispatch])//! dentro del parentesis indica, que se montara si se ejecuesa lo que est dentro

    
    
    function handlerClick(e){
        //? WARING no me pasa e.preven averiguar
        e.preventDefault();//! para que no recarge cada instante y reviente la pagina
        dispatch(getRecipes());
    }

//! en el selec va a ir loos filtros
//! el value siempre va para que luego nos permitan acceder a ello
//! el segundo sele puede ser por el tipo de dieta por ende si son muchos se puede hacer un map
    return (
        <div>
            <Link to="/recipe"> CREAR RECETA</Link>

            <h1>AGUANTE LAS RECETAS</h1>

            <button onClick={(e)=>{handlerClick(e)}}> 

            volver a cargar los componentes</button>
            <div>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="dsc">Descendente</option>
                    
                </select>
                <select>
                    <option value="1">Todas las diestas</option>
                    <option value="1">Dieta 1</option>
                    <option value="2">Dieta 2</option>
                    <option value="3">Dieta 3</option>
                    <option value="4">Dieta 4</option>

                </select>
                <select>
                    <option value="ver1 "> hiscore 1 a 100</option>
                    <option value="ver 2">hiscore 100 a 1</option>
                </select>
             <Paginado
            recipePerPage={recipePerPage}
            allRecipes={allRecipe.length}
            paginado={paginado}/>
            {
                currentRecipes?.map((e,index)=>{
                    return(
                        <Fragment key={index}>
                            <Link to={"/home/" + e.id}>
                            <Card name={e.name} image={e.image} diets={e.diet} />
                                
                            </Link>
                        </Fragment>
                    )
                    
                })
                
            } 
            </div>
        </div>
    )


}