// https://www.netguru.com/codestories/few-tips-that-will-make-your-pwa-on-ios-feel-like-native

// Detects if device is on iOS
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(userAgent)
}
// Detects if device is in standalone mode
const isInStandaloneMode = () =>
  'standalone' in window.navigator && window.navigator.standalone

export default ({ store }) => {
  // Checks if should display install popup notification:
  if (isIos() && !isInStandaloneMode()) {
    console.log('is ios, not in standalone')
    store.commit('showInstallMessage', true)
  }
}
