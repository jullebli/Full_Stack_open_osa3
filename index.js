const { response } = require('express')
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
    
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
    
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
   
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
    
  }
]

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  let person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const id = Math.floor(Math.random() * (50000 - 50) + 50)

  const person = req.body
  person.id = id

  if (!person.name) {
    return res.status(400).json({
      error: "name is missing"
    })

  } else if (!person.number) {
    return res.status(400).json({
      error: "number is missing"
    })

  } else if (persons.some(p => p.name === person.name)) {
    return res.status(400).json({
      error: "name must be unique"
    })

  } else {
    persons = persons.concat(person)
    console.log(person)
    res.json(person)
  }

})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const personsSize = persons.length
  const date = new Date()
  res.send(`<p>Phonebook has info for ${personsSize} people</p>
  <p>${date}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
