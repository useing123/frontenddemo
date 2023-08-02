<template>
  <div class="p-6 bg-red flex flex-col items-start rounded-lg shadow-md">
    <button @click="goBack" class="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 mb-4 rounded">
      ← Go back
    </button>
    <h1 class="text-2xl font-bold mb-4 text-white">Manga Details</h1>

    <div v-if="loading" class="mt-4">Loading... {{ loadingPercentage.toFixed(0) }}% completed</div>

    <div v-if="mangaDetails" class="mt-4">
      <h1 class="font-bold text-lg mt-2">{{ mangaDetails.title }}</h1>
      <p v-if="mangaDetails.genre"><strong>Genre:</strong> {{ mangaDetails.genre }}</p>
      <p v-if="mangaDetails.main_characters"><strong>Main Characters:</strong> {{ mangaDetails.main_characters }}</p>
      <p v-if="mangaDetails.manga_chapters_story"><strong>Story:</strong> {{ mangaDetails.manga_chapters_story }}</p>
      <router-link
        v-if="mangaDetails.manga_id"
        :to="`/mangaFrames/${mangaDetails.manga_id}`"
      >
        <button class="bg-red-500 text-white px-4 py-2 rounded-lg mt-4">
          Read
        </button>
      </router-link>
    </div>

    <div v-if="error" class="mt-4 text-red-500">Oops, something went wrong while fetching the manga details. Please try again or contact support.</div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      mangaDetails: null,
      loading: false,
      error: null,
      loadingPercentage: 0,
    };
  },
  created() {
    this.fetchMangaDetails();
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.fetchMangaDetails();
      },
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async fetchMangaDetails() {
      this.loading = true;

      try {
        const jwt = Cookies.get("jwt");
        const response = await axios.get(
          `https://fastapi-9a00.onrender.com/manga/read/${this.$route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        this.mangaDetails = response.data;
        this.loadingPercentage = (this.mangaDetails.chapters_title.length / this.mangaDetails.chapters_count) * 100;
        this.loading = this.loadingPercentage < 100;
        this.error = null;
      } catch (error) {
        console.error(error);
        this.loading = false;
        this.loadingPercentage = 0;
        this.error = 'Oops, something went wrong while fetching the manga details. Please try again or contact support.';
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
