import axios from 'axios'

const baseURL = "/api/persons"

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

const erase = (id) => {
    console.log(`will delete id ${id}`)
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response)
}

export default { getAll, create, update, erase }