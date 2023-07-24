<template>
  <header class="bg-gray-800 text-white py-4 px-6">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-semibold">
        <router-link to="/" class="mr-4">Mangago</router-link>
      </h1>
      <div>
        <router-link to="/" class="mr-4">Main</router-link>
        <router-link to="/manga_read" class="mr-4">Generate</router-link>
        <router-link to="/manga_collection">Login</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  // Логика вашего хэдера
}
</script>

<style>
/* Не нужно добавлять стили сюда при использовании Tailwind CSS */
</style>
