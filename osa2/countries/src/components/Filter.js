const Filter = ({ filter, setFilter }) => {
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }
    return (
        <p>
            filter shown with <input value={filter} onChange={handleFilterChange} />
        </p>
    )
}
export default Filter