import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = removableObject => {
    const request = axios.delete(`${baseUrl}/${removableObject.id}`)
    return request.then(response => response.data)
}

/*
const update = changedObject => {
    const request = axios.put(`${baseUrl}/${changedObject.id}`, changedObject)
    return request.then(response => response.data)
}
*/

export default {
  getAll: getAll,
  create: create,
  remove: remove
 // update: update
}
