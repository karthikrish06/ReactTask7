import axios from 'axios'
const API_URL = "https://6597a585668d248edf231e3d.mockapi.io"

const ApiService = axios.create({
    baseURL : API_URL,
    headers : {
        "Content-Type" : "application/json"
    }
})

export default ApiService