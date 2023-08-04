<template>
  <div class="bg-black-800 rounded-lg shadow-md p-4">
    <h2 class="text-xl font-bold mb-4 text-white">Select Genres</h2>
    <div class="flex flex-wrap">
      <label
        v-for="genre in genres"
        :key="genre"
        class="flex items-center cursor-pointer mr-2 mb-2 px-2 py-1 text-white rounded border border-gray-700"
      >
        <input
          type="checkbox"
          :value="genre"
          @change="updateSelectedGenres"
          class="mr-2"
          :disabled="
            selectedGenres.length >= 3 && !selectedGenres.includes(genre)
          "
        />
        {{ genre }}
      </label>
    </div>
    <div v-if="selectedGenres.length >= 3" class="text-blue-500 mt-2">
      You can choose only 3 manga genres for the best experience
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedGenres: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      genres: [
        "Shonen",
        "Shoujo",
        "Seinen",
        "Josei",
        "Isekai",
        "Slice of Life",
        "Horror",
        "Mecha",
        "Sports",
        "Supernatural",
        "Mystery",
        "Historical",
        "Psychological",
        "Harem",
        "Ecchi",
      ],
    };
  },
  methods: {
    updateSelectedGenres(event) {
      if (event.target.checked && this.selectedGenres.length < 3) {
        this.selectedGenres.push(event.target.value);
      } else {
        this.selectedGenres = this.selectedGenres.filter(
          (genre) => genre !== event.target.value
        );
      }
      this.$emit("input", this.selectedGenres);
    },
  },
};
</script>


<style scoped>
.genre-section {
  background-color: #141414;
}

.genre-option {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #2c2c2c;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #202020;
  color: #fff;
  transition: background-color 0.2s ease-in-out;
}

.genre-option:hover {
  background-color: #1c1c1c;
}

.genre-checkbox {
  margin-right: 0.5rem;
}

.genre-label {
  font-size: 0.875rem;
}
</style>
