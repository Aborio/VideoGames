const { Router } = require('express');
const{getVideogameById,getAllVideogames, getVideogameByName, createVideogame} = require('../controllers/videogamesControler.js');
const {saveGenresToDB, getAllGenres} = require('../controllers/genresController.js');
const {createGenres} = require('../controllers/genresController.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
router.get('/videogames', async (req, res) => {
    try{
        const games = await getAllVideogames();
        res.status(200).json(games);
    }
    catch(error){
        res.status(404).json({error: error.message});
    }
});


router.get('/videogames/hola', async (req, res) => {
    const {name} = req.query;
    console.log(name);
    try{
        if(!name){
            res.status(400).json({error: 'nombre invalido'});
            return
        }
        const videogames = await getVideogameByName(name);
        if(!videogames){

            res.status(404).json({error: 'videogame no encontrado'});
            return;
        }
        res.status(200).json(videogames);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }


});


router.get('/videogames/:id', async (req, res) => {
   const {id} = req.params;
   console.log(id);
   try{
    if(!id){
        res.status(400).json({error: 'id invalido'});
        return
    }
    const videogames = await getVideogameById(id);
    if(!videogames){
        res.status(404).json({error: 'videogame no encontrado'});
        return;
    }
    res.status(200).json(videogames);
   }
    catch(error){ 
        res.status(500).json({error: error.message});
    }
});


router.get('/genres', async (req, res) => {
    try{
        const genres = await saveGenresToDB();
        const allData = await getAllGenres();
        res.status(200).json(allData);
    }
    catch(error){
        res.status(404).json({error: error.message});
    }
});

router.post('/videogames', async (req, res) => {
    const {name, description, platforms, released, rating,imagen, genresID} = req.body;
    try{
        if(!name || !description || !platforms || !released || !rating || !imagen || !genresID){
            res.status(400).json({error: 'datos invalidos'});
            return;
        }
        const videogame = await createVideogame(name, description, platforms, released, rating, imagen, genresID);
        res.status(200).json(videogame);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
});


router.post('/genres', async (req, res) => {
    const {name} = req.body;
    try{
        if(!name){
            res.status(400).json({error:"datos no crrecto"});

        }
        const genres = await createGenres(name);
        res.status(200).json(genres);
    }
        catch(error){
            res.status(500).json({error: error.message});
        }
    });







// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
