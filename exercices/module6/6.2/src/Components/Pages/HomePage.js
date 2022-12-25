/* eslint-disable no-console */
import { clearPage, renderPageTitle } from '../../utils/render';

const HomePage = async () => {
  clearPage();
  renderPageTitle('Movies list');

  const movies = await getAllMovies();
  renderMoviesFromString(movies);
  attachEventListener()

};

function attachEventListener(){
  const btnforDelete = document.querySelectorAll('.btnDelete')
  
  btnforDelete.forEach(element => {
    element.addEventListener('click',deleteMovie)
    
  });

  const title = document.querySelectorAll('.title');

  title.forEach(element => {
    element.addEventListener('input',updateTitle)
    
  });
}
async function updateTitle(e) {
  e.preventDefault();

  
  
}

async function deleteMovie(e){
  e.preventDefault();

  try {

    const options = {
      method: 'DELETE'
    }

    const response = fetch(`api/films/${e.target?.dataset.id}`,options)

    const del = await response;
    console.log({del});
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
  const list = `
  <table class ="table">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Link</th>
        <th scope="col">Duration (min)</th>

        <th scope="col">Budget </th>
        <th scope="col">Operation</th>
        
      </tr>
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
      <td class="fw-bold text-info title" contenteditable="true" data-id="${movie.id}"> ${movie.title}</td>
      <td class ="text-info"> <a href="${movie.link}">${movie.link}</a></td>
      <td class ="text-info">${movie.duration}</td>
      <td class ="text-info">${movie.budjet}</td>
      <td class ="text-info">
      <button type="button" class="btn btn-primary btnDelete"  data-id="${movie.id}">Delete</button>
      <button type="button" class="btn btn-primary">Save</button>
      </td>
    </tr>`;
  });
  return list;
}





export default HomePage;
