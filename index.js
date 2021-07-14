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

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if(error.name === 'ValidationError') {
    return response.status(400).send({ error: ''})
  }
  next(error);
}

app.use(errorHandler);

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response, next) => {
  Person.countDocuments()
    .then((length) => {
      response.send(`<h3>Phonebook has ${length} entries </h3> ${new Date().toISOString()}`)
    })
    .catch((error) => next(error));
  
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = Person.findById(id, (error, person) => {
      if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  })
  
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id=request.params.id;
    Person.findByIdAndRemove(id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error)); 
  
})

const generateId = () => Math.floor(Math.random()*10000);

app.post('/api/persons/', (request, response, next) => {
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

  person.save()
  .then(savedPerson => {
    console.log('savedPerson :>> ', savedPerson);
    response.json(savedPerson)
  })
  .catch(error => next(error)) 
})

app.put('/api/persons/:id', (request, response, next) => {
  // console.log('request.body :>> ', request.body);
  // console.log('request.params :>> ', request.params);
  const person = {
    name: request.body.name,
    number: request.body.number,
  }
  const opts = { runValidators: true };
  Person.findByIdAndUpdate(request.params.id, person, { new: true }, ost)
    .then(updatedNote => {
      response.json(updatedNote);
    })
    .catch(error => {
      console.log(error.response.data);
    });
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})