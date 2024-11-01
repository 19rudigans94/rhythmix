import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/shared/config'
import { PrivateRoute } from '@/features/auth'
import { Home } from './home'
import { Login } from './login'
import { Register } from './register'
import { Profile } from './profile'
import { Playlist } from './playlist'
import { Search } from './search'
import { Library } from './library'
import { LikedSongs } from './liked-songs'

export const Routing = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.SEARCH} element={<Search />} />
      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.PLAYLIST} element={<Playlist />} />
        <Route path={ROUTES.LIBRARY} element={<Library />} />
        <Route path={ROUTES.LIKED} element={<LikedSongs />} />
      </Route>
    </Routes>
  )
}