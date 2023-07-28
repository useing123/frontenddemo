<template>
  <div class="manga-card">
    <h1 class="title">{{ manga.title }}</h1>
    <h2 class="genre">{{ manga.genre }}</h2>
    <p class="characters">{{ trimmedCharacters }}</p>
    <nuxt-link
      :to="`/manga/${manga.manga_id}`"
      class="read-more bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-300 ease-in-out"
    >
      Read More
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    manga: {
      type: Object,
      required: true
    }
  },
  computed: {
    trimmedCharacters() {
      if (this.manga.main_characters.length > 240) {
        return this.manga.main_characters.substring(0, 240) + '...';
      } else {
        return this.manga.main_characters;
      }
    }
  }
}
</script>


<style scoped>
.manga-card {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.genre {
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.characters {
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.read-more {
  /* Additional styling for the "Read More" link if needed */
}
</style>
