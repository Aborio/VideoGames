import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { useState } from "react";
import { postVideogame, getGenres } from "../reducer/actions";
import { useEffect } from "react";


const Create = () => {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        released: "",
        imagen: "",
        rating: "",
        platforms: [],
        genresID: ""

    });

    const validate = () => {

        let validationErrors = {
            name: "",
            description: "",
            released: "",
            imagen: "",
            rating: "",
            platforms: [],
            genresID: ""
            
        }
        if(!input.name) {
            validationErrors.name = "El nombre es requerido"

        }

        
        if(!input.description) {
            validationErrors.description = "La descripción es requerida"
            

        }
        if (!input.released) {
            validationErrors.released = "La fecha de lanzamiento es requerida";
          }
        if (!isValidDateFormat(input.released, "DD/MM/YYYY")) {
            validationErrors.released = "La fecha debe tener el formato DD/MM/YYYY";
          }
        if(!input.imagen) {
            validationErrors.imagen = "La imagen es requerida"
            

        }
        if(isNaN(input.rating) || input.rating < 0 || input.rating > 5) {
            validationErrors.rating =  "El rating debe ser un número entre 0 y 5"
            

        }
        if(input.genresID.length === 0) {
            validationErrors.genresID = "Debe seleccionar al menos un género"

        }

        setErrors(validationErrors);
        
        return validationErrors;    
    }

    const isValidDateFormat = (dateString, format) => {
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const matches = regex.exec(dateString);
        if (!matches) {
          return false;
        }
        const day = parseInt(matches[1], 10);
        const month = parseInt(matches[2], 10);
        const year = parseInt(matches[3], 10);
      
        // Verificar si la fecha es válida
        const isValidDay = day >= 1 && day <= 31;
        const isValidMonth = month >= 1 && month <= 12;
        const isValidYear = year >= 1900 && year <= 9999;
      
        return isValidDay && isValidMonth && isValidYear;
      };


    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        imagen: "",
        rating: "",
        platforms: [],
        genresID: []
    })

    const handleInputChange = (event) => {
        event.preventDefault();
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const handlePlatforms = (event) => {
        if (input.platforms.includes(event.target.value)) {
            setInput({
                ...input,
                platforms: input.platforms.filter((p) => p !== event.target.value)
            })
        } else {
            setInput({
                ...input,
                platforms: [...input.platforms, event.target.value]
            })
        }
    }

    const handleGenres = (event) => {
        const genreId = event.target.value;
        const isChecked = event.target.checked;
      
        setInput((prevState) => {
          let updatedGenresID;
          if (isChecked) {
            updatedGenresID = [...prevState.genresID, genreId];
          } else {
            updatedGenresID = prevState.genresID.filter((g) => g !== genreId);
          }
      
          return {
            ...prevState,
            genresID: updatedGenresID,
          };
        });
      };




      const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        const hasGenreErrors = validationErrors.genresID !== "";

        if(hasGenreErrors || Object.keys(validationErrors).some((k) => validationErrors[k] !== "")) {
            setErrors(validationErrors);
        
        }
        if (
          validationErrors.name ||
          validationErrors.description ||
          validationErrors.released ||
          validationErrors.imagen ||
          validationErrors.rating  ||
            validationErrors.genresID
      
        ) {
          alert(
            validationErrors.name ||
            validationErrors.description ||
            validationErrors.released ||
            validationErrors.imagen ||
            validationErrors.rating ||
            validationErrors.genresID
           
          );
        } else {
          dispatch(postVideogame(input));
          alert("Videojuego creado correctamente");
          setInput({
            name: "",
            description: "",
            released: "",
            imagen: "",
            rating: "",
            platforms: [],
            genresID: [],
          });
        }
      };


      const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

            let errorMessage = "";

            if (name === "genres" && !checked && input.genresID.length === 1) {
            errorMessage = "At least one genre must be selected.";
            }

            setInput((prevGame) => {
            if (checked) {
                return {
                ...prevGame,
                [name]: [...prevGame[name], event.target.value]
                };
            } else {
                return {
                ...prevGame,
                [name]: prevGame[name].filter((value) => value !== event.target.value)
                };
            }
            });

            setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage
            }));
        };







    return (
        <div className="cform">

            <h1>Crear videojuego</h1>
            <form onSubmit={handleSubmit}>
                <div>

                    <label>Nombre</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={input.name}
                        onChange={handleInputChange}
                    />
                
                </div>
                <div>
                    <label>Descripción</label>
                    <input
                        type="text"
                        name="description"
                        placeholder="Descripción"
                        value={input.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Fecha de lanzamiento</label>
                    <input
                        type="text"
                        name="released"
                        placeholder="DD/MM/YYYY"
                        value={input.released}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Imagen</label>
                    <input
                        type="text"
                        name="imagen"
                        placeholder="URL de la imagen"
                        value={input.imagen}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Rating</label>
                    <input
                        type="text"
                        name="rating"
                        placeholder="Rating"
                        value={input.rating}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Plataformas</label>
                    <select onChange={handlePlatforms}>
                        <option >Plataformas</option>
                        <option value="PC">PC</option>
                        <option value="PlayStation">PlayStation</option>
                        <option value="Xbox">Xbox</option>
                        <option value="Nintendo">Nintendo</option>
                        <option value="iOS">iOS</option>
                        <option value="Android">Android</option>
                        <option value="Apple Macintosh">Apple Macintosh</option>
                        <option value="Linux">Linux</option>
                        <option value="Nintendo 3DS">Nintendo 3DS</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                        <option value="PlayStation 2">PlayStation 2</option>
                        <option value="PlayStation 3">PlayStation 3</option>
                        <option value="PlayStation 4">PlayStation 4</option>
                        <option value="PlayStation 5">PlayStation 5</option>
                        <option value="PlayStation Vita">PlayStation Vita</option>
                        <option value="Xbox 360">Xbox 360</option>
                        <option value="Xbox One">Xbox One</option>
                        <option value="Xbox Series S/X">Xbox Series S/X</option>
                    </select>
                    {errors.platforms && <span>{errors.platforms}</span>}
                </div>
                <div className="label">
                    <h2>Géneros</h2>
                 <div className="checkbox"> 
                {genres.map((g) => (
                <label key={g.id} className="label">
                <input
                type="checkbox"
                className="checkbox1"
                id={`genre-${g.id}`}
                name="genresID"
                value={g.id}
                checked={input.genresID.includes(String(g.id))}
                onChange={handleCheckboxChange}
                disabled={g.name === 'Géneros'}
            />
            <label htmlFor={`genre-${g.id}`}>{g.name}</label>
            
        </label>
        
    ))}
                </div>
                </div>
                <button className="button" type="submit">Crear videojuego</button>
            </form>
        </div>

    )
}

export default Create



