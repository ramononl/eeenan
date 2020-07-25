<template>
  <PageContainer :title="title">
    <div v-if="bookmarksSorted.length > 0" class="space-y-6">
      <div v-for="topic in bookmarksSorted" :key="topic.id">
        <div
          class="px-4 text-sm font-semibold tracking-wide text-gray-700 uppercase"
        >
          {{ topic.title }}
        </div>
        <div
          class="mt-1 border-t border-b border-gray-300 divide-y divide-gray-300"
        >
          <div
            v-for="subtopic in topic.subtopics"
            :key="subtopic.id"
            class="divide-y divide-gray-300"
          >
            <div
              v-for="lesson in subtopic.lessons"
              :key="lesson.id"
              class="divide-y divide-gray-300"
            >
              <ListItem
                v-for="story in lesson.stories"
                :key="story.id"
                :link="`/topics/${topic.id}/${subtopic.id}/${lesson.id}`"
                :query="startWithStory(story.id)"
              >
                <ListItemBookmark :ordering="story.ordering" :type="story.type">
                  <div>
                    <span>{{ subtopic.title }}</span>
                    <span class="px-1 font-bold text-gray-400">/</span>
                    <span>{{ lesson.title }}</span>
                  </div>
                </ListItemBookmark>
              </ListItem>
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 space-y-1">
        <div class="flex items-center space-x-1">
          <div
            class="flex items-center justify-center w-5 h-5 text-sm font-semibold leading-none text-gray-400 border-2 border-gray-400 rounded-md"
          >
            <span class="text-xs font-bold leading-none">#</span>
          </div>
          <p class="text-sm font-bold leading-none text-gray-400">
            Story-Nummer
          </p>
        </div>
        <div class="flex items-center flex-none space-x-1">
          <div
            class="flex items-center justify-center w-5 h-5 leading-none text-gray-400 border-2 border-gray-400 rounded-md text-s"
          >
            <AppIcon :size="3" icon="LightBulb" color="gray-400" />
          </div>
          <p class="text-sm font-bold leading-none text-gray-400">
            Text-Story
          </p>
        </div>
        <div class="flex items-center flex-none space-x-1">
          <div
            class="flex items-center justify-center w-5 h-5 text-sm leading-none text-gray-400 border-2 border-gray-400 rounded-md"
          >
            <AppIcon :size="3" icon="Check" color="gray-400" />
          </div>
          <p class="text-sm font-bold leading-none text-gray-400">
            Story mit Quiz
          </p>
        </div>
        <div class="flex items-center flex-none space-x-1">
          <div
            class="flex items-center justify-center w-5 h-5 text-sm leading-none text-gray-400 border-2 border-gray-400 rounded-md"
          >
            <AppIcon :size="3" icon="MenuAlt" color="gray-400" />
          </div>
          <p class="text-sm font-bold leading-none text-gray-400">
            Story mit Sortieraufgabe
          </p>
        </div>
      </div>
    </div>
    <MissingContent v-else />
  </PageContainer>
</template>

<script>
import ListItem from '~/components/common/ListItem'
import ListItemBookmark from '~/components/ui/bookmarks/ListItemBookmark'

export default {
  components: {
    ListItem,
    ListItemBookmark
  },
  data() {
    return {
      title: 'Merkliste'
    }
  },
  computed: {
    bookmarksSorted() {
      const topics = this.$store.state.topics
      const subtopics = this.$store.state.subtopics
      const lessons = this.$store.state.lessons
      const bookmarks = this.$store.state.user.bookmarks
      const bookmarksSorted = []
      const storiesStore = JSON.parse(JSON.stringify(this.$store.state.stories))
      if (Object.keys(storiesStore).length > 0) {
        Object.keys(storiesStore).forEach((topic) => {
          Object.keys(storiesStore[topic]).forEach((subtopic) => {
            Object.keys(storiesStore[topic][subtopic]).forEach((lesson) => {
              Object.keys(storiesStore[topic][subtopic][lesson]).forEach(
                function(story) {
                  if (bookmarks.includes(story)) {
                    let topicIndex = bookmarksSorted.findIndex(
                      (el) => el.id === topic
                    )
                    if (topicIndex === -1) {
                      topicIndex =
                        bookmarksSorted.push({
                          id: topic,
                          title: topics[topic].title,
                          ordering: topics[topic].ordering,
                          color: topics[topic].color,
                          subtopics: []
                        }) - 1
                    }

                    let subtopicIndex = bookmarksSorted[
                      topicIndex
                    ].subtopics.findIndex((el) => el.id === subtopic)
                    if (subtopicIndex === -1) {
                      subtopicIndex =
                        bookmarksSorted[topicIndex].subtopics.push({
                          id: subtopic,
                          title: subtopics[topic][subtopic].title,
                          ordering: subtopics[topic][subtopic].ordering,
                          lessons: []
                        }) - 1
                    }

                    let lessonIndex = bookmarksSorted[topicIndex].subtopics[
                      subtopicIndex
                    ].lessons.findIndex((el) => el.id === lesson)
                    if (lessonIndex === -1) {
                      lessonIndex =
                        bookmarksSorted[topicIndex].subtopics[
                          subtopicIndex
                        ].lessons.push({
                          id: lesson,
                          title: lessons[topic][subtopic][lesson].title,
                          ordering: lessons[topic][subtopic][lesson].ordering,
                          stories: []
                        }) - 1
                    }

                    bookmarksSorted[topicIndex].subtopics[
                      subtopicIndex
                    ].lessons[lessonIndex].stories.push({
                      id: story,
                      ordering:
                        storiesStore[topic][subtopic][lesson][story].ordering,
                      type: storiesStore[topic][subtopic][lesson][story].type
                    })
                  }
                }
              )
            })
          })
        })

        bookmarksSorted.sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
        bookmarksSorted.forEach((topic) => {
          topic.subtopics.sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
          topic.subtopics.forEach((subtopic) => {
            subtopic.lessons.sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
            subtopic.lessons.forEach((lesson) => {
              lesson.stories.sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
            })
          })
        })

        return bookmarksSorted
      } else {
        return []
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
