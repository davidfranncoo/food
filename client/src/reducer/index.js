
const initialState={
     recipes:[],
     //!creo esta array ya que sera el soporte que contendra la informacion por la cual voy a sacar la informacion
     recipeSuport:[]
};
//! >>>>>> ACA VA LA LOGICA DEL ACTION
export default function rootReducer(state=initialState,action){

    switch(action.type){
        case "GET_RECIPES":
          //  console.log("recipesssssss:", action.payload)
        return{
            ...state,
            recipes:action.payload,
            recipeSuport:action.payload
        }


        case "FILTER_BY_DIET":
            const recipe=state.recipeSuport;
            const filterDiet= action.payload==="all"?
            recipe:
            recipe.filter((e)=>{
             
            for(let i=0; i<e.diet.length;i++){
               if(e.diet[i]===action.payload) return e ;
                }})
          
             return {
                ...state,
                recipes:filterDiet

            }
        case "FILTER_BY_NAME" :
            const recipes2=state.recipes; 
            const finterName= action.payload==="asc"?
            //!ascenente
            
            recipes2.sort((a,b)=>{

                if(a.name<b.name)return -1;
                if(a>b)return 1;
                return 0;

            }):
            //!descendente
            recipes2.sort((a,b)=>{
              
                if(a.name>b.name)return -1;
                if(a.name<b.name)return 1;
                return 0;

            })
            console.log("find;;;",finterName)
           console.log("recipe:",state.recipes)
        return {
            ...state,
            recipes: finterName
              
        }
        default:
            return state;
    }

}
