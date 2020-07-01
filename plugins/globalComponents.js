import Vue from 'vue'

import AppButton from '~/components/ui/AppButton.vue'
import AppIcon from '~/components/common/icons/AppIcon.vue'

Vue.component('AppButton', AppButton)
Vue.component('AppIcon', AppIcon)

const ComponentContext = require.context(
  '~/components/common/icons/svg',
  true,
  /\.vue$/i,
  'lazy'
)
ComponentContext.keys().forEach((componentFilePath) => {
  const componentName = componentFilePath
    .split('/')
    .pop()
    .split('.')[0]
  Vue.component(componentName, () => ComponentContext(componentFilePath))
})
