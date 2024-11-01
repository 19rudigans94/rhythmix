import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Player from './Player'

function Layout() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-spotify-black p-6">
          <Outlet />
        </main>
      </div>
      <Player />
    </div>
  )
}

export default Layout