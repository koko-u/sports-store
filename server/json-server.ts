import { db } from './db'
import { authMiddleware } from './authMiddleware'
import * as jsonServer from 'json-server'

const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const router = jsonServer.router(db)
const port = 3000

server.use(middlewares)
server.use(authMiddleware)
server.use(router)
server.listen(port, () => {
  console.log(`json server is running on port ${port}`)
})
