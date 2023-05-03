import { createRequire } from "module"
const require = createRequire(import.meta.url)

import config from './configs/express.js'
const express = require('express')
const app = express()
import { userRoutes } from './routes/userRoutes.js'



app.use(config)
app.use(userRoutes)

export default app
