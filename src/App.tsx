import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import NotificationProvider from './components/notification-popup/notification-provider'
import GameScreen from './screen/game/game.screen'
import LobbyScreen from './screen/lobby/lobby.screen'

const routers = createBrowserRouter([
  {
    path: '*',
    element: <LobbyScreen />,
  },
  {
    path: '/game',
    element: <GameScreen />,
  },
])

function App() {
  return (
    <NotificationProvider>
      <RouterProvider router={routers} />
    </NotificationProvider>
  )
}

export default App
