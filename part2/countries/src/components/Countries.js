import React from 'react'

const Country = (props) => {
    console.log('Country props', props)
    const country = props.country
    
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
                        <li>
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