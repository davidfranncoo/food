import React,{useEffect, Fragment,useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRecipes, filterRecipeByDiet, filterByName} from "../action"
import {Link} from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";


export default function Home(){
    const dispatch=useDispatch();
    const allRecipe=useSelector(state=>state.recipes) || [];
    
    //? creo los estados locales para el paginado
    //! es par la pagina actual que comienza en la pag 1
    const[currenPage,setCurrenPage]=useState(1) 
    //!guarmae en la cantidad de receta por pagina
    //!CLAVER PARA ORDENAR ASCENDEMTE Y DESCENDENTE
    const[order,setOrder]=useState("")
    //const[recipePerPage,setRecipePerPage]=useState(9)
    const recipePerPage = 9;
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
        dispatch(getRecipes())
    }
    function handlerFilterDiet(e){
        dispatch(filterRecipeByDiet(e.target.value))

    }
    function handlerOrder(e){
        e.preventDefault();
        dispatch(filterByName(e.target.value))
        setCurrenPage(1);
        setOrder(`${e.target.value}`)
    }

//! en el selec va a ir loos filtros
//! el value siempre va para que luego nos permitan acceder a ello
//! el segundo sele puede ser por el tipo de dieta por ende si son muchos se puede hacer un map
    return (
        <div>
            <Link to="/recipe"> CREAR RECETA</Link>

            <h1>AGUANTE LAS RECETAS</h1>

            <button onClick={(e)=>handlerClick(e)}> 

            volver a cargar los componentes</button>
            <div>
                <select onChange={(e)=>handlerOrder(e)}>
                    <option value="asc">Ascendente</option>
                    <option value="dsc">Descendente</option>
                    
                </select>
                <select onChange={(e)=>handlerFilterDiet(e)}>
                    <option value="all">Todas</option>
                    <option value="gluten free">Libre De Gluten</option>
                    <option value="dairy free">Sin Lacteo</option>
                    <option value="lacto ovo vegetarian">Ovo Lacteo Vegetariano </option>
                    <option value="vegan">Vegano</option>
                    <option value="whole 30">Los 30</option>
                    <option value="primal">Primaveral</option>
                    

                </select>
                <select>
                    <option value="hiscore1a100"> hiscore 1 a 100</option>
                    <option value="hiscore100a1">hiscore 100 a 1</option>
                </select>
             <Paginado
            recipePerPage={recipePerPage}
            allRecipes={allRecipe.length}
            paginado={paginado}/>
            <SearchBar/>
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