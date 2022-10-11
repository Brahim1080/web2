import { clearPage , renderPageTitle} from '../../utils/render';

const MOVIES = [ 
  {
  title: "Harry Potter and the Philosopher's Stone",
  duration: 152,
  budget: 125,
  link: 'https://www.imdb.com/title/tt0241527/',
},
{
  title: 'Avengers: Endgame',
  duration: 181,
  budget: 181,
  link: 'https://en.wikipedia.org/wiki/Avengers:_Endgame',
}
]

const HomePage = () => {
  clearPage();
  renderPageTitle('Movies list')
  renderMoviesFromString(MOVIES);


};





function renderMoviesFromString(movies){
  const moviesListAsString = getMoviesListAsString(movies);

  const main = document.querySelector('main');

  main.innerHTML += moviesListAsString;

}

function getMoviesListAsString(movies){
  const moviesListString = getAllMoviesListAsString(movies);
  const moviesList = addMoviesToList(moviesListString);
  return moviesList;
}

// puts each line in the list and returns the  movie list 
function addMoviesToList(movies){
  const list = `
  <table class ="table">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Duration (min)</th>
        <th scope="col">Budget (million)</th>
        
      </tr>
    </thead>
    <tbody>
      ${movies}
    </tbody>
  </table>
  `
  return list;
}
// return a string containing each line of the list
function getAllMoviesListAsString(moviesList){
  let list = ' ';

  moviesList?.forEach((movie) => {
      list += ` <tr>
      <td> <a href ="${movie.link}">${movie.title} </a> </td>
      <td>${movie.duration}</td>
      <td>${movie.budget}</td>
    </tr>`;

  });
  return list;
}



export default HomePage;
