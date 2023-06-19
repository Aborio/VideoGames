import { GET_VIDEOGAMES,HANDLE_NUMBER, POST_VIDEOGAME, SEARCH,FILTER_BY_GENRE, GET_GAMESBYID, ORDER_CARDS, GET_GENRES } from "./actions";

const initialState = {
    videogames: [],
    allVideogames: [],
    searchVideogames: [],
    genres: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_VIDEOGAMES:
            const videogames = Array.isArray(action.payload) ? action.payload : [action.payload]
            return {
                ...state,
                videogames: videogames,
                allVideogames: videogames
            }

        case SEARCH:
            return {
                ...state,
                searchVideogames: action.payload

            }
        case GET_GAMESBYID:
            return {
                ...state,
                videogames: action.payload
            }
        case ORDER_CARDS:
            let sorted = action.payload === 'asc' ?
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }
                ) :
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                }
                )
            return {
                ...state,
                videogames: sorted
                
            }


            case FILTER_BY_GENRE:
                const allVideogames = [...state.videogames]
                 console.log(allVideogames)
    
                   if (action.payload === 'All') {
                       return {...state, videogames: allVideogames};
                    }
                      console.log(action.payload)
    
                  const filterGenre = allVideogames.filter(el => el.genres.includes(action.payload))
                  console.log(filterGenre)
                    
                
                  return {
                      ...state,
                     videogames: filterGenre
                }

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }

        case POST_VIDEOGAME:
            return {
                ...state,
                videogames: [...state.videogames, action.payload]
            }


            case HANDLE_NUMBER:
            return {
                ...state,
                numPage: action.payload,
            };


        default:
            return {...state};
    }
}

export default reducer;