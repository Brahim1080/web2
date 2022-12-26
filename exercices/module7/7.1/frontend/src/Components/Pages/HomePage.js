/* eslint-disable no-console */
import { clearPage, renderPageTitle } from '../../utils/render';
import { isAuthenticated, getAuthenticatedUser } from '../../utils/auths';

const HomePage = async () => {
  clearPage();
  renderPageTitle('Movies list');

  const movies = await getAllMovies();
  renderMoviesFromString(movies);
  attachEventListener();
};

function attachEventListener() {
  const btnforDelete = document.querySelectorAll('.btnDelete');

  btnforDelete.forEach((element) => {
    element.addEventListener('click', deleteMovie);
  });

  const save = document.querySelectorAll('.btnSave');

  save.forEach((element) => {
    element.addEventListener('click', update);
  });
}
async function update(e) {
  e.preventDefault();

  try {
    const { id } = e.target.dataset;
    const tr = e.target.parentElement.parentElement;
    const title = tr.children[0].firstChild.nodeValue;
    const link = tr.children[1].lastElementChild.href;
    const duration = tr.children[2].firstChild.nodeValue;
    const budjet = tr.children[3].firstChild.nodeValue;
    console.log({ id, title, link, duration, budjet });

    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        link,
        duration,
        budjet,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthenticatedUser().token,
      },
    };

    fetch(`api/films/${id}`, options);

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function deleteMovie(e) {
  e.preventDefault();

  try {
    const options = {
      method: 'DELETE',
      headers: { Authorization: getAuthenticatedUser().token },
    };

    const response = fetch(`api/films/${e.target?.dataset.id}`, options);

    const del = await response;
    console.log({ del });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function getAllMovies() {
  try {
    const response = fetch('api/films');

    const film = await response;

    return film.json();
  } catch (error) {
    console.log(error);
  }
  return null;
}

function renderMoviesFromString(movies) {
  const moviesListAsString = getMoviesListAsString(movies);

  const main = document.querySelector('main');

  main.innerHTML += moviesListAsString;
}

function getMoviesListAsString(movies) {
  const moviesListString = getAllMoviesListAsString(movies);
  const moviesList = addMoviesToList(moviesListString);
  return moviesList;
}

// puts each line in the list and returns the  movie list
function addMoviesToList(movies) {
  let list = `
  <table class ="table">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Link</th>
        <th scope="col">Duration (min)</th>

        <th scope="col">Budget </th>`;

  if (isAuthenticated()) {
    list += `<th scope="col">Operation</th>`;
  }

  list += `</tr>
    </thead>
    <tbody>
      ${movies}
    </tbody>
  </table>
  `;
  return list;
}
// return a string containing each line of the list
function getAllMoviesListAsString(moviesList) {
  let list = ' ';

  moviesList?.forEach((movie) => {
    list += ` <tr>
      <td class="fw-bold text-info" contenteditable="true" > ${movie.title}</td>
      <td class ="text-info" contenteditable="true"> <a href="${movie.link}">${movie.link}</a></td>
      <td class ="text-info" contenteditable="true">${movie.duration}</td>
      <td class ="text-info" contenteditable="true">${movie.budjet}</td>
      <td class ="text-info">`;

    if (isAuthenticated()) {
      list += `<button type="button" class="btn btn-primary btnDelete"  data-id="${movie.id}">Delete</button>
        <button type="button" class="btn btn-primary btnSave" data-id="${movie.id}">Save</button>`;
    }

    list += `</td>
    </tr>`;
  });
  return list;
}

export default HomePage;
