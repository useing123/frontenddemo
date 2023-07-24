<template>
    <div class="p-6">
      <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
      <h2 class="text-2xl font-semibold mb-2">Genre: {{ genre }}</h2>
      <h2 class="text-2xl font-semibold mb-2">Chapters: {{ chapters_count }}</h2>
      <h2 class="text-2xl font-semibold mb-2">Main Characters</h2>
      <p class="mb-4">{{ main_characters }}</p>
      <h2 class="text-2xl font-semibold mb-2">Funservice Characters</h2>
      <p class="mb-4">{{ funservice_characters }}</p>
      <h2 class="text-2xl font-semibold mb-2">Manga Chapters Story</h2>
      <p class="mb-4">{{ manga_chapters_story }}</p>
      <h2 class="text-2xl font-semibold mb-2">Manga Frames Description</h2>
      <p class="mb-4">{{ manga_frames_description }}</p>
      <h2 class="text-2xl font-semibold mb-2">Manga Story Dialogs</h2>
      <p class="mb-4">{{ manga_story_dialogs }}</p>
      <h2 class="text-2xl font-semibold mb-2">Manga Images Description</h2>
      <p class="mb-4">{{ manga_images_description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Replace this with the actual data
        title: 'Reckless Fortune of a Lone Wanderer',
        genre: 'seinen',
        chapters_count: 1,
        main_characters: '...',
        funservice_characters: '...',
        manga_chapters_story: '...',
        manga_frames_description: '...',
        manga_story_dialogs: '...',
        manga_images_description: '...'
      }
    }
  }
  </script>

<style>

</style>