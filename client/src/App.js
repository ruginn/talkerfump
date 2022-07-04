import Login from "./pages/Login";
import Register from "./pages/Register";
import {ToastContainer} from 'react-toastify'
import {Outlet} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* <Register /> */}
      {/* <Login /> */}
      <Outlet />
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
