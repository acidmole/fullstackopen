import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('write a country name...')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  console.log('countries:', countries)
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  console.log('countriesToShow:', countriesToShow)
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  
  return (
    <div>
      <div>
        <Filter filter={newFilter} setFilter={setNewFilter} handleFilterChange={handleFilterChange}></Filter>
      </div>
      <ul>
        <CountryList countriesToShow={countriesToShow}></CountryList>
      </ul>
    </div>
  )

}

export default App