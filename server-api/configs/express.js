import { createRequire } from "module"
const require = createRequire(import.meta.url)

const cors = require('cors')
const express = require('express')


const config = [
  cors(),
  express.json(),
  express.urlencoded({ extended: true })
]

export default config
