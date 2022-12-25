import { clearAuthenticatedUser } from '../../utils/auths';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const Logout = () => {
  clearAuthenticatedUser();
  // eslint-disable-next-line no-console
  console.log('testtt');
  Navbar();
  Navigate('/login');
};

export default Logout;
