<template>
  <div class="p-6 bg-red flex flex-col items-start rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4 text-white">Manga Generation</h1>
    <GenreSelection v-model="selectedGenres" class="w-full" />
    <h2 class="text-2xl font-bold mb-4 text-white">
      You must log in to generate manga
    </h2>
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
          {{ loadingPercentage }}%
        </span>
        <span v-else> Generate Manga </span>
      </button>

      <button
        v-if="mangaDetails && mangaDetails.status === 'completed'"
        type="button"
        @click="readManga"
        class="bg-green-500 text-white px-4 py-2 rounded-lg mt-2 w-full"
      >
        Read manga
      </button>

      <button
        v-if="attempts > maxAttempts"
        type="button"
        @click="pollMangaDetails(mangaDetails.manga_id, jwt)"
        class="bg-yellow-500 text-white px-4 py-2 rounded-lg mt-2 w-full"
      >
        Check Manga Status
      </button>

      <div v-if="loading" class="mt-4">
        <h3 class="text-lg font-semibold mb-2 text-white">
          While you wait, did you know?
        </h3>
        <TriviaCard class="w-full" />
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
import Cookies from "js-cookie";
import TriviaCard from "~/components/TriviaCard.vue";

export default {
  components: {
    GenreSelection,
    TriviaCard,
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
        genre: this.selectedGenres.length
          ? this.selectedGenres.join(",")
          : "random",
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
      let receivedProps = 0;
      let attempts = 0;
      const maxAttempts = 45; // Stop polling after 30 attempts

      const intervalId = setInterval(async () => {
        attempts++;

        if (attempts > maxAttempts) {
          clearInterval(intervalId);
          this.loading = false;
          this.error =
            "Manga generation took too long. Please try again later.";
          return;
        }

        try {
          const response = await axios.get(
            `https://fastapi-9a00.onrender.com/manga/read/${mangaId}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );

          this.mangaDetails = response.data;

          let totalProps = Object.keys(this.mangaDetails).length;
          imgur_links.length = 24;
          if (
            this.mangaDetails.imgur_links &&
            this.mangaDetails.imgur_links.length > 0
          ) {
            totalProps += this.mangaDetails.imgur_links.length - 1; // Subtract one because imgur_links itself is one property.
            receivedProps =
              Object.values(this.mangaDetails).filter(Boolean).length +
              this.mangaDetails.imgur_links.length -
              1;
          } else {
            receivedProps = Object.values(this.mangaDetails).filter(
              Boolean
            ).length;
          }

          this.loadingPercentage = Math.floor(
            (receivedProps / totalProps) * 100
          );

          if (response.data.status === "completed") {
            this.loading = false;
            clearInterval(intervalId);
          }
        } catch (error) {
          console.error(error);
          this.loading = false;
          clearInterval(intervalId);
          this.error = error.response.data.detail || "An error occurred.";
        }
      }, 10000);
    },
  },
};
</script>

