export default function({ route, redirect, store }) {
  const publicRoute =
    route.name === 'index' ||
    route.name === 'register' ||
    route.name === 'reset-password'
  if (store.state.auth.user) {
    if (publicRoute) {
      redirect('/start')
    }
  } else if (!publicRoute) {
    redirect('/')
  }
}
