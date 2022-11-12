var express = require("express");
const {serialize,parse} = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/films.json';


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

/* Read All films . */
router.get("/", function (req, res, next) {
  const filteredByDuration = req?.query?.hasOwnProperty("minimum-duration")
    ? Number(req.query["minimum-duration"])
    : undefined;

  if (
    filteredByDuration !== undefined &&
    (isNaN(filteredByDuration) || filteredByDuration <= 0)
  )
    return res.sendStatus(400);

  const movies = parse(jsonDbPath,MOVIES);
  if (!filteredByDuration) return res.json(movies);

  const filteredMovies = [...movies].filter(
    (film) => film.duration >= filteredByDuration
  );

  return res.json(filteredMovies);
});

router.get("/:id", (req, res) => {
  console.log(`GET /films/${req.params.id}`);
  
  const movies = parse(jsonDbPath,MOVIES);

  const indexOfFilmFound = movies.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  res.json(movies[indexOfFilmFound]);
});

router.post("/", (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration =
    req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budjet = req?.body?.budjet?.length !== 0 ? req.body.budjet : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  console.log("POST /films");

  if (!title || !duration || !budjet || !link) return res.sendStatus(400); // error code '400 Bad request'

  const movies = parse(jsonDbPath,MOVIES);
  const lastItemIndex = movies?.length !== 0 ? movies.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? movies[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  
  const newMovie = {
    id: nextId,
    title: title,
    duration: duration,
    budjet: budjet,
    link: link,
  };

  movies.push(newMovie);
  serialize(jsonDbPath,movies);
  return res.json(newMovie);
});

router.delete("/:id", (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);

  const movies = parse(jsonDbPath,MOVIES);

  const foundIndex = movies.findIndex((movie) => movie.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMovies = movies.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMovies[0];

  serialize(jsonDbPath, movies);
  return res.json(itemRemoved);
});

router.patch("/:id", (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budjet = req?.body?.budjet;
  const link = req?.body?.link;
  console.log("PATCH /films");

  if (
    (!title && !duration && !budjet && !link) ||
    title?.length === 0 ||
    duration?.length === 0 ||
    budjet?.length === 0 ||
    link?.length === 0
  )
    return res.sendStatus(400);
  
  const movies = parse(jsonDbPath,MOVIES);
  const foundIndex = movies.findIndex((film) => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = { ...movies[foundIndex], ...req.body };

  movies[foundIndex] = updatedFilm;
  
  serialize(jsonDbPath,movies);
  return res.json(updatedFilm);
});
module.exports = router;
