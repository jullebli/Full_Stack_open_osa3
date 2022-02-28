require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

morgan.token('post_data', function(req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})


app.use(express.static('build'))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post_data"))
app.use(cors())

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
  .then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(202).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
  app.use(morgan('post_data'))
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({
      error: "name is missing"
    })

  } else if (body.number === undefined) {
    return res.status(400).json({
      error: "number is missing"
    })

  } else {
    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save()
      .then(savedPerson => {
        res.json(savedPerson)
      })
    .catch(error => next(error))
  }
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number} = req.body

  Person.findByIdAndUpdate(
    req.params.id, 
    { name, number}, 
    { new: true, runValidators: true, context: 'query'}
  )
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
    })
})


app.get('/info', (req, res) => {
  Person.countDocuments({}, (error, count) => {
    if (error) {
      next(error)
    } else {
      const date = new Date()
      res.send(`<p>Phonebook has info for ${count} people</p>
      <p>${date}</p>`)
    }
  })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: "unknown endpoint"
  })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message
    })
  }
  next(error)
}

app.use(errorHandler)
