import axios from "axios";
//!>>>>> ACA EN ACTION SOLO DESPACHAMOS LA ACTION Y EN REDUCER LA LOGICA 


export function getRecipes(){
    //! dispatch siempre tiene funciones que retorna acciones, que reducer haga lo propio
    return async function(dispatch){
     const json =await axios.get("http://localhost:3001/recipee")
          return dispatch({
            type:"GET_RECIPES",
            payload:json.data
         })}}

export function filterRecipeByDiet(payload){       
    return{
        type:"FILTER_BY_DIET",  
        payload,
    }}
export function getNameRecipe(name){
return async function (dispatch){
    try {
        var json=await axios.get("http://localhost:3001/recipee?name="+ name)
        return dispatch({
            type:"GET_NAME_RECIPE",
            payload:json.data
        })
    } catch (error) {
        return error;
        
    }
}

}
export function filterByName(payload){
    return {
        type:"FILTER_BY_NAME",
        payload,
    }


}