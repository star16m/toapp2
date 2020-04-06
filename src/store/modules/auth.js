import * as types from '@/store/mutation-types'
import router from '@/router'
import api from '@/services/api/auth'
import { buildSuccess, handleError, handleResponse } from '@/utils/utils.js'
import { addMinutes, format } from 'date-fns'

const MINUTES_TO_CHECK_FOR_TOKEN_REFRESH = 1440

const getters = {
  user: state => state.user,
  token: state => state.token,
  isTokenSet: state => state.isTokenSet
}

const actions = {
  userLogin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      api
        .userLogin({ userId: payload.email, password: payload.password })
        .then(response => {
          if (response.status === 200 && response.data.result === 'SUCCESS') {
            window.localStorage.setItem(
              'user',
              JSON.stringify(response.data.body.user)
            )
            window.localStorage.setItem(
              'token',
              JSON.stringify(response.data.body.token)
            )
            window.localStorage.setItem(
              'tokenExpiration',
              JSON.stringify(
                format(
                  addMinutes(new Date(), MINUTES_TO_CHECK_FOR_TOKEN_REFRESH),
                  'X'
                )
              )
            )
            commit(types.SAVE_USER, response.data.body.user)
            commit(types.SAVE_TOKEN, response.data.body.token)
            commit(types.EMAIL_VERIFIED, true)
            buildSuccess(
              null,
              commit,
              resolve,
              router.push({
                name: 'home'
              })
            )
          } else {
            handleResponse(response, commit, reject)
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  refreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .refreshToken()
        .then(response => {
          if (response.status === 200) {
            window.localStorage.setItem(
              'token',
              JSON.stringify(response.data.token)
            )
            window.localStorage.setItem(
              'tokenExpiration',
              JSON.stringify(
                format(
                  addMinutes(new Date(), MINUTES_TO_CHECK_FOR_TOKEN_REFRESH),
                  'X'
                )
              )
            )
            commit(types.SAVE_TOKEN, response.data.token)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  autoLogin({ commit }) {
    const user = JSON.parse(localStorage.getItem('user'))
    commit(types.SAVE_USER, user)
    commit(types.SAVE_TOKEN, JSON.parse(localStorage.getItem('token')))
    commit(types.SET_LOCALE, JSON.parse(localStorage.getItem('locale')))
    commit(types.EMAIL_VERIFIED, user.verified)
  },
  userLogout({ commit }) {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('tokenExpiration')
    window.localStorage.removeItem('user')
    commit(types.LOGOUT)
    router.push({
      name: 'login'
    })
  }
}

const mutations = {
  [types.SAVE_TOKEN](state, token) {
    state.token = token
    state.isTokenSet = true
  },
  [types.LOGOUT](state) {
    state.user = null
    state.token = null
    state.isTokenSet = false
  },
  [types.SAVE_USER](state, user) {
    state.user = user
  }
}

const state = {
  user: null,
  token: JSON.parse(!!localStorage.getItem('token')) || null,
  isTokenSet: !!localStorage.getItem('token')
}

export default {
  state,
  getters,
  actions,
  mutations
}
