import AllData from "./AllData"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getVideogames } from "./reducer/actions"

const Home = () => {


    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getVideogames())
    // }, [dispatch])


    return (
        <div>
            <h1>Home</h1>
            <AllData />
        </div>
    )
}

export default Home