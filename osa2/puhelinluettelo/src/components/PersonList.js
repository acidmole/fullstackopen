const PersonList = ({ namesToShow }) => {
  return (
    namesToShow.map(person => <li key={person.id}>{person.name}, {person.number}</li>)
  )
}

export default PersonList