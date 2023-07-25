<template>
  <div class="p-6 bg-red flex flex-col items-start rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4 text-white">Manga Generation</h1>
    <GenreSelection v-model="selectedGenres" class="w-full" />

    <form class="flex flex-col mt-4 w-full" @submit.prevent="submitForm">
      <div class="form-group">
        <label class="text-lg font-semibold mb-2" for="prompt">Enter Prompt:</label>
        <textarea
          id="prompt"
          v-model="prompt"
          class="p-2 w-full rounded-lg border border-gray-300"
          rows="4"
          required
        ></textarea>
        <div v-if="!prompt" class="text-red-500">Please enter a prompt.</div>
      </div>

      <button
        type="submit"
        :disabled="!prompt || loading"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-full"
      >
        {{ loading ? 'Generating Manga...' : 'Generate Manga' }}
      </button>

      <button
        type="button"
        @click="clearForm"
        class="bg-gray-500 text-white px-4 py-2 rounded-lg mt-2 w-full"
      >
        Clear
      </button>

      <div v-if="mangaId" class="mt-4">
        <h2>Your manga is ready! Here is the ID: <span class="font-bold text-blue-500">{{ mangaId }}</span></h2>
        <div v-if="mangaDetails">
          <h3 class="font-bold text-lg mt-2">Manga Details:</h3>
          <pre class="border border-gray-300 rounded-lg p-4 bg-white mt-2">{{ mangaDetails }}</pre>
        </div>
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
import axios from 'axios';
import GenreSelection from '~/components/GenreSelection.vue';
import io from 'socket.io-client';

const socket = io('https://fastapi-9a00.onrender.com');

export default {
  components: {
    GenreSelection,
  },
  data() {
    return {
      selectedGenres: [],
      prompt: '',
      mangaId: null,
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
        genre: this.selectedGenres.join(','), // Convert the array of genres to a comma-separated string
        prompt: this.prompt,
        chapters_count: 1, // You can set the chapters_count value according to your requirements
      };

      try {
        const jwt = localStorage.getItem('jwt');
        const createResponse = await this.createManga(mangaCreateRequest, jwt);
        this.mangaId = createResponse.data.manga_id;

        socket.emit('start_generation', { manga_id: this.mangaId });

        socket.on('generation_update', (data) => {
          this.mangaDetails = data;
          this.loading = data.status !== 'completed';
        });

        socket.on('generation_complete', () => {
          this.loading = false;
        });

        this.error = null;
      } catch (error) {
        console.error(error);
        this.loading = false;
        this.error = error.response.data.detail || 'An error occurred.';
      }
    },
    async createManga(mangaCreateRequest, jwt) {
      const response = await axios.post('https://fastapi-9a00.onrender.com/manga/generate', mangaCreateRequest, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      });
      return response;
    },
    clearForm() {
      this.prompt = '';
      this.selectedGenres = [];
      this.mangaId = null;
      this.mangaDetails = null;
      this.error = null;
    },
  },
};
</script>
