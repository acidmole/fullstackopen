import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.log(response)
        setPersons(response)
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
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    setInfoMessage(`Added ${newName}`)
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
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
      .catch(error => {
        setErrorMessage(
          `Information of ${name.name} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
      })
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type="error"></Notification>
      <Notification message={infoMessage} type="info"></Notification>
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
