const { notStrictEqual } = require('assert');
const express = require('express');
const app = express();
app.use(express.json());
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');
app.use(express.static('build'));
app.use(cors()); 

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

const persons = [
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
];

app.get('/api/persons', (request, response) => {
  response.json(persons)
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
  person = persons.filter(person => person.id.toString() !== id.toString())
  response.status(204).end();
})

const generateId = () => Math.floor(Math.random()*10000);

app.post('/api/persons/', (request, response) => {
  // console.log(request.headers);
    console.log('request :>> ', request);

  if(!request.body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }else if(!request.body['name']) {
    return response.status(400).json({
      error: 'name missing'
    })  
  }else if(!request.body["number"]) {
    return response.status(400).json({
      error: 'number missing'
    })
  }else if(persons.filter((e) => e.name === request.body['name']).length > 0) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  
  const person = request.body;
  
  person['id'] = generateId();

  response.json(persons.concat(person));


})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})