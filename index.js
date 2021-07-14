const { notStrictEqual } = require('assert');
const express = require('express');
const app = express();
app.use(express.json());
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');
app.use(express.static('build'));
app.use(cors()); 
require('dotenv').config();
const Person = require('./models/person');

const tokenBody = morgan.token('body', (req) => {
  return JSON.stringify(req.body);
})
const mgn = morgan(function (tokens, req, res) {

  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req),
  ].join(' ')
})
app.use(mgn);


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  response.send(`<h3>Phonebook has ${persons.length} entries </h3> ${new Date().toISOString()}`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(e => {
    return e.id.toString() === id.toString()
  })
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id=request.params.id;
    Person.findByIdAndRemove(id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  
})

const generateId = () => Math.floor(Math.random()*10000);

app.post('/api/persons/', (request, response) => {
    console.log('request.body :>> ', request.body);

  // if(!request.body) {
  //   return response.status(400).json({
  //     error: 'content missing'
  //   })
  // }else if(!request.body['name']) {
  //   return response.status(400).json({
  //     error: 'name missing'
  //   })  
  // }else if(!request.body["number"]) {
  //   return response.status(400).json({
  //     error: 'number missing'
  //   })
  // }else if(persons.filter((e) => e.name === request.body['name']).length > 0) {
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }
  
  const body = request.body;
   if (body.content === "") {
     return response.status(400).json({ error: ' missing content' })
   }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  //person['id'] = generateId();

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})