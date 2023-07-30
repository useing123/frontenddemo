<template>
  <div class="app-container p-4 md:p-6 lg:p-10">
    <div class="main-content flex flex-col items-center">
      <h1 class="text-3xl font-semibold text-white mb-4">
        All Manga Collections
      </h1>
      <p class="font-light mb-8 text-xl md:text-2xl text-gray-300">
        Explore our diverse and vast manga collections.
      </p>
      <div class="filters flex justify-center space-x-4 mb-8">
        <input
          v-model="search"
          type="text"
          placeholder="Search..."
          class="search-input py-2 px-4 text-base rounded border border-gray-300"
        />
        <select v-model="genre" class="genre-select py-2 px-4 text-base rounded border border-gray-300">
          <option value="">All Genres</option>
          <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
        </select>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div v-for="manga in filteredMangas" :key="manga.manga_id">
          <MangaCard :manga="manga" />
        </div>
      </div>
      <div class="pagination-container">
        <button
          class="page-button bg-red-600 text-white py-2 px-4 font-medium rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          @click="prevPage"
          :disabled="currentPage == 1"
        >
          Prev
        </button>
        <span class="text-base">Page: {{ currentPage }}</span>
        <button
          class="page-button bg-red-600 text-white py-2 px-4 font-medium rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
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
      itemsPerPage: 9, //change this to modify items per page
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
    };
  },
  async asyncData() {
    const { data } = await axios.get(
      "https://fastapi-9a00.onrender.com/manga/read/all"
    );
    return { mangas: data };
  },
  computed: {
    maxPage() {
      return Math.ceil(this.filteredMangas.length / this.itemsPerPage);
    },
    filteredMangas() {
      let mangas = this.mangas.slice(); // Create a copy of the original array

      if (this.search) {
        const searchLower = this.search.toLowerCase();
        mangas = mangas.filter((manga) =>
          manga.title.toLowerCase().includes(searchLower)
        );
      }

      if (this.genre) {
        mangas = mangas.filter(
          (manga) =>
            manga.genre &&
            manga.genre.toLowerCase() === this.genre.toLowerCase()
        );
      } else {
        // Filter out mangas with null genre
        mangas = mangas.filter((manga) => manga.genre !== null);
      }
      // Filter out mangas without enough information
      mangas = mangas.filter(
        (manga) =>
          manga.title &&
          manga.genre &&
          manga.main_characters &&
          manga.manga_id
      );

      return mangas.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
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
