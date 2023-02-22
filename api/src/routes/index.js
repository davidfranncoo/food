const { Router } = require('express');
const {default:axios}=require("axios");//! xq va el default
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Op }= require('sequelize') ;
const router = Router()
//router.use(express.json())// a ver si sirve
const { Recipe, Diet} = require('../db.js')//! 20 HOOOORassss CONN ESTOOOO: fijate como traigo la info

const getInformation=async()=>{

    const ApiInfo= await axios.get("http://localhost:3002/data");
        const f= await ApiInfo.data.results.map(e=>{
            //!este if es para no correr si no vienen pasos
              if( Object.keys(e.analyzedInstructions).length === 0){ 
                 return;
                }else{ 
                return{ 
                    id:e.id,  
                   name: e.title,
                    image:e.image,
                    diet:e.diets,
                    health_score:e.healthScore,
                    dish_summary:e.summary,
                    steps:e.analyzedInstructions[0].steps
                }}}) 
        const ApiData=await f.filter(e=>e!==undefined) 
        const db=await Recipe.findAll({include:
            [{model:Diet}]})
        
            const Total= [...ApiData,...db]
        return Total;
        
}

router.get("/recipe",async(req,res)=>{
    const name=req.query.name;
   //const ApiInfo= await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=ab5a4eefca974375a23259884a1096ff&addRecipeInformation=true&number=6");
       const total=await getInformation()
   if(name){
            const searchName=total.filter((e)=>e.name.toLowerCase()===name.toLowerCase())
            return res.status(200).json(searchName);  
        }else{
            return res.status(200).json(total);   
        }});
            

    
    
    //?GET/recipe/{idReceta}
    //? obtien eel detalle de una recte en particular
    //?debe tener solo los dato pedido en la ruta de detalle de receta
    //?incluir los tipos de dietas asociada

    //!corroborar
    router.get('/recipe/:id', async (req, res) => {
        const { id } = req.params;
      const t=await getInformation()
      try {
          const recipe = t.filter((e)=>{e.id===id})
          if (!recipe) { 
           return res.status(404).json({ message: 'Receta no encontrada' });
          }
         const recipeDetails = {
           id: recipe.id,
           name: recipe.name,
           summary: recipe.summary,
           score: recipe.score,
           healthScore: recipe.healthScore,
           instructions: recipe.instructions,
           image: recipe.image,
           //diets: recipe.diets.map(d => d.name)
         };
          return res.status(200).json(recipeDetails);
        } catch (error) {
         
          return res.status(500).json({ message: 'Error interno del servidor' });
        }
      });
    
    //?POST/recipe
    //?recibe por body datos de un formulario controlado
//? cre uuna receta en la DB  relacionada con su tipo de dieta


router.post("/recipe",async(req,res)=>{
  let {
    name,
    image,
    diets,
    dish_summary,
    health_score,
    steps,
    createdDb   
  }=req.body;
 const postRecioe=await Recipe.create({
  name,
  image,
  diets,
  dish_summary,
  health_score,
  steps,
  createdDb,
 })
//! corroborar en la diets
return res.send("La receta fue creada con exito")
    
})

//?GET/diets
//?obtiene todos los tipos de dieta posibles
//? cuando no exista primerament ninguno, debera precargar la base de datos  con los tipos de datos indicado por spoonacular

router.get("/diets",async(req,res)=>{
  const e=await getInformation()
  const listDiet=[]
try {
  e.filter((e)=>{
 for( let i=0; i<e.diet.length;i ++){
  listDiet.push(e.diet[i])}})

   for(let i=0;i<listDiet.length;i++){
     
     Diet.findOrCreate({where:{name:listDiet[i]}})

   }


   return res.status(400).send("se cargaron correctamente los elementos a la tabla")
  } catch (error) {

    return res.status(400).send("error")
    
  }
})






module.exports = router;
