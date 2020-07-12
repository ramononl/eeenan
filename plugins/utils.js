export default (context, inject) => {
  const getNested = function(obj, ...args) {
    return args.reduce((obj, level) => obj && obj[level], obj)
  }
  inject('getNested', getNested)
}
