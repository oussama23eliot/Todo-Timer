import { useContext } from 'react';
import Modal from './components/Modal';
import PubliLayout from './layouts/PubliLayout';
import Timer from './pages/Timer';
import Todo from './pages/Todo';

import { RouterProvider, BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route  element={<PubliLayout />}>
            <title>TodoTimer </title>
            <Route path='/' element={<Todo />} />
            <Route path='/todo' element={<Todo />} />
            <Route path='/timer' element={<Timer />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
