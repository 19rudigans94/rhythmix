import { Sidebar } from '@/widgets/sidebar'
import { Player } from '@/widgets/player'

export const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-rhythmix-black p-6">
          {children}
        </main>
      </div>
      <Player />
    </div>
  )
}