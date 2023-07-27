<template>
  <header class="header bg-black text-white p-4">
    <div class="container mx-auto flex flex-wrap justify-between items-center">
      <h1 class="font-bold text-2xl md:text-4xl">Mangago.ai</h1>
      <div class="flex gap-6">
        <router-link
          v-if="isAuthenticated"
          to="/"
          class="transition-colors duration-300 ease-in-out text-base md:text-lg hover:text-yellow-500"
        >
          Main
        </router-link>
        <router-link
          v-if="isAuthenticated"
          to="/mangaGeneration"
          class="transition-colors duration-300 ease-in-out text-base md:text-lg hover:text-yellow-500"
        >
          Generate Manga
        </router-link>
        <router-link
          v-if="isAuthenticated"
          to="/mangaSearch"
          class="transition-colors duration-300 ease-in-out text-base md:text-lg hover:text-yellow-500"
        >
          Find Manga
        </router-link>
      </div>
      <div class="flex items-center gap-6 mt-6 md:mt-0">
        <div class="language-select">
          <select class="text-white bg-transparent border border-white rounded p-1">
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="kz">Qazaq</option>
          </select>
        </div>
        <router-link
          v-if="!isAuthenticated"
          to="/login"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-300 ease-in-out"
        >
          Sign In
        </router-link>
        <button
          v-else
          @click="logoutUser"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>


<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated; // Get the authentication state from the store
    },
  },
  methods: {
    logoutUser() {
      // Clear the JWT from cookies
      this.$cookies.remove("jwt");
      // Update the authentication state in the store
      this.$store.dispatch("setAuthenticated", false);
      // Redirect the user to the home page
      this.$router.push("/");
    },
  },
};
</script>



<style scoped>
body,
html {
  padding: 0;
  margin: 0;
}

.app-container {
  padding-top: 70px; /* Adjust as necessary. This should be at least the height of your header */
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
}
</style>
