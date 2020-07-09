import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

export default ({ store }) => {
  createPersistedState({
    paths: ['auth.user'],
    storage: {
      getItem: (key) => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
      removeItem: (key) => Cookies.remove(key)
    }
  })(store)
}
