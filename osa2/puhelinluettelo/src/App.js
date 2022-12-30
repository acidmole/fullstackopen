import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (id) => {
    return () => {
      deleteName(id)
    }
  }



  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(person => person.name === newName)) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        const name = persons.find(n => n.name === newName)
        updateName(name.id)
      }
      return
    }

    personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })

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

  const deleteName = (id) => {
    const name = persons.find(n => n.id === id)
    const result = window.confirm(`Delete ${name.name}?`)
    if (result) {
      personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  const updateName = (id) => {
    const name = persons.find(n => n.id === id)
    const changedName = { ...name, number: newNumber }
    personService
      .update(id, changedName)
      .then(response => {
        setPersons(persons.map(n => n.id !== id ? n : response.data))
      })
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
        <PersonList namesToShow={namesToShow} handleDelete={handleDelete} ></PersonList>
      </ul>
    </div>
  )

}

export default App