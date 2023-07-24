<template>
  <main class="main-container pt-10">
    <div class="content">
      <div class="w-[720px] text-white text-center m-auto p-2 text-6xl pt-40 font-extrabold mb-4">
        Mangago - stories generated personally for you.
      </div>
      <div class="text-white text-center m-auto md:w-[720px] font-light pb-8 text-lg mb-8">
        Explore a world of artwork the world has never seen before!
      </div>
      <div class="text-center">
        <nuxt-link to="/mangaGeneration" class="m-auto hover:bg-gray-300 hover:text-gray-800 duration-150 text-2xl bg-white p-3 px-4 rounded-2xl font-light">
          Explore
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style>
@import '@/assets/css/apple-style.css';
.main-container {
  background-image: url('images/123.jpg'); /* Замените путь на свой путь к изображению */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh; /* Гарантирует, что контейнер будет занимать всю высоту экрана */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Стили для внутреннего контейнера с контентом */
.content {
  padding: 50px; /* Добавьте отступы для контента, чтобы он не прижимался к краям экрана */
}

/* Остальные стили */
</style>
