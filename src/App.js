import { useContext } from 'react';
import Modal from './components/Modal';
import PubliLayout from './layouts/PubliLayout';
import Timer from './pages/Timer';
import Todo from './pages/Todo';
import Navbar from '../components/navbar'


import { RouterProvider, BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className='scroll-smooth pb-20'>
      <Navbar />
      <Todo/>
    </div>
  );
}

export default App;
