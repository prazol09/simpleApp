import { Link } from 'react-router-dom';
import { toggleFullScreen } from '../App';
import '../styles/Navigation.css';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogin } from '../store/loginSlice';

const Navigation = () => {
  // let a = window.localStorage.getItem('access_token');
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();

  if (isLoggedIn === 1) {
    return (
      <div id="menu">
        <h2 id="title">alternate society</h2>
        <Link to="/" className="L">
          <div id="icon" className="hIcon">
            ooo
          </div>
          <div id="label">
            <button id="nLabel">Home</button>
          </div>
        </Link>
        <Link
          className="L"
          onClick={() => {
            // delete access tokens ofrm local storage
            // toggleFullScreen();
            localStorage.clear();
            console.log('deleted form ls');
            dispatch(handleLogin(0)); // logging out
          }}
        >
          <div id="icon" className="loIcon">
            ooo
          </div>
          <div id="label">
            <button id="nLabel">Logout</button>
          </div>
        </Link>
        <Link
          className="L"
          onClick={() => {
            toggleFullScreen();
          }}
        >
          <div id="icon" className="fIcon">
            ooo
          </div>
          <div id="label">
            <button id="nLabel">Full Screen</button>
          </div>
        </Link>
      </div>
    );
  }
  return (
    <div id="menu">
      <h2 id="title">alternate society</h2>
      <Link to="/" className="L">
        <div id="icon" className="hIcon">
          ooo
        </div>
        <div id="label">
          <button id="nLabel">Home</button>
        </div>
      </Link>
      <Link to="/login" className="L">
        <div id="icon" className="lIcon">
          ooo
        </div>
        <div id="label">
          <button id="nLabel">Login</button>
        </div>
      </Link>
      <Link to="/register" className="L">
        <div id="icon" className="rIcon">
          ooo
        </div>
        <div id="label">
          <button id="nLabel">Register</button>
        </div>
      </Link>
      <Link
        className="L"
        onClick={() => {
          toggleFullScreen();
        }}
      >
        <div id="icon" className="fIcon">
          ooo
        </div>
        <div id="label">
          <button id="nLabel">Full Screen</button>
        </div>
      </Link>
    </div>
  );
};

export default Navigation;
