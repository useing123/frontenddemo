<template>
  <header class="header bg-black text-white p-4">
    <div class="container mx-auto flex flex-wrap justify-between items-center">
      <router-link
        :to="isAuthenticated ? '/mangaCollection' : '/'"
        class="font-bold text-2xl md:text-4xl"
      >
        Mangai.me
      </router-link>
      <div class="hidden md:flex gap-6">
        <router-link
          v-for="link in filteredNavigationLinks"
          :key="link.to"
          :to="link.to"
          class="transition-colors duration-300 ease-in-out text-base md:text-lg hover:text-yellow-500"
        >
          {{ link.label }}
        </router-link>
      </div>
      <div class="md:hidden">
        <button @click="toggleMobileMenu" class="text-white p-2">
          <span>&#9776;</span>
        </button>
        <div v-if="mobileMenuOpen" class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <router-link
            v-for="link in filteredNavigationLinks"
            :key="link.to"
            :to="link.to"
            class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
            @click.native="toggleMobileMenu"
          >
            {{ link.label }}
          </router-link>
          <button
            @click="logoutUser"
            class="w-full text-left px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
      <div class="hidden md:flex items-center gap-6 mt-6 md:mt-0">
        <div class="language-select">
          <select
            class="text-white bg-transparent border border-white rounded p-1"
            @change="changeLanguage"
          >
            <option
              v-for="lang in supportedLanguages"
              :key="lang.value"
              :value="lang.value"
            >
              {{ lang.label }}
            </option>
          </select>
        </div>
        <template v-if="!isAuthenticated">
          <router-link
            to="/login"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-300 ease-in-out"
          >
            Sign In
          </router-link>
        </template>
        <template v-else>
          <button
            @click="logoutUser"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-300 ease-in-out"
          >
            Logout
          </button>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import axios from "axios";

export default {
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    filteredNavigationLinks() {
      return this.navigationLinks.filter(
        (link) => this.isAuthenticated || !link.authRequired
      );
    },
  },
  data() {
    return {
      mobileMenuOpen: false,
      supportedLanguages: [
        { label: "English", value: "en" },
        { label: "Русский", value: "ru" },
        { label: "Qazaq", value: "kz" },
      ],
      navigationLinks: [
        { label: "Read manga", to: "/mangaCollection", authRequired: true },
        { label: "Generate Manga", to: "/mangaGeneration", authRequired: true },
        { label: "Reviews", to: "/mangaReviews", authRequired: true },
      ],
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    changeLanguage(event) {
      const selectedLanguage = event.target.value;
      // Add logic here to change the language in the app
    },
    logoutUser() {
      this.$cookies.remove("jwt");
      axios.defaults.headers.common["Authorization"] = null;
      this.$store.dispatch("setAuthenticated", false);
      this.$router.push("/");
      this.toggleMobileMenu();
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  /* Hide certain elements on smaller screens */
  .language-select,
  .flex.items-center.gap-6.mt-6.md\:mt-0 .bg-red-500 {
    display: none;
  }
}
</style>