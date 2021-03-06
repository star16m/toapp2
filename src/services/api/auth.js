import axios from 'axios'

export default {
  userLogin(payload) {
    return axios.post('/user/login', payload)
  },
  refreshToken() {
    return axios.get('/user/token')
  },
  userLogout(payload) {
    return axios.post('/user/logout', payload)
  }
}
