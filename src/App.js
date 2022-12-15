import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Button from '@mui/material/Button';
import './styles/App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ContentLogin from './components/Login';
import Register from './components/Register';

// for older browser support too
function getFullScreenElement() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullscreenElement ||
    document.msFullscreenElement
  );
}

// go in and out of the full screen
export function toggleFullScreen() {
  if (getFullScreenElement()) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen().catch((e) => {
      console.log(e);
    });
  }
}

// full screen on and off on double click
document.addEventListener('dblclick', () => {
  toggleFullScreen();
});

// document.addEventListener(
//   'keydown',
//   (e) => {
//     if (e.key === 'f') {
//       toggleFullScreen();
//     }
//   },
//   false
// );

// document.getElementById('fullscreen').addEventListener('click', () => {});
// a.addEventListener('click', () => {
//   console.log('event listener successfully added to the button');
//   toggleFullScreen();
// });

const App = () => {
  return (
    <div id="page">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<ContentLogin />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
