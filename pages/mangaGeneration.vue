<template>
  <div class="p-6 bg-red flex flex-col items-start rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4 text-white">Manga Generation</h1>
    <GenreSelection v-model="selectedGenres" class="w-full" />
    <h2 class="text-2xl font-bold mb-4 text-white">You must log in to generate manga</h2>
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
        :disabled="!prompt || loading"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-full"
      >
        <span v-if="loading">
          <i class="fa fa-circle-o-notch fa-spin"></i> Generating Manga... {{ loadingPercentage }}%
        </span>
        <span v-else>
          Generate Manga
        </span>
      </button>

      <button
        v-if="mangaDetails && mangaDetails.status === 'completed'"
        type="button"
        @click="readManga"
        class="bg-green-500 text-white px-4 py-2 rounded-lg mt-2 w-full"
      >
        Read manga
      </button>

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
</style><script>
import axios from "axios";
import GenreSelection from "~/components/GenreSelection.vue";
import Cookies from "js-cookie";

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
      loadingPercentage: 0,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      if (!this.prompt) return;

      this.loading = true;
      this.loadingPercentage = 0;
      const mangaCreateRequest = {
        genre: this.selectedGenres.length ? this.selectedGenres.join(",") : "random",
        prompt: this.prompt,
        chapters_count: 1,
      };

      try {
        const jwt = Cookies.get("jwt");
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
      const totalProps = 15; // The total number of properties in your response

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
        let receivedProps = 0;

        for (const prop in response.data) {
          if (response.data[prop] && response.data[prop] !== null) {
            receivedProps++;
          }
        }

        this.loadingPercentage = Math.floor((receivedProps / totalProps) * 100);

        if (response.data.status === "completed") {
          this.loading = false;
          clearInterval(intervalId);
        }
      }, 10000);
    },

    readManga() {
      if (!this.mangaDetails || !this.mangaDetails.manga_id) {
        alert("Please generate a manga first.");
        return;
      }

      const mangaLink = `/manga/${this.mangaDetails.manga_id}`;
      this.$router.push(mangaLink);
    },
  },
};
</script>
