export default ({ store }) => {
  if (Object.keys(store.state.topics).length === 0) {
    store.dispatch('fetchTopics')
  }
  if (Object.keys(store.state.subtopics).length === 0) {
    store.dispatch('fetchSubtopics')
  }
  if (Object.keys(store.state.lessons).length === 0) {
    store.dispatch('fetchLessons')
  }
  if (Object.keys(store.state.stories).length === 0) {
    store.dispatch('fetchStories')
  }
  if (Object.keys(store.state.classes).length === 0) {
    store.dispatch('fetchClasses')
  }
}
