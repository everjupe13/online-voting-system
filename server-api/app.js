import { createRequire } from "module"
const require = createRequire(import.meta.url)

import config from './configs/express.js'
const express = require('express')
const app = express()
import { userRoutes } from './routes/userRoutes.js'
import { profileRoutes } from './routes/profileRoutes.js'
import { topicsRoutes } from './routes/topicsRoutes.js'
import { votesRoutes } from './routes/votesRoutes.js'
import { starsRoutes } from './routes/starsRoutes.js'



app.use(config)
app.use(userRoutes)
app.use(topicsRoutes)
app.use(votesRoutes)
app.use(profileRoutes)
app.use(starsRoutes)

export default app
