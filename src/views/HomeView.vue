<template>
  <main v-if="data.content" class="container">
    <img
      v-if="data.content"
      class="background-image"
      :src="data.content.thumbNailImage"
      alt="Anime Image"
    />
    <div class="overlay"></div>
    <div class="content">
      <img class="content-image" :src="data.content.mainImage" alt="Anime Image" />
      <div class="content-box">
        <p class="subtitle">Today: {{ date }}</p>
        <div class="content-info">
          <img class="logo" :src="data.content.logo" alt="Anime Logo" />
          <div class="info">
            <p class="title">{{ data.content.title }}</p>
            <p class="subtitle">{{ data.content.subTitle }}</p>
            <p class="username">{{ data.content.userName }}</p>
          </div>
        </div>
        <div class="button-container">
          <button class="button" role="button" @click="gotoDetails">View</button>
          <button class="button" role="button" @click="getContent" :disabled="isLoading">
            <img v-show="isLoading" class="loader" src="../assets/loading.svg" /><span
              >Refresh</span
            >
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { getAnimeContent } from '../services/service'
import { useContentStore } from '../stores/content'

const router = useRouter()
const data = useContentStore()
const isLoading = ref(false)
const date = ref('')

function getContent() {
  isLoading.value = true
  getAnimeContent()
    .then((res) => {
      data.setContent(res.data.content)
      isLoading.value = false
    })
    .catch((e) => {
      isLoading.value = false
      console.log(e)
    })
}

function formatCurrentDate() {
  return moment().format('dddd DD MMMM')
}

function gotoDetails() {
  router.push({ name: 'details' })
}

onMounted(() => {
  if (data.content == null) {
    getContent()
  }
  date.value = formatCurrentDate()
})
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  height: 100vh;
}
.background-image {
  z-index: -2;
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.overlay {
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  background-color: rgba(0, 0, 0, 0.8);
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin: 20px 0px;
}

.background-image {
  z-index: -2;
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.overlay {
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  background-color: rgba(0, 0, 0, 0.8);
}

.content-image {
  flex: 1;
  max-height: 80vh;
  max-width: 50%;
  object-fit: contain;
  margin: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.content-image:hover {
  transform: scale(1.01);
}

.content-box {
  flex: 1;
  margin: 10px;
}

.content-info {
  display: flex;
  gap: 20px;
  text-align: center;
  margin-top: 20px;
  color: white;
  text-shadow: 2px 2px 4px #000000;
  margin-bottom: 20px;
}

.logo {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.logo:hover {
  transform: scale(1.05);
}

.info {
  text-align: left;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0px;
  margin-bottom: 5px;
  cursor: pointer;
}

.subtitle {
  font-size: 1.2rem;
  margin: 0px;
  margin-bottom: 5px;
  color: white;
}

.username {
  font-size: 1rem;
  color: gray;
  margin: 0px;
}

.button-container {
  display: flex;
  gap: 20px;
}

.button {
  background-color: #ffffff;
  border: 1px solid #222222;
  border-radius: 8px;
  color: #222222;
  font-size: 16px;
  font-weight: 600;
  outline: none;
  padding: 10px 20px;
  height: 40px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease-in-out;
}

.loader {
  width: 25px;
  margin-right: 10px;
}

.button:active {
  transform: scale(0.96);
}

.button:hover {
  transform: scale(1.05);
}

@media (max-width: 800px) {
  .content {
    flex-direction: column;
  }
  .content-image {
    max-height: 40vh;
    min-height: 30vh;
    max-width: 100%;
    flex: none;
  }
}
</style>
