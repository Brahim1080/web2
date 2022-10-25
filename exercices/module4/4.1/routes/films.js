var express = require("express");
var router = express.Router();

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

  console.log("Filter : ", filteredByDuration);
  console.log("type ", typeof filteredByDuration);

  //Filtered sera toujouts un number car on le transform en number ??
  if (
    filteredByDuration !== undefined &&
    (isNaN(filteredByDuration) || filteredByDuration <= 0)
  )
    return res.sendStatus(400);

  if (!filteredByDuration) return res.json(MOVIES);

  const filteredMovies = [...MOVIES].filter(
    (film) => film.duration >= filteredByDuration
  );

  return res.json(filteredMovies);
});

router.get("/:id", (req, res) => {
  console.log(`GET /films/${req.params.id}`);

  const indexOfFilmFound = MOVIES.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  res.json(MOVIES[indexOfFilmFound]);
});

router.post("/", (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration =
    req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budjet = req?.body?.budjet?.length !== 0 ? req.body.budjet : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  console.log("POST /films");

  if (!title || !duration || !budjet || !link) return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = MOVIES?.length !== 0 ? MOVIES.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? MOVIES[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newMovie = {
    id: nextId,
    title: title,
    duration: duration,
    budjet: budjet,
    link: link,
  };

  MOVIES.push(newMovie);

  res.json(newMovie);
});

router.delete("/:id", (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);

  const foundIndex = MOVIES.findIndex((movie) => movie.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMovies = MOVIES.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMovies[0];

  res.json(itemRemoved);
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

  const foundIndex = MOVIES.findIndex((film) => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = { ...MOVIES[foundIndex], ...req.body };

  MOVIES[foundIndex] = updatedFilm;

  res.json(updatedFilm);
});
module.exports = router;
