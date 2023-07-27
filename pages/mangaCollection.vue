<template>
  <div class="app-container">
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
          class="search-input"
        />
        <select v-model="genre" class="genre-select">
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
          class="page-button"
          @click="prevPage"
          :disabled="currentPage == 1"
        >
          Prev
        </button>
        <span>Page: {{ currentPage }}</span>
        <button
          class="page-button"
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
      itemsPerPage: 10, //change this to modify items per page
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
    filteredMangas() {
      let mangas = this.mangas;
      if (this.search) {
        mangas = mangas.filter((manga) =>
          manga.title.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      if (this.genre) {
        mangas = mangas.filter(
          (manga) => manga.genre.toLowerCase() === this.genre.toLowerCase()
        );
      }
      return mangas.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    },
    maxPage() {
      return Math.ceil(this.mangas.length / this.itemsPerPage);
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
  
  <style scoped>
.app-container {
  /* Styles for app-container */
}

.main-content {
  /* Styles for main-content */
}

.page-button {
  background-color: #f56565;
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s ease-in-out;
  margin: 10px;
}

.page-button:hover {
  background-color: #e53e3e;
}

.page-button:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.search-input,
.genre-select {
  padding: 6px 12px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
}

/* Additional spacing for the grid */
.grid {
  margin: 0 -10px;
}

.grid > div {
  padding: 0 10px;
}
</style>
  