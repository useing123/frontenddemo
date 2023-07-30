<template>
  <div class="p-6 bg-red flex flex-col items-start rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4 text-white">Manga Generation</h1>
    <GenreSelection v-model="selectedGenres" class="w-full" />

    <form class="flex flex-col mt-4 w-full" @submit.prevent="submitForm">
      <div class="form-group">
        <label class="text-lg font-semibold mb-2" for="prompt"
          >Enter Prompt:</label
        >
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
        :disabled="!prompt || loading"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-full"
      >
        <span v-if="loading">
          <i class="fa fa-circle-o-notch fa-spin"></i> Generating Manga...
        </span>
        <span v-else>
          Generate Manga
        </span>
      </button>

      <button
        v-if="loading"
        type="button"
        @click="cancelGeneration"
        class="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 w-full"
      >
        Cancel
      </button>

      <button
        type="button"
        @click="clearForm"
        class="bg-gray-500 text-white px-4 py-2 rounded-lg mt-2 w-full"
      >
        Clear
      </button>
      <button
        type="button"
        @click="readManga"
        class="bg-green-500 text-white px-4 py-2 rounded-lg mt-2 w-full"
      >
        Read manga
      </button>
      <div v-if="mangaDetails" class="mt-4">
        <h2>
          Your manga is ready! Here is the ID:
          <span class="font-bold text-blue-500">{{
            mangaDetails.manga_id
          }}</span>
        </h2>
        <h3 class="font-bold text-lg mt-2">Manga Details:</h3>
        <p><strong>Title:</strong> {{ mangaDetails.title }}</p>
        <p><strong>Genre:</strong> {{ mangaDetails.genre }}</p>
        <p>
          <strong>Main Characters:</strong> {{ mangaDetails.main_characters }}
        </p>
        <p><strong>Story:</strong> {{ mangaDetails.manga_chapters_story }}</p>
        <p class="text-red">We're working on generating images while you can see what we've generated.</p>
      </div>
      <div v-if="error" class="text-red-500 mt-4">
        An error occurred: {{ error }}
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
import Cookies from 'js-cookie'; // Include the js-cookie package

export default {
  components: {
    GenreSelection,
  },
  data() {
    return {
      selectedGenres: [],
      prompt: "",
      mangaDetails: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      if (!this.prompt) return;

      this.loading = true;
      const mangaCreateRequest = {
        genre: this.selectedGenres.join(","), // Convert the array of genres to a comma-separated string
        prompt: this.prompt,
        chapters_count: 1, // You can set the chapters_count value according to your requirements
      };

      try {
        const jwt = Cookies.get('jwt'); // Get the JWT token from a cookie
        const createResponse = await this.createManga(mangaCreateRequest, jwt);
        this.pollMangaDetails(createResponse.data.manga_id, jwt);

        this.error = null;
      } catch (error) {
        console.error(error);
        this.loading = false;
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
    async pollMangaDetails(mangaId, jwt) {
      const intervalId = setInterval(async () => {
        const response = await axios.get(
          `https://fastapi-9a00.onrender.com/manga/read/${mangaId}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        this.mangaDetails = response.data;

        if (response.data.status === "completed") {
          this.loading = false;
          clearInterval(intervalId);
        }
      }, 25000); // Poll every 25 seconds
    },
    clearForm() {
      this.prompt = "";
      this.selectedGenres = [];
      this.mangaDetails = null;
      this.error = null;
    },
    cancelGeneration() {
      this.loading = false;
      this.prompt = '';
      this.selectedGenres = [];
      this.mangaDetails = null;
    },
    readManga() {
      if (!this.mangaDetails || !this.mangaDetails.manga_id) {
        alert("Please generate a manga first.");
        return;
      }
      // Construct the link using the manga ID
      const mangaLink = `/manga/${this.mangaDetails.manga_id}`;

      // Redirect to the link
      this.$router.push(mangaLink);
    },
  },
};
</script>
