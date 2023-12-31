// eslint-disable-next-line react/prop-types
const Person = ({person}) => {
    if (person) {
        return (
            // eslint-disable-next-line react/prop-types
            <li>{person.name}, {person.number} </li>
        )
    }
    return null
}

export default Person