<template>
  <div v-if="data.content">
    <div class="goBack" @click="() => router.go(-1)">
      <img src="../assets/arrowLeft.svg" />
    </div>
    <img
      v-if="data.content"
      class="background-image"
      :src="data.content.thumbNailImage"
      alt="Anime Image"
    />
    <div class="overlay"></div>
    <img class="content-image" :src="data.content.mainImage" alt="Anime Image" />
    <div v-if="data.content" class="content">
      <div class="content-box">
        <div class="content-info">
          <img class="logo" :src="data.content.logo" alt="Anime Logo" />
          <div class="info">
            <p class="title">{{ data.content.title }}</p>
            <p class="subtitle">{{ data.content.subTitle }}</p>
            <p class="username">{{ data.content.userName }}</p>
          </div>
        </div>
        <button class="button" role="button" @click="getContent" :disabled="isLoading">
          <img v-show="isLoading" class="loader" src="../assets/loading.svg" /><span>Refresh</span>
        </button>
        <p v-html="data.content.text"></p>
        <div class="goTop" @click="gotoTop">Go to top</div>
      </div>
    </div>
  </div>
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
  window.scrollTo(0, 0)
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

function gotoTop() {
  window.scrollTo(0, 0)
}

function formatCurrentDate() {
  return moment().format('dddd DD MMMM')
}

onMounted(() => {
  if (data.content == null) {
    getContent()
  }
  date.value = formatCurrentDate()
})
</script>

<style scoped>
.background-image {
  z-index: -2;
  position: absolute;
  height: 50vh;
  width: 100%;
  object-fit: cover;
  top: 0;
}

.content-image {
  height: 70vh;
  width: 100%;
  object-fit: contain;
}

.overlay {
  z-index: -1;
  position: absolute;
  height: 50vh;
  width: 100%;
  object-fit: cover;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.content-box {
  flex: 1;
  margin: 10px;
  max-width: 800px;
}

.content-info {
  display: flex;
  gap: 20px;
  text-align: center;
  margin-top: 20px;
  color: black;
  margin-bottom: 20px;
}

.logo {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
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
}

.username {
  font-size: 1rem;
  color: gray;
  margin: 0px;
}

.button {
  background-color: white;
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
.goBack {
  z-index: 5;
  cursor: pointer;
  padding: 10px;
  font-weight: 800;
  align-items: center;
  display: flex;
  position: sticky;
  top: 10px;
  left: 10px;
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow:
    0 10px 16px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.goTop {
  color: #2a71d4;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 20px;
}

@media (max-width: 800px) {
  .content-image {
    max-height: 50vh;
  }
}
</style>
