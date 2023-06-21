import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Paginado from "./Paginado";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogames, orderCards, filterVideogameBySource } from "./reducer/actions"

const AllData = () => {
    const dispatch = useDispatch();

    const allData = useSelector((state) => state.videogames);
    console.log(allData)
    const filterData = useSelector((state) => state.genres);
    
     useEffect(() => {
         dispatch(getVideogames())
         setCurrentPage(1)
     }, [dispatch])
   

    const [filter, setFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState("");
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const indexOfLastCountry = currentPage * videogamesPerPage; // esto es el current page 1 * 10 = 10 (el 10 viene del user state que arranca en 10)
    const indexOfFirstCountry = Math.max(indexOfLastCountry - videogamesPerPage) // esto es el 10 - 10 = 0 (el 10 viene del user state que arranca en 10)
    // const currentVideogames = allData.slice(indexOfFirstCountry, indexOfLastCountry); // esto me da de resultado un array de 10 paises
    const currentVideogames = Array.isArray(allData) // Verificar si allData es un array
    ? allData.filter((game) => filter === "All" || game.genres.includes(filter))
              .slice(indexOfFirstCountry, indexOfLastCountry)
    : [];


    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [filter])

    const handleFilter = (event) => {
        event.preventDefault();
        const selectedGenre = event.target.value;
        setFilter(selectedGenre);
        setCurrentPage(1);
    }


    const handleOrder = (event) => {
        event.preventDefault();
        dispatch(orderCards(event.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${event.target.value}`)
    }

    

    const handleFilterBySource = (event) => {
        event.preventDefault();
        const selectedSource = event.target.value;
        dispatch(filterVideogameBySource(selectedSource));
        setCurrentPage(1);
        console.log(allData)

    }



    return (



        <div>
            

            <Paginado
            videogamesPerPage={videogamesPerPage}
            allVideogames={allData.length}
            paginado={paginado}
            />


            <select onChange={handleOrder}>
            <option value="All">
                Orden nombre de A - Z
            </option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
            </select>

            <select onChange={handleFilterBySource}>
            <option value="BOTH">BOTH</option>
            <option value="API">API</option>
            <option value="DB">DB</option>
            </select>
            <select onChange={handleFilter}>
            <option value="All">All</option>
            <option value="Action">Action</option>
            <option value="Indie">Indie</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="Strategy">Strategy</option>
            <option value="Shooter">Shooter</option>
            <option value="Casual">Casual</option>
            <option value="Simulation">Simulation</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Arcade">Arcade</option>
            <option value="Platformer">Platform</option>
            <option value="Massively Multiplayer">Massively Multiplayer</option>
            <option value="Racing">Racing</option>
            <option value="Sports">Sports</option>
            <option value="Fighting">Fighting</option>
            <option value="Family">Family</option>
            <option value="Board Games">Board Games</option>
            <option value="Educational">Educational</option>
            <option value="Card">Card</option>
            </select>


            <div className="row">

            {currentVideogames?.map((e) => {

                return (
                    <div className="container" key={e.id}>
                        <h1>{e.name}</h1>
                        <h2>{Array.isArray(e.genres)
                        ? e.genres.map((genre) => (typeof genre === "object" ? genre.name : genre)).join(", ")
                        : e.genres}</h2>
                        <NavLink to={`/detail/${e.id}`}>
                        <button><img src={e.imagen} alt="img" width="200px"height="200px" /></button>
                        </NavLink>
                    </div>
                )
            })
            }
            </div>
        </div>
    )
}

export default AllData;
