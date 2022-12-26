import { useState } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    const found = persons.find(element => element.name === newName)
    if (found) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    console.log(nameObject)
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filter={newFilter} setFilter={setNewFilter} handleFilterChange={handleFilterChange}></Filter>
      </div>
      <div>
        <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}></PersonForm>
      </div>
      <h2>Numbers</h2>
      <ul>
        <PersonList namesToShow={namesToShow}></PersonList>
      </ul>
    </div>
  )

}

export default App