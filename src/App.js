import { useContext } from 'react';
import Modal from './components/Modal';
import PubliLayout from './layouts/PubliLayout';
import Timer from './pages/Timer';
import Todo from './pages/Todo';

import { RouterProvider, BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div>
        <nav>
          <ul id="navigation">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todo">About</Link>
            </li>
            <li>
              <Link to="/timer">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route exact path="/">
          <Todo/>
        </Route>
        <Route exact path="/todo">
          <Todo/>
        </Route>
        <Route path="/timer">
         <Timer/>
        </Route>
      </Switch>
    </div>
    );
}

export default App;
