<template>
  <div class="p-6 bg-blue-200 flex flex-col items-start rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4 text-white">Manga Details</h1>

    <form class="flex flex-col mt-4 w-full" @submit.prevent="getMangaDetails">
      <div class="form-group">
        <label class="text-lg font-semibold mb-2" for="mangaId">Enter Manga ID:</label>
        <input
          id="mangaId"
          v-model="mangaIdInput"
          class="p-2 w-full rounded-lg border border-gray-300"
          required
        />
        <div v-if="!mangaIdInput" class="text-red-500">Please enter a manga ID.</div>
      </div>

      <button
        type="submit"
        :disabled="!mangaIdInput || loading"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-full"
      >
        {{ loading ? 'Fetching Manga Details...' : 'Get Manga Details' }}
      </button>

      <div v-if="mangaDetails" class="mt-4">
        <h2>Manga ID: <span class="font-bold">{{ mangaDetails.manga_id }}</span></h2>
        <h2>Genre: <span class="font-bold">{{ mangaDetails.genre }}</span></h2>
        <h2>Chapters Count: <span class="font-bold">{{ mangaDetails.chapters_count }}</span></h2>
        <!-- Display other manga details here based on the response structure -->
      </div>

      <div v-if="error" class="mt-4">
        <h3 class="font-bold text-lg mt-2">Error:</h3>
        <div class="text-red-500">{{ error }}</div>
      </div>
    </form>
  </div>
</template>

<style scoped>
input {
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

export default {
  data() {
    return {
      mangaIdInput: '',
      mangaDetails: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async getMangaDetails() {
      if (!this.mangaIdInput) return;

      this.loading = true;

      try {
        const jwt = localStorage.getItem('jwt');
        const response = await this.readManga(this.mangaIdInput, jwt);
        this.mangaDetails = response.data;
        this.loading = false;
        this.error = null;
      } catch (error) {
        console.error(error);
        this.loading = false;
        this.error = error.response.data.detail || 'An error occurred.';
      }
    },
    async readManga(mangaId, jwt) {
      const response = await axios.get(`https://fastapi-9a00.onrender.com/manga/read/${mangaId}`, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      });
      return response;
    },
  },
};
</script>
