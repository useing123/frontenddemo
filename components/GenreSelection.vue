<template>
    <div>
      <h2 class="text-xl font-bold mb-4">Select Genres</h2>
      <div class="flex flex-wrap">
        <label
          v-for="genre in genres"
          :key="genre"
          class="p-2 rounded-lg border border-gray-300 mr-2 mb-2 flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            :value="genre"
            v-model="selectedGenres"
            class="mr-2"
          />
          <span>{{ genre }}</span>
        </label>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        genres: ['Shonen', 'Shoujo', 'Seinen', 'Josei', 'Isekai', 'Slice of Life', 'Horror', 'Mecha', 'Sports', 'Supernatural', 'Mystery', 'Historical', 'Psychological', 'Harem', 'Ecchi'],
        selectedGenres: [],
      };
    },
  };
  </script>
  