const express = require('express')
const path = require('path')
const {v4} = require('uuid')
const app = express()
const session = require('express-session')

const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 4545;


// const db = require('./db/database');

let CONTACTS = [
  {id: v4(), name: 'Владилен', value: '+7-921-100-20-30', marked: false}
]

app.use(express.json())
app.use(cors());
// app.use(require('./routes/record'));

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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(port, () => {
    // perform a database connection when server starts
    // dbo.connectToServer(function(err) { 
    //     if (err) console.error(err);
        
    // });

    console.log(`🚀 Server ready at: http://localhost:${port}`);
});
