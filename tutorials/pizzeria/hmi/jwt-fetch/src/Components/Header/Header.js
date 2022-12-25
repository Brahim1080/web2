import sound from '../../sound/Infecticide-11-Pizza-Spinoza.mp3';

const Header = () => {
  renderTitleAndWrapper();
  renderAudioPlayer();
  
};

function renderTitleAndWrapper() {
  const header = document.querySelector('header');
  header.innerHTML = `
  <div id="navbarWrapper">
  </div>
  <h1 class="animate__animated animate__bounce text-center">
  We love Pizza
  </h1>
  `;
}

function renderAudioPlayer() {
  const header = document.querySelector('header');

  header.innerHTML += `
  <div class="text-center">
    <audio id="audioPlayer" controls autoplay class="mt-3">
    <source src="${sound}" type="audio/mpeg" />
    Your browser does not support the audio element.
    </audio>
  </div>
  `;
}


export default Header;
