export default function(ctx) {
  if (isAuth()) {
    return ctx.redirect('/login')
  }

  function isAuth() {
    return !ctx.store.state.auth.user
  }
}
