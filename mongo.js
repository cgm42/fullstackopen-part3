const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log('Missing password argument')
  process.exit(1)
}

const password = process.argv[2]



const url = `mongodb+srv://fullstack:${password}@cluster0.adag0.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}else{

  const name = process.argv[3][0] === '"' ?
    process.argv[3].substring(1, process.argv[3].length - 1) : process.argv[3]

  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })

}