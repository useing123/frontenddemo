<template>
  <div class="p-6 bg-gray-50 flex flex-col items-start rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4">Manga Generation</h1>
    <GenreSelection v-model="selectedGenres" class="w-full" />
    <form class="flex flex-col mt-4 w-full" @submit.prevent="submitForm">
      <label class="text-lg font-semibold mb-2" for="prompt">Enter Prompt:</label>
      <textarea
        id="prompt"
        v-model="prompt"
        class="p-2 w-full rounded-lg border border-gray-300"
        rows="4"
      ></textarea>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-full">Generate Manga</button>
    </form>
    <div v-if="mangaId" class="mt-4">
      <h2>Your manga is ready! Here is the ID: <span class="font-bold text-blue-500">{{ mangaId }}</span></h2>
      <div v-if="mangaDetails">
        <h3 class="font-bold text-lg mt-2">Manga Details:</h3>
        <pre class="border border-gray-300 rounded-lg p-4 bg-white mt-2">{{ mangaDetails }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  color: #000; 
}
</style>


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
