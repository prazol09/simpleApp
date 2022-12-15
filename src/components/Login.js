import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  handleUsername,
  handlePassword,
  handleUsers,
  handleUsernameWarning,
  handlePasswordWarning,
  handleLogin,
} from '../store/loginSlice';
import { lengthChecker } from './Register';

export const getUsernames = async () => {
  let res = await axios.get('http://localhost:3500/api/allusers');

  let data = res.data;
  return data;
};

const loginRequest = async (username, password) => {
  let payload = { username: username, password: password };

  let res = await axios.post('http://localhost:3500/api/login', payload);

  let data = res.data;
  // console.log(data);
  return data;
};

// returns true if element exists in the array
//                  to find         to find in
export const findElement = (element_value, elements) => {
  const found_element = elements.find((element) => element === element_value);
  if (found_element === element_value) {
    return true;
  }
  return false;
};

const Login = () => {
  // console.log(`--->${window.localStorage.getItem('access_tokens')}:--`);
  const username = useSelector((state) => state.login.username);
  const usernameWarning = useSelector((state) => state.login.usernameWarning);

  const password = useSelector((state) => state.login.password);
  const passwordWarning = useSelector((state) => state.login.passwordWarning);

  const users = useSelector((state) => state.login.users);

  const dispatch = useDispatch(); // necessary for using reducers

  // user returned to home page upon successful login
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className="loginc" id="login">
      <input
        type="text"
        placeholder="Username"
        onClick={async () => {
          dispatch(handleUsers(await getUsernames()));
        }}
        onChange={(event) => {
          dispatch(handleUsername(event.target.value));
        }}
      />
      <p id="warning">{usernameWarning}</p>
      <input
        type="password"
        placeholder="Password"
        onClick={() => {
          dispatch(handleUsernameWarning('')); // to reset username warning state
          let userExists = findElement(username, users);
          if (!userExists) {
            dispatch(handleUsernameWarning('user does not exist'));
          }
        }}
        onChange={(event) => {
          dispatch(handlePassword(event.target.value));
        }}
      />
      <p id="warning">{passwordWarning}</p>
      {/* <Link to="/" className="L">
        </Link> */}
      <button
        id="loginb"
        onClick={async () => {
          dispatch(handlePasswordWarning(lengthChecker(password, 'password')));

          // needs event from click in parm
          // only one click allowed
          // event.currentTarget.disabled = true;
          if (username === '' && password === '') {
            dispatch(handlePasswordWarning('username and password required!!'));
          }
          if (password !== '') {
            let userExists = findElement(username, users);

            if (userExists) {
              const tokens = await loginRequest(username, password);
              if (Object.keys(tokens).length === 2) {
                window.localStorage.setItem(
                  'access_token',
                  tokens.access_token
                );
                window.localStorage.setItem(
                  'refresh_token',
                  tokens.refresh_token
                );
                console.log(
                  `refreshToken: ${window.localStorage.getItem(
                    'refresh_token'
                  )}`
                );
                console.log(
                  `accessToken: ${window.localStorage.getItem('access_token')}`
                );
                dispatch(handleLogin(1));
                handleRedirect(); // redirected to home page
              } else {
                dispatch(handlePasswordWarning('incorrect password!!'));
                return;
              }
            }
          }
        }}
      >
        Login
      </button>
      {/* { props.loggedIn ? null : <Redirect to="/login" /> } */}
    </div>
  );
};

const ContentLogin = () => {
  return (
    <div id="content">
      <Login />
    </div>
  );
};

export default ContentLogin;
