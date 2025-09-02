import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/style.css';
import Counter from './Counter';
import ShowHide from './ShowHide';

createRoot(document.getElementById('root')).render(
  <>
    {/* <Counter/> */}

    <ShowHide/>
  </>,
)
