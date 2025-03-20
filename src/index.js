import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // 변경: './.css'에서 './index.css'로 수정
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);