<template>
  <PageContainer :title="title">
    <div class="mb-4">
      <h2 class="px-4">Lektionen fortsetzen</h2>
      <div
        v-if="startedLessons.length > 0"
        class="pb-4 mt-2 overflow-x-auto overflow-y-visible scrolling-touch"
      >
        <div class="inline-flex flex-no-wrap px-4 space-x-4">
          <ContinueStory
            v-for="lesson in startedLessons"
            :key="lesson.id"
            :lesson="lesson"
            :query="
              startWithStory(lesson.topicId, lesson.subtopicId, lesson.lessonId)
            "
          />
        </div>
      </div>
      <div v-else class="px-4">
        <p class="text-sm text-gray-700">
          Du hast aktuell keine angefangenen Lektionen
        </p>
      </div>
    </div>
    <div class="px-4 space-y-4">
      <ContentCard>
        <div class="flex items-center justify-between">
          <h2>To-Dos</h2>
          <span
            class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold leading-4 bg-orange-300 text-orange-800"
          >
            {{ immClass }}
          </span>
        </div>
        <div v-if="todos.length > 0" class="mt-3 space-y-3">
          <nuxt-link
            v-for="todo in todos"
            :key="todo.id"
            :to="todo.link"
            class="flex items-start justify-between space-x-2 list-none"
          >
            <div class="flex items-start space-x-2">
              <div class="flex-none">
                <AppIcon
                  v-if="subtopicFinished(todo.subtopicId, todo.topicId)"
                  :size="6"
                  icon="CheckCircle"
                  color="orange-500"
                />
                <AppIcon v-else :size="6" icon="Play" color="gray-300" />
              </div>
              <div class="pt-0.5">
                <div>
                  <span>{{ todo.topic }}</span>
                  <span class="px-0.5 font-bold text-gray-400">/</span>
                  <span>{{ todo.subtopic }}</span>
                </div>
                <div class="text-sm text-gray-600">{{ todo.description }}</div>
              </div>
            </div>
            <div>
              <span
                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold leading-4 bg-gray-300 text-gray-800"
              >
                {{ todo.dueDate }}
              </span>
            </div>
          </nuxt-link>
        </div>
        <div v-else class="mt-3">
          <p class="text-sm text-gray-700">
            Es gibt momentan keine To-Dos
          </p>
        </div>
      </ContentCard>
    </div>
  </PageContainer>
</template>

<script>
import startWithStory from '~/mixins/startWithStory'
import subtopicFinished from '~/mixins/subtopicFinished'
import ContinueStory from '~/components/ui/ContinueStory'

export default {
  components: { ContinueStory },
  mixins: [startWithStory, subtopicFinished],
  data() {
    return {
      title: 'Startseite'
    }
  },
  computed: {
    startedLessons() {
      const topics = this.$store.state.topics
      const subtopics = this.$store.state.subtopics
      const lessons = this.$store.state.lessons
      const finishedStories = Object.keys(
        this.$store.state.user.finishedStories
      )
      const finishedStoriesObj = this.$store.state.user.finishedStories
      const startedLessons = []
      const storiesStore = JSON.parse(JSON.stringify(this.$store.state.stories))
      if (Object.keys(storiesStore).length > 0) {
        Object.keys(storiesStore).forEach((topic) => {
          Object.keys(storiesStore[topic]).forEach((subtopic) => {
            Object.keys(storiesStore[topic][subtopic]).forEach((lesson) => {
              Object.keys(storiesStore[topic][subtopic][lesson]).forEach(
                function(story, index) {
                  if (finishedStories.includes(story)) {
                    let lessonIndex = startedLessons.findIndex(
                      (el) => el.id === `${topic}-${subtopic}-${lesson}`
                    )
                    if (lessonIndex === -1) {
                      lessonIndex =
                        startedLessons.push({
                          id: `${topic}-${subtopic}-${lesson}`,
                          topicId: topic,
                          subtopicId: subtopic,
                          lessonId: lesson,
                          topic: topics[topic].title,
                          color: topics[topic].color,
                          subtopic: subtopics[topic][subtopic].title,
                          lesson: lessons[topic][subtopic][lesson].title,
                          stories: [],
                          lastTimestamp: 0,
                          progress: 100
                        }) - 1
                    }
                    const storyTimestamp =
                      finishedStoriesObj[story].timestamp.seconds
                    if (
                      storyTimestamp > startedLessons[lessonIndex].lastTimestamp
                    ) {
                      startedLessons[lessonIndex].lastTimestamp = storyTimestamp
                    }
                    startedLessons[lessonIndex].stories.push(story)
                  }
                }
              )
            })
          })
        })

        startedLessons.forEach((lesson, index) => {
          const numberOfStoriesInLesson = Object.keys(
            storiesStore[lesson.topicId][lesson.subtopicId][lesson.lessonId]
          ).length
          const numberOfFinishedStoriesInLesson = lesson.stories.length
          const progressInPercent =
            (numberOfFinishedStoriesInLesson / numberOfStoriesInLesson) * 100
          startedLessons[index].progress = progressInPercent
        })

        const unfinishedLessons = startedLessons.filter(
          (el) => el.progress !== 100
        )

        unfinishedLessons.sort((a, b) =>
          a.lastTimestamp < b.lastTimestamp ? 1 : -1
        )

        return unfinishedLessons
      } else {
        return []
      }
    },
    immClass() {
      const classesStore = this.$store.state.classes
      const userClass = this.$getNested(
        classesStore,
        this.$store.state.user.immClass
      )

      if (userClass) {
        return userClass.name
      } else {
        return '...'
      }
    },
    todos() {
      const topics = this.$store.state.topics
      const subtopics = this.$store.state.subtopics
      const classesStore = this.$store.state.classes
      const todos = this.$getNested(
        classesStore,
        this.$store.state.user.immClass,
        'todos'
      )

      if (todos) {
        const todosArray = []
        Object.keys(todos).forEach((todo) => {
          todosArray.push({
            id: todo,
            topicId: todos[todo].topic,
            subtopicId: todos[todo].subtopic,
            description: todos[todo].description,
            dueDate: this.$dateFns.toDate(todos[todo].dueDate.seconds * 1000)
          })
        })

        todosArray.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))

        todosArray.forEach((todo, index) => {
          todosArray[index].topic = topics[todo.topicId].title
          todosArray[index].subtopic =
            subtopics[todo.topicId][todo.subtopicId].title
          const dateFormatted = this.$dateFns.format(todo.dueDate, 'dd.MM')
          todosArray[index].dueDate = dateFormatted
          todosArray[index].link = `topics/${todo.topicId}/${todo.subtopicId}`
        })

        return todosArray
      } else {
        return []
      }
    }
  }
}
</script>
