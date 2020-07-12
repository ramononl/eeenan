<template>
  <PageContainer :title="title">
    <div v-if="bookmarksSorted">
      <div v-for="(topic, name) in bookmarksSorted" :key="name">
        <div class="px-4 uppercase">{{ name }}</div>
        <div
          class="mt-1 border-t border-b border-gray-300 divide-y divide-gray-300"
        >
          <ListItem
            v-for="story in topic"
            :key="story.id"
            :link="`/topics/${name}/${story.subtopic}/${story.lesson}`"
            :query="startWithStory(story.id)"
          >
            <div class="flex items-center">
              <span>{{ story.subtopic }}</span>
              <span class="px-2 font-bold text-gray-400">/</span>
              <span>{{ story.lesson }}</span>
              <div
                class="flex items-center justify-center w-6 h-6 ml-2 text-base font-semibold text-gray-100 bg-gray-700 rounded-full"
              >
                <span>{{ story.ordering }}</span>
              </div>
            </div>
          </ListItem>
        </div>
      </div>
    </div>
    <MissingContent v-else />
  </PageContainer>
</template>

<script>
import ListItem from '~/components/common/ListItem'

export default {
  components: {
    ListItem
  },
  data() {
    return {
      title: 'Merkliste'
    }
  },
  computed: {
    bookmarksSorted() {
      const bookmarks = this.$store.state.user.bookmarks
      const bookmarksSorted = {}
      const storiesStore = JSON.parse(JSON.stringify(this.$store.state.stories))
      if (Object.keys(storiesStore).length > 0) {
        Object.keys(storiesStore).forEach((topic) => {
          Object.keys(storiesStore[topic]).forEach((subtopic) => {
            Object.keys(storiesStore[topic][subtopic]).forEach((lesson) => {
              Object.keys(storiesStore[topic][subtopic][lesson]).forEach(
                function(story) {
                  if (bookmarks.includes(story)) {
                    if (!Object.hasOwnProperty.call(bookmarksSorted, topic)) {
                      bookmarksSorted[topic] = []
                    }
                    bookmarksSorted[topic].push({
                      id: story,
                      subtopic,
                      lesson,
                      ordering:
                        storiesStore[topic][subtopic][lesson][story].ordering
                    })
                  }
                }
              )
            })
          })
        })
        return bookmarksSorted
      } else {
        return false
      }
    }
  },
  methods: {
    startWithStory(storyId) {
      return { query: 'start', value: storyId }
    }
  }
}
</script>
