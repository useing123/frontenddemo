<template>
  <div class="p-6 flex flex-col items-start rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4 text-white">Manga Generation</h1>
    <GenreSelection ref="genreSelection" v-model="selectedGenres" class="w-full" />
    <h2 class="text-2xl font-bold mb-4 text-green-500">
      You must log in to generate manga and Manga Generation take above 10-15 minutes.
    </h2>
    <h3 class="text-2xl font-bold mb-4 text-green-200">
      We are working on removing authorization for manga generation, but please log in
    </h3>
    <h3 class="text-2xl font-bold mb-4 text-orange-500">
      <a href="https://forms.gle/4vQ8y9EDvmDytmT66" target="_blank" class="text-orange-500">
        Heeey can you help us to upgrade our platform? Please submit this form 
      </a>
    </h3>
    <form class="flex flex-col mt-4 w-full" @submit.prevent="submitForm">
      <div class="form-group">
        <label class="text-lg font-semibold mb-2" for="prompt">Enter Prompt:</label>
        <textarea
          id="prompt"
          v-model="prompt"
          class="p-2 w-full rounded-lg border border-gray-300"
          rows="4"
          required
          placeholder="Random story"
        ></textarea>
        <div v-if="!prompt" class="text-red-500">Please enter a prompt.</div>
      </div>
      
      <button
      type="submit"
      :disabled="!prompt || loading || selectedGenres.length < 1 || selectedGenres.length > 3"
      class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-4 w-full"
      >
      <span v-if="loading">
        <i class="fa fa-circle-o-notch fa-spin"></i> Processing...
      </span>
      <span v-else> Generate Manga </span>
    </button>
    
    <button @click.prevent="randomizeSelection" class="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 w-full">
      Random Prompt
    </button>

      <p v-if="mangaId" class="text-white mt-4 text-blue-500">
        Your manga is being generated. You can check the status 
        <a class="text-red-500" :href="`/manga/${mangaId}`" target="_blank">here</a>.
      </p>

      <div v-if="error" class="text-red-500 mt-4" v-html="error"></div>

      <div v-if="loading" class="progress-bar-container">
        <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
      </div>
    </form>
  </div>
</template>

<style scoped>
textarea {
  color: #000;
}

.form-group {
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.text-red-500 {
  color: #e50914;
}
</style>

<script>
import axios from "axios";
import GenreSelection from "~/components/GenreSelection.vue";
import Cookies from "js-cookie";
import randomPrompts from "@/randomPrompts.json";

export default {
  components: {
    GenreSelection,
  },
  data() {
    return {
      selectedGenres: [],
      prompt: "",
      mangaId: null,
      loading: false,
      error: null,
      progress: 0,
      progressInterval: null,
    };
  },
  methods: {
    randomizeSelection() {
      const genresToSelect = this.$refs.genreSelection.genres;
      this.selectedGenres = [];
      while (this.selectedGenres.length < 1) {
        for (let i = 0; i < 3; i++) {
          const randomGenre = genresToSelect[Math.floor(Math.random() * genresToSelect.length)];
          if (!this.selectedGenres.includes(randomGenre)) {
            this.selectedGenres.push(randomGenre);
          }
        }
      }
      this.prompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    },
    async submitForm() {
      if (!this.prompt || this.loading || this.selectedGenres.length < 1 || this.selectedGenres.length > 3) {
        this.error = "Please enter a prompt and select 1 to 3 genres.";
        return;
      }
      this.loading = true;
      this.progress = 0;
      this.progressInterval = setInterval(() => {
        if (this.progress < 95) this.progress += Math.random() * 5;
      }, 1000);
      const mangaCreateRequest = {
        genre: this.selectedGenres.length
          ? this.selectedGenres.join(",")
          : "random",
        prompt: this.prompt,
        chapters_count: 1,
      };
      try {
        const jwt = Cookies.get("jwt");
        const createResponse = await this.createManga(mangaCreateRequest, jwt);
        this.mangaId = createResponse.data.manga_id;
        this.loading = false;
        this.progress = 100;
        clearInterval(this.progressInterval);
        this.progressInterval = null;
        this.$router.push(`/manga/${this.mangaId}`);
      } catch (error) {
        console.error(error);
        this.loading = false;
        this.progress = 0;
        clearInterval(this.progressInterval);
        this.progressInterval = null;
        this.error = error.response.data.detail || "An error occurred.";
      }
    },
    async createManga(mangaCreateRequest, jwt) {
      const response = await axios.post(
        "https://fastapi-9a00.onrender.com/manga/generate",
        mangaCreateRequest,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response;
    },
  },
};
</script>
