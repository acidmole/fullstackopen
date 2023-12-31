// eslint-disable-next-line react/prop-types
const Person = ({person}) => {
    return (
        // eslint-disable-next-line react/prop-types
        <li>{person.name}, {person.number} </li>
    )
}

export default Person