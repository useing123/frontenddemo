<template>
  <div class="manga-card">
    <!-- <img class="cover" :src="manga.cover_image" :alt="manga.title"> -->
    <h1 class="title">{{ manga.title }}</h1>
    <h2 class="genre">{{ manga.genre }}</h2>
    <p class="characters">{{ trimmedCharacters }}</p>
    <p class="rating">Rating: {{ manga.rating }}10/10</p>
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
  align-items: flex-start; /* Aligns content to the left */
  justify-content: space-between;
  gap: 15px;
  width: 100%;
  max-width: 600px; /* Adjust this as needed */
  box-sizing: border-box; /* Ensures padding and border are included in width */
}

.cover {
  width: 100%;
  height: auto;
}

.title, .genre, .characters, .rating {
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%; /* Ensures the text doesn't overflow the card */
}

.title {
  font-weight: bold;
  font-size: 1.2rem;
}

.rating {
  font-weight: bold;
}

.read-more {
  /* Additional styling for the "Read More" link if needed */
  width: fit-content;
  align-self: flex-end; /* Aligns the button to the right */
}
</style>
