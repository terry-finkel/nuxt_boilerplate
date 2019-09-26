export const state = () => {
  return {
    comments: [],
    users: [],
    isBusy: true,
    error: false
  }
}

export const getters = {
  COMMENTS: (state) => {
    return state.comments
  },
  USERS: (state) => {
    return state.users
  },
  IS_BUSY: (state) => {
    return state.isBusy
  },
  ERROR: (state) => {
    return state.error
  }
}

export const actions = {
  async FETCH_COMMENTS(context) {
    context.commit('SET_IS_BUSY', true)

    try {
      const data = await this.$axios.$get('/api/list/comments')
      context.commit('SET_COMMENTS', data)
    } catch (err) {
      context.commit('SET_ERROR', err)
    }

    context.commit('SET_IS_BUSY', false)
  },
  async FETCH_USERS(context) {
    context.commit('SET_IS_BUSY', true)

    try {
      const data = await this.$axios.$get('/api/list/users')
      context.commit('SET_USERS', data)
    } catch (err) {
      context.commit('SET_ERROR', err)
    }

    context.commit('SET_IS_BUSY', false)
  }
}

export const mutations = {
  SET_COMMENTS: (state, comments) => {
    state.comments = comments
  },
  SET_USERS: (state, users) => {
    state.users = users
  },
  SET_IS_BUSY: (state, isBusy) => {
    state.isBusy = isBusy
  },
  SET_ERROR: (state, error) => {
    state.error = error
  }
}
