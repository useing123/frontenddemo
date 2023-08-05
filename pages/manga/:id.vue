<template>
  <div class="p-6 bg-black-500 flex flex-col items-start rounded-lg shadow-md">
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
        v-if="mangaDetails.manga_id && mangaDetails.imgur_links && mangaDetails.imgur_links.length > 0"
        :to="`/mangaFrames/${mangaDetails.manga_id}`"
      >
        <button class="bg-red-500 text-white px-8 py-2 rounded-lg mt-4">
          Read
        </button>
      </router-link>
      <p v-if="mangaDetails.imgur_links && mangaDetails.imgur_links.length > 0" class="mt-4 text-green-500">Your manga is ready for read</p>
    </div>

    <div v-if="error" class="mt-4 text-red-500">Oops, something went wrong while fetching the manga details. Please try again or contact support.</div>

    <section class="mt-8">
      <h2 class="text-lg font-bold text-white">Reviews</h2>
      <div class="mt-4 text-white">
        <p>Reviews section coming soon...</p>
      </div>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-bold text-white">Instructions</h2>
      <div class="mt-4 text-white">
        <p class="text-green-500">The process of generating Manga takes about 10-15 minutes so you can leave your computer open</p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      mangaDetails: null,
      loading: true,
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
        
        if (response.data.imgur_links) {
          this.mangaDetails = response.data;
          this.loadingPercentage = (this.mangaDetails.chapters_title.length / this.mangaDetails.chapters_count) * 100;
          this.loading = this.loadingPercentage < 100;
          this.error = null;
        } else {
          // retry after 5 seconds if imgur_links is not yet available
          setTimeout(this.fetchMangaDetails, 5000);
        }
        
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
/* Improved styling for better UX and aesthetics */
body {
  font-family: 'Arial', sans-serif;
}

h1, h2 {
  color: #F5F5F5;
}

button {
  transition: all 0.3s ease-in-out;
}

button:hover {
  transform: scale(1.05);
}

.mt-8 {
  margin-top: 2rem;
}

.text-red-500 {
  color: #f56565;
}

.text-white {
  color: #F5F5F5;
}

.bg-red {
  background-color: #e53e3e;
}

.bg-white {
  background-color: #ffffff;
}

.hover\:bg-gray-100:hover {
  background-color: #f7fafc;
}

.font-bold {
  font-weight: bold;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>

