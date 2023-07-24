<template>
  <div class="genre-section bg-gray-900 p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4 text-white">Select Genres</h2>
    <div class="flex flex-wrap">
      <label
        v-for="genre in genres"
        :key="genre"
        class="p-2 rounded-lg border border-gray-600 mr-2 mb-2 flex items-center cursor-pointer bg-gray-800 text-white hover:bg-gray-700"
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

<style scoped>
.genre-section input {
  color: #ffffff;
  background-color: #000000;
}
</style>