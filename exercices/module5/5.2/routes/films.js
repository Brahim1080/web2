var express = require("express");

var router = express.Router();
const {
  readAllMovies,
  readOneMovie,
  createOneMovie,
  deleteOneMovie,
  updateOneFilm,
} = require("../models/films");


/* Read All films . */
router.get("/", function (req, res, next) {
  const filter = req.query["minimum-duration"];
  console.log({filter});
  const movies = readAllMovies(filter);
  return res.json(movies);
});

router.get("/:id", (req, res) => {
  const foundMovie = readOneMovie(req.params.id);

  if (!foundMovie) return res.sendStatus(404);

  return res.json(foundMovie);
});

router.post("/", (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration =
    req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budjet = req?.body?.budjet?.length !== 0 ? req.body.budjet : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  console.log("POST /films");

  if (!title || !duration || !budjet || !link) return res.sendStatus(400); // error code '400 Bad request'

  const newMovie = createOneMovie(title, duration, budjet, link);
  return res.json(newMovie);
});

router.delete("/:id", (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);

  const itemRemoved = deleteOneMovie(req.params.id);
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
  )return res.sendStatus(400);

  const updatedFilm = updateOneFilm(req.params.id, {
    title,
    duration,
    budjet,
    link,
  });
  if (!updatedFilm) res.sendStatus(404);

  return res.json(updatedFilm);
});
module.exports = router;
