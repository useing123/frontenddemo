<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Manga Generation</h1>
    <GenreSelection v-model="selectedGenres" />
    <form class="flex flex-col mt-4" @submit.prevent="submitForm">
      <label class="text-lg font-semibold mb-2" for="prompt">Enter Prompt:</label>
      <textarea
        id="prompt"
        v-model="prompt"
        class="p-2 rounded-lg border border-gray-300"
        rows="4"
      ></textarea>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Generate Manga</button>
    </form>
    <div v-if="mangaId">
      <h2>Your manga is ready! Here is the ID: {{ mangaId }}</h2>
      <div v-if="mangaDetails">
        <h3>Manga Details:</h3>
        <pre>{{ mangaDetails }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import GenreSelection from '~/components/GenreSelection.vue';

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
    };
  },
  methods: {
    submitForm() {
      let mangaCreateRequest = {
        genre: this.selectedGenres,
        prompt: this.prompt,
        chapters_count: 10, // for example
      };

      let jwt = localStorage.getItem('jwt');

      axios({
        method: 'post',
        url: 'https://fastapi-9a00.onrender.com/manga/generate',
        data: mangaCreateRequest,
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      })
        .then((response) => {
          this.mangaId = response.data.manga_id;
          return axios({
            method: 'get',
            url: `https://fastapi-9a00.onrender.com/manga/read/${this.mangaId}`,
            headers: {
              'Authorization': `Bearer ${jwt}`,
            },
          });
        })
        .then((response) => {
          this.mangaDetails = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>
