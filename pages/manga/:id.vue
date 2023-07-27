<template>
  <div class="p-6 bg-red flex flex-col items-start rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4 text-white">Manga Details</h1>

    <div v-if="loading" class="mt-4">Loading...</div>

    <div v-if="mangaDetails" class="mt-4">
      <h2 class="font-bold text-lg mt-2">{{ mangaDetails.title }}</h2>
      <p><strong>Genre:</strong> {{ mangaDetails.genre }}</p>
      <p>
        <strong>Main Characters:</strong> {{ mangaDetails.main_characters }}
      </p>
      <p><strong>Story:</strong> {{ mangaDetails.manga_chapters_story }}</p>
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
      mangaDetails: null,
      loading: false,
      error: null,
    };
  },
  async created() {
    // Check if mangaDetails already exist in LocalStorage
    const storedMangaDetails = localStorage.getItem("mangaDetails");
    if (storedMangaDetails) {
      this.mangaDetails = JSON.parse(storedMangaDetails);
    } else {
      this.fetchMangaDetails();
    }
  },
  methods: {
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
        this.loading = false;
        this.error = null;

        // Save the mangaDetails in LocalStorage
        localStorage.setItem("mangaDetails", JSON.stringify(this.mangaDetails));
      } catch (error) {
        console.error(error);
        this.loading = false;
        this.error = error.response.data.detail || "An error occurred.";
      }
    },
  },
};
</script>
  
  <style scoped>
/* Add your styles here */
</style>
  