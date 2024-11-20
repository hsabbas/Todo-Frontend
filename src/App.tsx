
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { createContext, useEffect, useState } from 'react'
import { User } from './model/User'
import { getUser, logout } from './utils/APIUtils'
import imgUrl from '../images/github-mark.png'


export const CurrentUserContext = createContext(new User(0, "", false));

function App() {
  const [currentUser, setCurrentUser] = useState<User>(new User(0, "", false));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUser().then(response => {
      if (response.status == 200) {
        response.json().then(json => {
          setCurrentUser(new User(json.id, json.email, true));   
          setLoading(false);
        })
      } else {
        setLoading(false);
      }
    })
  }, [])

  if(loading) {
    return <></>
  }

  function onLogout(){
    logout().then(() => {
      setCurrentUser(new User(0, "", false));
    })
  }

  return (
    <>
      <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <Navbar onLogout={onLogout}/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login setCurrentUser={setCurrentUser}/>}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
        </CurrentUserContext.Provider>
      </BrowserRouter >
      <footer>
        <a href='https://github.com/hsabbas/Todo-Frontend'>
          <img className='github-logo' alt='Github Repo' src={imgUrl}></img>
        </a>
      </footer>
    </>
  )
}

export default App
