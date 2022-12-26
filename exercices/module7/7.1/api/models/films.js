const { table } = require("node:console");
const path = require("node:path");

const { parse, serialize } = require("../utils/json");

const jsonDbPath = __dirname + "/../data/films.json";

const MOVIES = [
  {
    id: 1,
    title: "Interstellare (2014)",
    duration: 90,
    budjet: 900,
    link: "www.wikipedia.com",
  },
  {
    id: 2,
    title: "Le Parrain 1972",
    duration: 120,
    budjet: 900,
    link: "www.wikipedia.com",
  },
  {
    id: 3,
    title: "Les Affranchis 1990",
    duration: 150,
    budjet: 900,
    link: "www.wikipedia.com",
  },
  {
    id: 4,
    title: "Matrix 1999",
    duration: 160,
    budjet: 900,
    link: "www.wikipedia.com",
  },
];

function readAllMovies(filtered) {
  /* const filteredByDuration = filtered?.hasOwnProperty("minimum-duration")
    ? Number(filtered)
    : undefined; */

    
  if (
    filtered !== undefined &&
    (isNaN(filtered) || filtered <= 0)
  )
    return res.sendStatus(400);

  const movies = parse(jsonDbPath, MOVIES);
  if (!filtered) return movies;

  return [...movies].filter(
    (film) => film.duration >= filtered
  );
}

function readOneMovie(id) {
  const movies = parse(jsonDbPath, MOVIES);

  const indexMovie = movies.findIndex((film) => film.id == id);

  if (indexMovie < 0) return undefined;

  return movies[indexMovie];
}

function createOneMovie(title, duration, budjet, link) {
  const movies = parse(jsonDbPath, MOVIES);

  const newMovies = {
    id: getNextId(),
    title,
    duration,
    budjet,
    link,
  };

  movies.push(newMovies);
  serialize(jsonDbPath, movies);

  return newMovies;
}

function getNextId() {
  const movies = parse(jsonDbPath, MOVIES);
  const lastItemIndex = movies?.length !== 0 ? movies.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? movies[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  return nextId;
}

function deleteOneMovie(id) {
  const movies = parse(jsonDbPath, MOVIES);
  const foundIndex = movies.findIndex((movie) => movie.id == id);

  if (foundIndex < 0) return undefined;

  const itemsRemovedFromMovies = movies.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMovies[0];

  serialize(jsonDbPath, movies);
  return itemRemoved;
}

function updateOneFilm(id, propertiesToUpdate) {
  const movies = parse(jsonDbPath, MOVIES);
  const foundIndex = movies.findIndex((movie) => movie.id == id);
    
  if (foundIndex < 0) return undefined;
  const updatedFilm = {...movies[foundIndex],...propertiesToUpdate};

  movies[foundIndex] = updatedFilm;
  serialize(jsonDbPath, movies);
  return updatedFilm;

}

module.exports = {
  readAllMovies,
  readOneMovie,
  createOneMovie,
  deleteOneMovie,
  updateOneFilm,
};
