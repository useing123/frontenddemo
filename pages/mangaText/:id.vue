<template>
    <div class="p-6 bg-red flex flex-col items-start rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-4 text-white">Manga Text View</h1>
  
      <div v-if="loading" class="mt-4">Loading...</div>
  
      <div v-if="mangaText" class="mt-4 text-white">
        <h2 class="font-bold text-lg mt-2">{{ mangaText.title }}</h2>
        <p v-if="mangaText.text">
          <strong>Text:</strong> {{ mangaText.manga_chapters_story }}
        </p>
      </div>
  
      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Cookies from "js-cookie";
  
  export default {
    data() {
      return {
        manga_chapters_story: null,
        loading: false,
        error: null,
      };
    },
    async created() {
      this.fetchMangaText();
    },
    methods: {
      async fetchMangaText() {
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
  
          this.manga_chapters_story = response.data;
          this.loading = false;
          this.error = null;
        } catch (error) {
          console.error(error);
          this.loading = false;
          this.error = error.response?.data?.detail || "An error occurred.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  