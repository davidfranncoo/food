const { Router } = require('express');
const {default:axios}=require("axios");//! xq va el default
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Op }= require('sequelize') ;
const router = Router()
//router.use(express.json())// a ver si sirve
const { Recipe } = require('../db.js')//! 20 HOOOORassss CONN ESTOOOO: fijate como traigo la info












//! informacion traida desde api
const getApiInfo= async()=>{//!problema al llamar 30
    //const ApiInfo= await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=ab5a4eefca974375a23259884a1096ff&addRecipeInformation=true&number=6");
    const ApiInfo= await axios.get("http://localhost:3002/data");
   
      
const f= await ApiInfo.data.results.map(e=>{
        //este if es para no correr si no vienen pasos
          if( Object.keys(e.analyzedInstructions).length === 0){ 
             return;
            }else{ 
            return{ 
               // id:e.id,    
               name: e.title,
                image:e.image,
                diet:e.diets,
                health_score:e.healthScore,
                dish_summary:e.summary,
                steps:e.analyzedInstructions[0].steps
            }}
         }
        ) 
    const ApiData=await f.filter(e=>e!==undefined)
    console.log(ApiData)
    return ApiData;   
}





router.get("/recipee",async(req,res)=>{
    const l=await getApiInfo()
    return res.status(200).send(l)

 
})  



 //!guardamos la info de Api a DB
const createDb= async()=>{

    const e=await getApiInfo()// info de api 
    const data=await Recipe.bulkCreate(e)
    console.log(data)
    try {
         console.log(data)
        return data; 
    } catch (A) {
        console.log("error")
        return A;
        
    }
}

//         try{
//             const data= await Recipe.findAll();
//     // 

//             if(!data.length){//! con bulkCreate () traigo la info de la api y mapeo a la base de dato
//                 const created=await Recipe.bulkCreate(getapiinfo)
               
//                 return created;   
//             }
  
//         } catch(error){
//             console.log("HAY UN SUPER ERRO FRANCO",error)
//         }
// }






 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//?GET/ recipe?name="..."
//? LISTA de receta que CONTENGA la pabra recivida por query
//? SI no existe mostra el mensaje adecuado


//!

router.get("/recipe",async(req,res)=>{
    const name= req.query.name;
    const Recipes= await createDb() 
    if(name){
        const  theRecipe=await Recipes.filter((e)=>e.name===name)
        theRecipe.length?
        res.status(200).json(theRecipe):
        res.status(400).json({"error":"no hay receta que coincida"})
    }else{
        return res.status(200).send(Recipes)
    }})
    
    
    
    //?GET/recipe/{idReceta}
    //? obtien eel detalle de una recte en particular
    //?debe tener solo los dato pedido en la ruta de detalle de receta
    //?incluir los tipos de dietas asociada
    
    
    
    
    router.get("/recipe/:id",async(req,res)=>{
        try{
            const{id}=req.params;
            const totalRecipe= await createDb();

            if(id){
                let recipeId= await totalRecipe.filter((e)=>e.id===id)
                if(recipeId.length)res.status(200).json(recipeId);
            }} catch(error){
                res.status(404).json({"smj":"error"})
            }
        
        
    })
    
    //?POST/recipe
    //?recibe por body datos de un formulario controlado
//? cre uuna receta en la DB  relacionada con su tipo de dieta

//?GET/diets
//?obtiene todos los tipos de dieta posibles
//? cuando no exista primerament ninguno, debera precargar la base de datos  con los tipos de datos indicado por spoonacular









module.exports = router;
