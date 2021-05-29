const actions = {
  async onAuthStateChangedAction(state, { authUser, claims }) {
    if (!authUser) {
      // remove state
      // state.commit('SET_USER', null)
      state.commit('SET_EMAIL', 'user@gmail.com')

      //redirect from here
      this.$router.push({
        path: '/auth/signin',
      })
    } else {
      const { uid, email } = authUser
      // state.commit('SET_USER', {
      //   uid,
      //   email,
      // })
      state.commit('SET_EMAIL', email)
      state.commit('SET_IS_SIGNIN')
    }
  },
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_EMAIL(state, email) {
    state.email = email
  },
  SET_IS_SIGNIN(state) {
    state.isSignin = true
    console.log('state', state)
  },
}

const state = () => ({
  user: null,
  email: 'user@gmail.com',
  isSignin: false
})

const getters = {
  getUser(state) {
    return state.user
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}
