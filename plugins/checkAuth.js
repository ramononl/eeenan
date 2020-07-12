export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    const publicRoute =
      to.name === 'index' ||
      to.name === 'register' ||
      to.name === 'reset-password'
    if (app.store.state.auth.user) {
      publicRoute ? next('/start') : next()
    } else {
      publicRoute ? next() : next('/')
    }
  })
}
