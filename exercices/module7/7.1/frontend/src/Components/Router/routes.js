import HomePage from '../Pages/HomePage';
import addMoviePage from '../Pages/addMoviePage'
import LoginPage from '../Pages/LoginPage';
import Logout from '../Logout/Logout';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': LoginPage,
  '/addMovie' : addMoviePage,
  '/logout': Logout
};

export default routes;
