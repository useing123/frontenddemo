<template>
  <div class="app-container p-2 sm:p-4 md:p-6 lg:p-10">
    <div class="main-content flex flex-col items-center">
      <h1
        class="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2 sm:mb-4"
      >
        All Manga Stories
      </h1>
      <p
        class="font-light mb-4 sm:mb-8 text-sm sm:text-xl md:text-2xl text-gray-300"
      >
        Explore user-generated stories and rate manga collections.
      </p>
      <div
        class="filters flex flex-col sm:flex-row justify-center space-y-2 sm:space-x-4 sm:space-y-0 mb-4 sm:mb-8"
      >
        <input
          v-model="search"
          type="text"
          placeholder="Search..."
          class="search-input py-2 px-2 sm:px-4 text-indigo-600 rounded border border-gray-300"
        />
        <select
          v-model="genre"
          class="genre-select py-2 px-2 sm:px-4 text-base rounded border bg-gray-600 border-gray-300"
        >
          <option value="">All Genres</option>
          <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
        </select>
        <div class="generate-manga-button">
          <!-- Use router-link to navigate to the mangaGeneration.vue component -->
          <router-link to="/mangaGeneration">
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 sm:px-4 font-medium rounded"
            >
              Generate Manga
            </button>
          </router-link>
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8"
      >
        <div v-for="manga in filteredMangas" :key="manga.manga_id">
          <MangaCard :manga="manga" />
        </div>
      </div>
      <div class="pagination-container">
        <button
          class="page-button bg-red-600 text-white py-2 px-2 sm:px-4 font-medium rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          @click="prevPage"
          :disabled="currentPage == 1"
        >
          Prev
        </button>
        <span class="text-base">Page: {{ currentPage }}</span>
        <button
          class="page-button bg-red-600 text-white py-2 px-2 sm:px-4 font-medium rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          @click="nextPage"
          :disabled="currentPage == maxPage"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MangaCard from "@/components/MangaCard.vue";

export default {
  components: {
    MangaCard,
  },
  data() {
    return {
      mangas: [],
      search: "",
      genre: "",
      currentPage: 1,
      itemsPerPage: 9,
      genres: [
        "Shonen",
        "Shoujo",
        "Seinen",
        "Josei",
        "Isekai",
        "Slice of Life",
        "Horror",
        "Mecha",
        "Sports",
        "Supernatural",
        "Mystery",
        "Historical",
        "Psychological",
        "Harem",
        "Ecchi",
      ],
      loading: false,
      error: null,
    };
  },
  async created() {
    try {
      this.loading = true;
      const { data } = await axios.get(
        "https://fastapi-9a00.onrender.com/manga/read/all"
      );
      this.mangas = data;
    } catch (error) {
      this.error = "An error occurred while fetching data.";
    } finally {
      this.loading = false;
    }
  },
  computed: {
    filteredMangas() {
      let filteredMangas = this.mangas.slice();

      if (this.search) {
        const searchLower = this.search.toLowerCase();
        filteredMangas = filteredMangas.filter(
          (manga) =>
            manga.title && manga.title.toLowerCase().includes(searchLower)
        );
      }

      if (this.genre) {
        filteredMangas = filteredMangas.filter(
          (manga) => manga.genre && manga.genre.includes(this.genre)
        );
      }

      filteredMangas = filteredMangas.filter(
        (manga) =>
          manga.title && manga.genre && manga.main_characters && manga.manga_id
      );

      return filteredMangas;
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.maxPage) {
        this.currentPage += 1;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
  },
};
</script>

<style>
/* Remove the scoped attribute from style tags as Tailwind CSS doesn't require it */
</style>
