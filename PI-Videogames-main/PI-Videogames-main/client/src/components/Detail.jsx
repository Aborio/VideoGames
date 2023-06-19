import {useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVideogamesById } from "./reducer/actions";


const Detail = () => {
    const { id } = useParams();
    const videogames = useSelector((state) => state.videogames);
    console.log(videogames)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideogamesById(id))
    }
        , [dispatch, id])

        if(!videogames || videogames.length === 0) {
            return <h1>Loading...</h1>
        }
        let game;
        if (Array.isArray(videogames)) {
  // Si videogames es un arreglo, selecciona el primer elemento
        game = videogames[0];
        } else {
        // Si videogames es un objeto, asigna el objeto directamente
        game = videogames;
        }
    return (
        <div className="detail">
            <h1>Detail</h1>
            <h1>{game.name}</h1>
            <h2>{Array.isArray(game.genres)
                ? game.genres.map((genre) => (typeof genre === "object" ? genre.name : genre)).join(", ")
                : game.genres}</h2>
            <img src={game.imagen} alt="img" width="200px"height="200px" />
            <p className="descri">{game.description}</p>
            <h3>Lanzamiento: {game.released}</h3>
            <h3>Rating: {game.rating}</h3>
            <h3>Platforms: {game.platforms}</h3>

        </div>
    )

}

export default Detail;