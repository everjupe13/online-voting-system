// to use require and import in the same file
import { createRequire } from "module"
const require = createRequire(import.meta.url)



import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

require('dotenv').config({ path: './.env' })

import app from './app.js'


const port = process.env.PORT || 4545

// import { AuthService } from './services/AuthService.js'

// UserService.signup({email: 'emem@res.ru', password: 'qwerty'})


// import { userRoutes } from './routes/user.js'


// const db = require('./db/database')

// let CONTACTS = [
//   {id: v4(), name: 'Владилен', value: '+7-921-100-20-30', marked: false}
// ]


// app.use(require('./routes/record'))


// GET
app.get('/api/contacts', (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS)
  }, 1000)
})

// POST
app.post('/api/contacts', (req, res) => {
  const contact = {...req.body, id: v4(), marked: false}
  CONTACTS.push(contact)
  res.status(201).json(contact)
})

// DELETE
app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
  res.status(200).json({message: 'Контакт был удален'})
})

// PUT
app.put('/api/contacts/:id', (req, res) => {
  const idx = CONTACTS.findIndex(c => c.id === req.params.id)
  CONTACTS[idx] = req.body
  res.json(CONTACTS[idx])
})

// app.use(express.static(path.resolve(__dirname, 'client')))

app.all('*', (req, res) => {
  // res.sendFile(path.resolve(__dirname, '../index.html'))
  // res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
  res.json({ error: 'incorrect path' })
})

app.listen(port, () => {
    // perform a database connection when server starts
    // dbo.connectToServer(function(err) { 
    //     if (err) console.error(err)
        
    // })

    console.log(`🚀 Server ready at: http://localhost:${port}`)
})
