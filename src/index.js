import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './main.css'
import { GlobalProvider } from './store/globalContext';
import Todo from './pages/Todo';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Timer from './pages/Timer';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Todo />,
  },
  {
    path: "todo",
    element: <Todo />,
  },
  {
    path: "timer",
    element: <Timer />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
