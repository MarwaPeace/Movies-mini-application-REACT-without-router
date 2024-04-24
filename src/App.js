import { useState, useEffect } from "react";
import "./App.css";
import ListMovies from "./Components/ListMovies";
import AddMovie from "./Components/AddMovie";
import Search from "./Components/Search";
import Rate from "./Components/Rate";
import MoviesApi from './Data/MoviesApi'

function App() {
  
  const [Movies, setMovies] = useState(MoviesApi)
  

  //******** Show and Hide Function  *********/
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const [showRate, setShowRate] = useState(false);
  const handleShowRate = () => {
    setSearchRate(0);
    setShowRate(!showRate);
  };

  //******** Search States*********/
  const [searchName, setSearchName] = useState("");
  const [searchRate, setSearchRate] = useState(5);

  //******** Add Movie  Function  with not saving in localStorage *********/
/*   const AddToMovie = (Movie) => {
    setMovies([...Movies, Movie]);
  };
 
  console.log(Movies);*/
//******** Add Movie function with saving in localStorage *********/
  const AddToMovie = (Movie) => {
    const updatedMovies = [...Movies, Movie];
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies)); // Saving in localStorage.
  };
  console.log(Movies);
  useEffect(() => {
    const storedMovies = localStorage.getItem("movies");
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    } else {
      setMovies(MoviesApi); // Using default data if no data is found in localStorage.
    }
  }, []);
 
  return (
    <>


      <div className="App">
        <button style={{ margin: "20px" }} onClick={handleShow}>
          {show ? "Close" : "Add New Movie"}
        </button>
        {show && <AddMovie AddToMovie={AddToMovie} />}

        <Search setSearchName={setSearchName} setSearchRate={setSearchRate} />
        <button style={{ margin: "20px" }} onClick={handleShowRate}>
          {show ? "Clear" : "Search by Rate"}
        </button>
        {showRate && (
          <Rate searchRate={searchRate} setSearchRate={setSearchRate} />
        )}

        <ListMovies
          Movies={Movies}
          searchName={searchName}
          searchRate={searchRate}
        />
      </div>
    </>
  );
}

export default App;

