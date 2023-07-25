<template>
  <header class="header">
    <div class="container mx-auto flex justify-between items-center py-1">
      <h1 class="text-white text-2xl font-semibold">Mangago.ai</h1>
      <div class="nav-links"></div>
      <div class="container mx-auto flex items-center py-3">
        <div class="language-select">
          <select
            class="text-white bg-transparent border border-white rounded px-2 py-1"
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="kz">Qazaq</option>
          </select>
        </div>
        <router-link
          to="/register"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
        >
          Sign Up
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.language-select select {
  color: #999;
}

.router-link-exact-active {
  color: #fff;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: flex-end;
  }

  .nav-links {
    margin-top: 16px;
  }
}
.header-transparent {
  background-color: rgba(0, 0, 0, 0); /* Transparent background */
}
</style>
