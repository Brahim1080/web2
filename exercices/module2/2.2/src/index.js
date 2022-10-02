import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';


const MOVIES = [
    {
        id : 1,
        title : "Interstellare (2014)",
        synopsis : "Alors que la vie sur Terre touche à sa fin, un groupe d’explorateurs s’attelle à la mission la plus importante de l’histoire de l’humanité : franchir les limites de notre galaxie pour savoir si l’homme peut vivre sur une autre planète… ",
        img : "https://media.senscritique.com/media/000018762465/300/interstellar.jpg"
    },
    {
        id: 2,
        title : "Le Parrain 1972",
        synopsis : "New York, 1945. Don Vito Corleone règne sur l'une des familles les plus puissantes de la mafia italo-américaine. Virgil Sollozzo, qui dirige la famille ... ",
        img : "https://media.senscritique.com/media/000020072264/300/le_parrain.jpg"
    },
    {
        id: 3,
        title : "Les Affranchis 1990",
        synopsis : "A Brooklyn, dans les années 1950, Henry Hill, né d’un père irlandais et d’unemèresicilienne, a toujours voulu devenir gangster. Il commet à 16 ans ses premiers délits. Arrêté, le gamin desrues gagne le respect du parrain Paul",
        img : "https://media.senscritique.com/media/000008041479/300/les_affranchis.jpg"
    },
    {
        id: 4,
        title : "Matrix 1999",
        synopsis : " Neo, un des pirates les plus recherchés du cyber-espace, reçoit de mystérieux messages cryptés d'un certain Morpheus. Celui-ci l'exhorte à aller au-delà des apparences et à trouver la réponse à la question qui hante constamment",
        img : "https://media.senscritique.com/media/000020033620/300/matrix.jpg"
    }

];

renderMoviesFromString(MOVIES);

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
    <ol class="list-unstyled mx-5 ">
        ${movies}
    </ol>
    `
    return list;
}
// return a string containing each line of the list
function getAllMoviesListAsString(moviesList){
    let list = ' ';

    moviesList?.forEach((movie) => {
        list += `<li class="mb-5"><article>
        <div class="row"> 
            <div class="col-md-3 mb-3">
                 <img src="${movie.img}" height=200px alt="">
            </div>
            <div class="col-md"> <h3>${movie.title}</h3>
            <p> <strong>Synopsis : </strong> ${movie.synopsis}</p>
            </div> 
            </article> 
        </li>`;

    });
    return list;
}