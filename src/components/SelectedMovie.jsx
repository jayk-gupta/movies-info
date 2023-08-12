import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import StarRating from "./StarRating";
import Loader from "./UI/Loader";
import { useRef } from "react";
const KEY = "3f631a1d";
function MovieDetails({ selectedId, onCloseMovie, onAddWatched,watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(function () {
    if(userRating) countRef.current = countRef.current + 1;
  },[userRating])

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
console.log(isWatched);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current
    };
    onAddWatched(newMovie);
    onCloseMovie();
  }
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );
  useEffect(function () {
    if (!title) return;
    document.title = `Movie | ${title}`
    
    return function () {
      document.title = 'Movies Info'
      console.log(`cleanup effect for the movie ${title}`);
    }
},[title])
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`}></img>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull: {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
                {!isWatched ?
                  <><StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
                  {userRating > 0 && <button className="btn-add" onClick={handleAdd}>
                    Add to list
                  </button>}
                  </> : <p>You rated this movie {watchedUserRating}
                  <span>⭐</span>
                  </p>}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
