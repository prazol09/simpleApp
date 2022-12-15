import axios from 'axios';
import '../styles/Login.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  handleUsername,
  usernameStatus,
  handleFullName,
  fullNameStatus,
  handleEmail,
  emailStatus,
  handlePassword,
  handlePw1,
  handlePw2,
  passwordsStatus,
  register,
  regStatus,
} from '../store/registerSlice';
import { handleUsers, handleUsernameWarning } from '../store/loginSlice';
import { getUsernames, findElement } from './Login';

const regRequest = async (username, full_name, email, password) => {
  let payload = {
    username: username,
    full_name: full_name,
    email: email,
    password: password,
  };

  let res = await axios.post('http://localhost:3500/api/register', payload);

  let data = res.data;
  console.log(data);
  // return data;
};

// for email,password and full name length
export const lengthChecker = (n1, t1) => {
  if (n1.length === 0) {
    return `${t1} is required`;
  } else if (n1.length < 5) {
    return `${t1} is too short`;
  }
  return '';
};

const passwordChecker = (p1, p2) => {
  if (p1 === p2) {
    return true;
  }
  return false;
};

const passwordsStatusUpdate = (areSame) => {
  if (areSame) {
    return '';
  }
  return 'passwords dont match!!';
};

const Register = () => {
  const users = useSelector((state) => state.login.users);
  const usernameWarning = useSelector((state) => state.login.usernameWarning);
  // const username = useSelector((state) => state.login.username);
  const username = useSelector((state) => state.register.username);
  const username_status = useSelector(
    (state) => state.register.username_status
  );
  const p1 = useSelector((state) => state.register.pw1);
  const p2 = useSelector((state) => state.register.pw2);
  const full_name = useSelector((state) => state.register.full_name);
  const full_name_status = useSelector(
    (state) => state.register.full_name_status
  );
  const email = useSelector((state) => state.register.email);

  const email_status = useSelector((state) => state.register.email_status);
  const passwords_status = useSelector(
    (state) => state.register.passwords_status
  );
  const password = useSelector((state) => state.register.password);
  const reg_status = useSelector((state) => state.register.reg_status);
  const dispatch = useDispatch(); // necessary for using reducers

  return (
    <div id="content">
      <div className="loginc" id="register">
        <input
          type="text"
          placeholder="Username *"
          onClick={async () => {
            dispatch(handleUsers(await getUsernames()));
          }}
          onChange={(event) => {
            dispatch(handleUsername(event.target.value));
          }}
        />
        <p id="warning">{usernameWarning}</p>
        <p id="warning">{username_status}</p>
        <input
          type="text"
          placeholder="Full Name *"
          onChange={(event) => {
            dispatch(handleFullName(event.target.value));
          }}
          onClick={() => {
            dispatch(usernameStatus(lengthChecker(username, 'username')));
            dispatch(handleUsernameWarning('')); // to reset username warning state
            let userExists = findElement(username, users);
            if (userExists) {
              dispatch(handleUsernameWarning('username unavailable!!'));
            }
          }}
        />
        <p id="warning">{full_name_status}</p>
        <input
          type="text"
          placeholder="Email Address *"
          onChange={(event) => {
            dispatch(handleEmail(event.target.value));
          }}
          onClick={() => {
            dispatch(fullNameStatus(lengthChecker(full_name, 'full name')));
          }}
        />
        <p id="warning">{email_status}</p>
        {/* <Warning /> */}
        <input
          type="password"
          placeholder="Password *"
          onChange={(event) => {
            dispatch(handlePw1(event.target.value));
          }}
          onClick={() => {
            dispatch(emailStatus(lengthChecker(email, 'email')));
          }}
        />
        <p id="warning">{passwords_status}</p>
        <input
          type="password"
          placeholder="Confirm Password *"
          onChange={(event) => {
            dispatch(handlePw2(event.target.value));
          }}
        />

        <button
          id="loginb"
          onClick={() => {
            let areSame = passwordChecker(p1, p2);
            if (areSame) {
              dispatch(passwordsStatus(passwordsStatusUpdate(areSame)));
              dispatch(handlePassword(p2)); // to update main password
              if (usernameWarning === '') {
                if (
                  username === '' ||
                  full_name === '' ||
                  email === '' ||
                  password === ''
                ) {
                  dispatch(regStatus('Empty field/s found!!'));
                  // dispatch(regStatus(''));
                } else {
                  console.log('user created succ');

                  dispatch(register()); // once everything checks out
                  // regRequest(username, full_name, email, password);
                  dispatch(regStatus('Registeration Successful'));
                  // redirect to profile page after registeration

                  //
                }
              }
            } else {
              dispatch(passwordsStatus(passwordsStatusUpdate(areSame)));
              console.log('passwords dont match!!');
            }
          }}
        >
          Register
        </button>
        <p id="message">{reg_status}</p>
      </div>
    </div>
  );
};

export default Register;
