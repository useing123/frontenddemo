<template>
    <div class="p-6 bg-red flex flex-col items-start rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-4 text-white">Manga Details</h1>
  
      <form class="flex flex-col mt-4 w-full" @submit.prevent="fetchMangaDetails">
        <div class="form-group">
          <label class="text-lg font-semibold mb-2" for="mangaId">Enter Manga ID:</label>
          <input
            id="mangaId"
            v-model="mangaId"
            class="p-2 w-full rounded-lg border border-gray-300"
            required
          />
          <div v-if="!mangaId" class="text-red-500">Please enter a manga ID.</div>
        </div>
  
        <button
          type="submit"
          :disabled="!mangaId || loading"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-full"
        >
          {{ loading ? 'Fetching Manga Details...' : 'Fetch Manga Details' }}
        </button>
      </form>
  
      <div v-if="mangaDetails" class="mt-4">
        <h2 class="font-bold text-lg mt-2">Manga Details:</h2>
        <p><strong>Title:</strong> {{ mangaDetails.title }}</p>
        <p><strong>Genre:</strong> {{ mangaDetails.genre }}</p>
        <p><strong>Main Characters:</strong> {{ mangaDetails.main_characters }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        mangaId: '',
        mangaDetails: null,
        loading: false,
        error: null,
      };
    },
    methods: {
      async fetchMangaDetails() {
        if (!this.mangaId) return;
  
        this.loading = true;
  
        try {
          const jwt = localStorage.getItem('jwt');
          const response = await axios.get(`https://fastapi-9a00.onrender.com/manga/read/${this.mangaId}`, {
            headers: {
              'Authorization': `Bearer ${jwt}`,
            },
          });
  
          this.mangaDetails = response.data;
          this.loading = false;
          this.error = null;
        } catch (error) {
          console.error(error);
          this.loading = false;
          this.error = error.response.data.detail || 'An error occurred.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  