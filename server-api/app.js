import { createRequire } from "module"
const require = createRequire(import.meta.url)

import config from './configs/express.js'
const express = require('express')
const app = express()
import { userRoutes } from './routes/userRoutes.js'
import { topicsRoutes } from './routes/topicsRoutes.js'



app.use(config)
app.use(userRoutes)
app.use(topicsRoutes)

export default app
