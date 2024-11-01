import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Playlist from './pages/Playlist'
import Search from './pages/Search'
import Library from './pages/Library'
import LikedSongs from './pages/LikedSongs'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/library" element={<Library />} />
          <Route path="/liked" element={<LikedSongs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/playlist/:id" element={<Playlist />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App