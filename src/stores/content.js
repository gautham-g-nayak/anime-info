import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', () => {
  const content = ref(null)

  function setContent(data) {
    content.value = data
  }

  return { content, setContent }
})
