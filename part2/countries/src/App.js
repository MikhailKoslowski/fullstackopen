import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    const effectHook = () => {
        console.log("effect")
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setCountries(response.data)
        })
    }
    useEffect(effectHook, [])

    console.log(countries)

    console.log(filter)

    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
        <Filter label='find countries:' field={filter} setField={setFilter} />
        <Countries countries={countriesToShow}/>

        </div>
    )
}

export default App