import axios from "axios";
//!>>>>> ACA EN ACTION SOLO DESPACHAMOS LA ACTION Y EN REDUCER LA LOGICA 



export function getRecipes(){
    //! dispatch siempre tiene funciones que retorna acciones, que reducer haga lo propio
    return async function(dispatch){
     const json =await axios.get("http://localhost:3001/recipe")
          return dispatch({
            type:"GET_RECIPES",
            payload:json.data
         })}
    };



export function filterRecipeByDiet(payload){       
    return{
        type:"FILTER_BY_DIET",  
        payload,
    }
};


export function getNameRecipe(name){
return async function (dispatch){
    try {
        var json=await axios.get("http://localhost:3001/recipe?name="+ name)
        return dispatch({
            type:"ORDER_BY_NAME",
            payload:json.data
        })}
     catch (error) {
        return error}}
};



export function filterByName(payload){
    return {
        type:"FILTER_BY_NAME",
        payload,}
};
export  function postRecipe(payload){
    return async function (dispatch){
        //! ver cvomo enviar la iformacion
        const response=await axios.post("http://localhost:3001/recipe",payload)
    return dispatch({
        type:"POST_RECIPE",
        response
    
    })}}
export function getDetail(id){
    return async function(dispatch){
        try {
            var json=await axios.get("http://localhost:3001/recipe/"+ id);
            console.log(json)
            return dispatch({
                type:"GET_DETAILS",
                payload:json.data
            })
        } catch (error) {
            console.log(error)
            
        }
    }
}