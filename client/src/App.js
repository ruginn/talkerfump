import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import UserSearch from "./pages/UserSearch";
import UserProfile from "./pages/UserProfile";
import NavBar from "./components/NavBar";
import './styles/App.css'
import ScrollToTop from "./components/ScrollToTop";
import { useSelector } from "react-redux";
import Schedule from "./pages/Schedule";
import PageNotFound from './pages/PageNotFound'
import Messages from "./pages/Messages";
import Calculations from "./pages/Calculations";
import Achievements from "./pages/Achievements";
import Rules from "./pages/Rules";
import Notifications from "./pages/Notifications";
import AccountabilityPartner from "./pages/AccountabilityPartner";
import TopBar from "./components/Topbar";
import { useState } from "react";


function App() {
  const {user} = useSelector((state) => state.auth)
  const topBarDisplay = useSelector((state) => state.general.topBar)

  const [displayTopBar, setDisplayTopBar] = useState(true)

  const toggleTopBar = () => {
    setDisplayTopBar((prev) => !prev)
    console.log(setDisplayTopBar)
  }



  return (
    <div className="App">
      <ScrollToTop />
      {user && <NavBar />}
      <div className="main">
        {user && topBarDisplay && <TopBar/>}
        {/* <p onClick={toggleTopBar}> toggle me</p> */}
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/accountability' element={<AccountabilityPartner />} />
          <Route path='/register' element={<Register />} />
          <Route path='/schedule' element = {<Schedule /> }/>
          <Route path='/messages' element = {<Messages /> }/>
          <Route path='/rules' element = {<Rules />}/>
          <Route path='/calculations' element = {<Calculations /> }/>
          <Route path='/achievements' element = {<Achievements /> }/>
          <Route path='/users' element={<UserSearch />} />
          <Route path='/users/:userId' element={<UserProfile />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
