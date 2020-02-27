import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.github.com/search',
    auth: {
        username: 'thiagosprestes'
    }
})

export default api