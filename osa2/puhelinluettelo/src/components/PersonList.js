import personService from '../services/persons'

const PersonList = ({ namesToShow, handleDelete }) => {

    return (
      namesToShow.map(person => <li key={person.id}>{person.name}, {person.number} 
      <button onClick={handleDelete(person.id)}>delete</button>
      </li>)
    )
  }
  
  export default PersonList