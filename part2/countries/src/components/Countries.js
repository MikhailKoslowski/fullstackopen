import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Country = (props) => {
    console.log('Country props', props)
    const country = props.country
    
    const [weather, setWeather] = useState({temp:NaN, icon:'', wind:''})

    const effectHook = (response) => {
        console.log('effect')
        const apikey = process.env.REACT_APP_API_KEY

        console.log(process.env)

        const url = `http://api.weatherstack.com/current?access_key=${apikey}&query=${country.capital}`
        console.log(url)

        axios.get(url).then(response => {
            console.log('response', response.data)
            setWeather({temp: response.data.current.temperature,
                        icon:response.data.current.weather_icons,
                        wind: response.data.current.wind_speed + 'mph direction ' + response.data.current.wind_dir
                    })
        })
    }

    useEffect(effectHook, [])

    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h2>Languages</h2>
            <ul>
            {country.languages.map (language => <li key={language.name}>{language.name}</li> )}
            </ul>
            <img src={country.flag} alt={country.name + ' flag'} width='100px'/>
            <h2>Weather in {country.capital}</h2>
            <p>temperature {weather.temp}</p>
            <img src={weather.icon} alt='weather pictogram' width='100px'/>
            <p>wind {weather.wind}</p>
        </div>
    )
}

const Countries = (props) => {
    console.log('Countries props', props)

    const countries = props.countries
    const buttonClick = props.buttonClick !== undefined ? props.buttonClick : ()=>0

    if (countries.length === 0) {
        return (
            <div>
                <p>No country matches the search criteria</p>
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <Country country={countries[0]}/>
        )
    } else if (countries.length > 10) {
        return (
            <div>
                <p>Too many countries matches the search criteria, be more specific</p>
            </div>
        )
    } else {
        return (
            <div>
                <p>Matches:</p>
                <ul>
                    {countries.map( country => {
                        return (
                        <li key={country.name}>
                            {country.name}
                            <button onClick={() => buttonClick(country.name)}>Show</button>
                        </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default Countries