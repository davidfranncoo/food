import axios from "axios";
 
export function getRecipes(){

    return async function(dispatch){

        const json =await axios.get("http://localhost:3001/recipee");
        console.log(json)

        return dispatch({
            type:"GET_RECIPES",
            payload:json.data
        })
    }
}