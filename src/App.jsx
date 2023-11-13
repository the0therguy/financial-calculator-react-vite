import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/Home/HomePage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import SignUpPage from "./pages/SignUp/SignUpPage.jsx";
import {AuthProvider} from './context/AuthContext'
import PrivateRoute from "./utils/PrivateRoute.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute/>}>
              <Route element={<HomePage/>} path="/"/>
            </Route>
            <Route element={<LoginPage/>} path="/login"/>
            <Route element={<SignUpPage/>} path="/signup"/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>

    </>
  )
}

export default App
