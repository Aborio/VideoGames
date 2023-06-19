import React from "react";
import { useState } from "react";

export default function Paginado({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1);

    for(let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++){
        pageNumbers.push(i);
    }

    const handlePageClick = (number) => {
        setCurrentPage(number);
        paginado(number);
      };

    return(
        <nav className="controlP">
            <ul className="paginado">
                {pageNumbers &&
                pageNumbers.map(number => (
                    <li
                    key={number}
                    className={`paginado ${currentPage === number ? "active" : ""}`}
                  >
                    <button
                      className={`paginado1 ${currentPage === number ? "active-button" : ""}`}
                      onClick={() => handlePageClick(number)}
                    >
                      {number}
                    </button>
                    </li>
                ))}
            </ul>
            <p>Estás en la página: {currentPage}</p>
        </nav>
    )
}
