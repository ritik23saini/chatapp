import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  }

]);

function App() {
  return (

    <div className=" h-screen text-center justify-center items-center" >

      <RouterProvider router={router} />
        
    </div >

  )
}

export default App
