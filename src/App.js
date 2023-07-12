import { useContext } from 'react';
import Modal from './components/Modal';
import PubliLayout from './layouts/PubliLayout';
import Timer from './pages/Timer';
import Todo from './pages/Todo';

import { RouterProvider, BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <PubliLayout>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Todo />} />
          {/* <Route path='/update/:itemId' element={<Todo content={{ modal: true }} />} /> */}
          <Route path='/delete/:itemId' element={<Modal />} />
          <Route path='/timer' element={<Timer />} />
        </Routes>
      </BrowserRouter>
    </PubliLayout>
  );
}

export default App;
