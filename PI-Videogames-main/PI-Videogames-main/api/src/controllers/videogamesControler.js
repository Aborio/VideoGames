
const { Videogame, Genres } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;

const createVideogame = async (name, description, platforms, released, rating, imagen, genresID) => {
try{
    const genres = await Genres.findOne({
        where: {
            id: genresID,
            
        }
    });

    const videogame = await Videogame.create({
        name,
        description,
        platforms,
        released,
        rating,
        imagen,
        

    });
    await videogame.addGenres(genres);
    return videogame;
}
catch(error){
    throw new Error(error);
}
}

const getVideogamesDB = async () => {
    const videogames = await Videogame.findAll({
        include: {
            model: Genres,
            attributes: ['name'],
        }
         
    });
    return videogames;
}

const getVideogamesByApi = async () => {

    let games = [];

    let currentPage = 1;
    while (games.length < 100) {
        const peticion = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${currentPage}&page_size=500`);
        const data = peticion.data.results.map((e) => {
            return {
                id: e.id,
                name: e.name,
                description: e.description,
                platforms: e.platforms.map((e) => e.platform.name),
                imagen: e.background_image,
                released: e.released,
                rating: e.rating,
                genres: e.genres.map((e) => e.name)

            }
        }
        )
        games = [...games, ...data];
        currentPage++;
    }
    return games;
    // const peticion = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=15&page_size=100`);
    // const data = peticion.data.results.map((e) => {
    //     return {
    //         id: e.id,
    //         name: e.name,
    //         description: e.description,
    //         platforms: e.platforms.map((e) => e.platform.name),
    //         imagen: e.background_image,
    //         released: e.released,
    //         rating: e.rating,
    //         genres: e.genres.map((e) => e.name)
    //     }
    // }
    // )
    // return data;
}

const getAllVideogames = async () => {
    const videoDB = await getVideogamesDB();
    const videoApi = await getVideogamesByApi();
    const allVideogames = [...videoDB, ...videoApi];
    return allVideogames;
}


const getVideogameById = async (id) => {

    if (id.length > 5) {
        const videoDB = await getVideogamesDB();
        const videogame = videoDB.find((e) => e.id === id);
        return videogame;
    }
    else {
        const peticion = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const data = {
            id: peticion.data.id,
            name: peticion.data.name,
            description: peticion.data.description,
            platforms: peticion.data.platforms.map((e) => e.platform.name),
            imagen: peticion.data.background_image,
            released: peticion.data.released,
            rating: peticion.data.rating,
            genres: peticion.data.genres.map((e) => e.name)
        }
        return data;
    }

}

const getVideogameByName = async (name) => {
    const videoDB = await getAllVideogames();
    const videogame = videoDB.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));

    const limit = videogame.slice(0, 15);
    return limit;
    
    


    
    // const videoDB = await getAllVideogames();
    // const lowercaseName = name.toLowerCase();
    // const videogame = videoDB.filter((e) => e.name.toLowerCase().includes(lowercaseName));
    // return videogame;

}



module.exports = {
    createVideogame,
    getAllVideogames,
    getVideogameById,
    getVideogameByName
}
