<template>
    <div class="bg-white rounded-lg shadow-md p-4">
      <!-- Display manga details -->
      <h2 class="text-xl font-semibold mb-2">{{ manga.title }}</h2>
      <p class="text-gray-500 mb-2">{{ manga.genre }}</p>
      <!-- You can add a manga image here if available -->
      <img src="path/to/manga_image.jpg" alt="Manga Image" class="w-full mb-2 rounded-lg">
      <p class="text-gray-600">{{ manga.chapters_title }}</p>
      <button class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Read</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      manga: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styling for the MangaCard component */
  </style>
  