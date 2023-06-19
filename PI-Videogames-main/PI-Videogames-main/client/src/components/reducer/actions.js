import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const SEARCH = 'SEARCH';
export const GET_GAMESBYID = 'GET_GAMESBYID';
export const GET_GENRES = 'GET_GENRES';
export const ORDER_CARDS = 'ORDER_CARDS';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const POST_VIDEOGAME = 'POST_VIDEOGAME';
export const HANDLE_NUMBER = 'HANDLE_NUMBER';



export const getVideogamesByName = (name) => async dispatch => {
    try {
        const response = await fetch(`http://localhost:3001/videogames/hola?name=${name}`);
        const data = await ( response).json();
        console.log(data);
        dispatch({
            type: SEARCH,
            payload: data
        })

    } catch (error) {
        console.log(error);
    }
}

export const getVideogames = () => async dispatch => {
    try {
        const response = await fetch('http://localhost:3001/videogames');
        console.log(response)
        const data = await ( response).json();
        console.log(data)
        dispatch({
            type: GET_VIDEOGAMES,
            payload: data
        })

    } catch (error) {
        console.log(error);
    }
}


export const getVideogamesById = (id) => async dispatch => {
    try {
        const response = await fetch(`http://localhost:3001/videogames/${id}`);
        const data = await ( response).json();
        dispatch({
            type: GET_GAMESBYID,
            payload: data
        })

    } catch (error) {
        console.log(error);
    }
}

export const orderCards = (order) => {
    return {
        type: 'ORDER_CARDS',
        payload: order
    }
}

export const getGenres = () => async dispatch => {
    try {
        const response = await fetch('http://localhost:3001/genres');
        const data = await ( response).json();
        console.log(data)
        dispatch({
            type: GET_GENRES,
            payload: data
        })

    } catch (error) {
        console.log(error);
    }
}

export const filterByGenre = (genres) => {
    return{
        type: 'FILTER_BY_GENRE',
        payload : genres
    
    }

}

export const postVideogame = (payload) => async dispatch => {
    try {
    const api = await fetch('http://localhost:3001/videogames', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        const data = await api.json();
        dispatch({
            type: POST_VIDEOGAME,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }


}

export function handleNumber(num) {
    return {
        type: HANDLE_NUMBER,
        payload: num,
    };
}

