
import './App.css';
import { useState, useEffect } from 'react'
import SearchIcon from './search.svg'
import Movie from "./movie"

const API_URL = "http://www.omdbapi.com?apikey=b70017fd"
function App() {
  const [movies,setMovies] = useState([])
  const [searchTerm , setSearchTerm] = useState("")

  const movie1 = 
    {
      "Title": "Batman Begins",
      "Year": "2005",
      "imdbID": "tt0372784",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    }
  

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();

    setMovies(data.Search)
  }
  useEffect(()=>{
    searchMovies("batman");
  },[])
  return (
    <div className="app">
      <h1>Movies Cental</h1>
      <div className="search">
        <input placeholder='Search movies and series'
                value={searchTerm}
                onChange={(e)=> {
                  setSearchTerm(e.target.value)
                  e.target.value = ""
                }}

        />
        <img
        src={SearchIcon}
        onClick={()=>{

            searchMovies(searchTerm)
        }
      }></img>
      </div>
      {
        movies.length > 0 ?
        (
          <div className='container'>
              {
                movies.map((movi)=> 
                  <Movie movie={movi}/>
                )
              }
          </div>
        ) : (
          <div>
            <h2>No movies Found.</h2>
          </div>
        )
      }
      
    </div>
  );
}

export default App;
