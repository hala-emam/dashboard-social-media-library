import { RouterProvider, createBrowserRouter } from "react-router-dom"
import PageLayout from "./pages/PageLayout"
import Home from "./pages/Home"
import Users from './pages/Users/index';
import Posts from './pages/Posts/index';
import Books from "./pages/Books";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <PageLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'users', element: <Users /> },
        { path: 'posts', element: <Posts /> },
        { path: 'books', element: <Books /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
