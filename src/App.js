import "./App.css";
import { getMovieList, searchMovie } from "./Api";
import { useEffect, useState } from "react";
import moment from "moment";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            className="Movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          />
          <div className="Movie-date">
            Release Date :{" "}
            {moment(movie.release_date).format("DD MMMM YYYY", "id")}
          </div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results)
      // console.log({ query: query });
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>DAFTAR FILM HARI INI</h1>
        <input
          placeholder="cari film terbaru ..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
