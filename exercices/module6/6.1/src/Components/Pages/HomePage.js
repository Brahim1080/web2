const HomePage = async () => {
  document.title = 'Read from JokeAPI';
  const main = document.querySelector('main');
  const response = await fetch('https://v2.jokeapi.dev/joke/Any?lang=fr');
  const joke = await response.json();
  main.innerHTML = `
  <div class="alert alert-info"> 
    <h6>${joke.category}</h6>
    <q>${joke.setup}</q>
    <br>
    <q>${joke.delivery}</q>
  </div>
  `;
};

export default HomePage;
