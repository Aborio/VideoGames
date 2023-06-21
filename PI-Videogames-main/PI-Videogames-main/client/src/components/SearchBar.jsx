import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogamesByName } from "./reducer/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.searchVideogames);
  const [name, setName] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    if (name) {
      dispatch(getVideogamesByName(name));
      setName("");
      setShowResults(true);
    } else {
      alert("Debe buscar algo");
    }
  };

  const handleHideResults = () => {
    setShowResults(false);
  };

  return (
    <div className="searchBar">
      <input
        id="name"
        onChange={handleChange}
        type="search"
        value={name}
        placeholder="Busque aquí"
      />
      <button onClick={handleSubmit}>Buscar</button>

      
      {showResults && (
        
        <div className="row">
          <button onClick={handleHideResults}>Cerrar resultados</button>
          {allVideogames && Object.values(allVideogames).map((game) => (
            <div className="container" key={game.id}>
              <h1>{game.name}</h1>
              <img src={game.imagen} alt="img" width="200px" height="200px" />
            </div>
          ))}

        </div>
      )}
    </div>
  );
}