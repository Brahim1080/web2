/* eslint-disable no-console */
import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';

const addMoviePage = () => {
  clearPage();
  renderPageTitle('Add a movie');
  renderAddMovieForm();
};

function renderAddMovieForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const title = document.createElement('input');
  title.type = 'text';
  title.id = 'title';
  title.placeholder = 'title of your movie';
  title.required = true;
  title.className = 'form-control mb-3';
  const link = document.createElement('input');
  link.type = 'link';
  link.id = 'link';
  link.required = true;
  link.placeholder = 'link of your movie';
  link.className = 'form-control mb-3';

  const duration = document.createElement('input');
  duration.type = 'number';
  duration.id = 'duration';
  duration.required = true;
  duration.placeholder = 'duration of your movie (min)';
  duration.className = 'form-control mb-3';

  const budjet = document.createElement('input');
  budjet.type = 'number';
  budjet.id = 'budjet';
  budjet.required = true;
  budjet.placeholder = 'budjet of your movie (million)';
  budjet.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Add movies to the list';
  submit.type = 'submit';
  submit.className = 'btn btn-primary';
  form.appendChild(title);
  form.appendChild(link);
  form.appendChild(duration);
  form.appendChild(budjet);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', onAddMovie);
}

async function onAddMovie(e) {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const link = document.querySelector('#link').value;
  const duration = document.querySelector('#duration').value;
  const budjet = document.querySelector('#budjet').value;

  const authenticatedUser = getAuthenticatedUser();

  try {
    const { token } = authenticatedUser;
    console.log({ token });
    const options = {
      method: 'POST',
      body: JSON.stringify({
        title,
        link,
        duration,
        budjet,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const response = await fetch('/api/films', options); // fetch return a promise => we wait for the response

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const newMovie = await response.json(); // json() returns a promise => we wait for the data

    console.log('New movie added : ', newMovie);
  } catch (error) {
    console.error(error);
  }

  Navigate('/');
}

export default addMoviePage;
