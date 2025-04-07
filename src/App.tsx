import './App.css'
import { RouterProvider } from "react-router";
import router from './routes';

const App: React.FC = () => {

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
