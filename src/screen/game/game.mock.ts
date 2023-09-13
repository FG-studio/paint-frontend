import { makeUniqueId } from '../../helpers'
import { MemetoStore } from '../../lib'
import { CanvasState } from '../../modules/paint/meta'
import { GameState, GameStoreState } from './types'

const users = new Array(20).fill(0).map((_, i) => ({
  name: `user ${i + 1}`,
  id: makeUniqueId(),
  isHost: i === 0,
}))

export const GameMock: Omit<GameStoreState, 'config'> = {
  id: makeUniqueId(),
  hostId: users[0].id,
  state: GameState.PENDING,
  drawStore: new MemetoStore<CanvasState>(),
  userList: users,
  prevData: {
    type: 'image',
    value:
      'http://127.0.0.1:9000/secret-words/8120304181753841/2/289486340279211/7358291525144241.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=SHVQL4T5TME0I9REZ3SA%2F20230907%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230907T083716Z&X-Amz-Expires=604800&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJTSFZRTDRUNVRNRTBJOVJFWjNTQSIsImV4cCI6MTY5NDExOTAxNCwicGFyZW50IjoiaGlldW5xIn0.q_8cLtHi7hBfeLshwyHhGPdUiEVOF5bNpQXA_LxYE-JTxa5fQ32Xqrlqe0-13xviX51UDWKYM2lZympiTUQSnw&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=0cfe8fb959ad6561bf261e44be308c5cb756155026f69d615c207298db3c8852',
  },
  round: 1,
  session: {
    ...users[0],
    isHost: true,
  },
  userReadyMap: new Map(),
  phaseTimeout: 10,
}
