const { Videogame, Genres } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;

const getGenresAPI = async () => {
    try{
    const peticion = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const data = peticion.data.results.map((e) => {
        return {
            id: e.id,
            name: e.name
        }
    }
    )

    return data;

}
catch(error){
    console.log(error);
}
}

const getGenresDB = async () => {
    try {
        const genres = await Genres.findAll();
        return genres;
    } catch(error) {
        console.log('Error al obtener los géneros de la base de datos', error);
    }
};


const saveGenresToDB = async () => {
    try {
        const genresAPI = await getGenresAPI(); // Obtener los géneros desde la API
        const genresDB = await getGenresDB(); // Obtener los géneros desde la base de datos (si ya existen)

        // Comparar los géneros obtenidos de la API con los existentes en la base de datos
        const genresToAdd = genresAPI.filter((genre) => {
            return !genresDB.find((genreDB) => genreDB.id === genre.id);
        });

        // Guardar los nuevos géneros en la base de datos
        await Genres.bulkCreate(genresToAdd);

        console.log('Datos guardados exitosamente en la base de datos');
    } catch(error) {
        console.log('Error al guardar los datos en la base de datos', error);
    }
};


const getAllGenres = async () => {
    try {
        const genres = await Genres.findAll();
        return genres;
    } catch(error) {
        console.log('Error al obtener los géneros de la base de datos', error);
    }
};

const createGenres = async (req, res) => {
    try {
        const genre = await Genres.create();
        return res.json(genre);
    } catch(error) {
        console.log('Error al crear el género', error);
    }
};




module.exports = {
    saveGenresToDB,
    getGenresAPI,
    getAllGenres,
    createGenres
};