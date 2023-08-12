import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';

import './style/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>  //снял - двоило при componentDidMount в CharList.js в режиме разработчика 
    <App />
  // </React.StrictMode>
);
