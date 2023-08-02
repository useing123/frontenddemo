<template>
  <header class="header bg-black text-white p-4">
    <div class="container mx-auto flex flex-wrap justify-between items-center">
      <nuxt-link
        :to="isAuthenticated ? '/mangaCollection' : '/'"
        class="font-bold text-2xl md:text-4xl"
      >
        Mangai.me
      </nuxt-link>
      <div class="hidden md:flex gap-6">
        <nuxt-link
          v-for="link in filteredNavigationLinks"
          :key="link.to"
          :to="link.to"
          class="transition-colors duration-300 ease-in-out text-base md:text-lg hover:text-yellow-500"
        >
          {{ link.label }}
        </nuxt-link>
      </div>
      <div class="md:hidden">
        <button @click.stop="toggleMobileMenu" class="text-white p-2">
          <span>&#9776;</span>
        </button>
        <div v-if="mobileMenuOpen" class="fixed inset-x-0 bottom-0 bg-white rounded-lg shadow-lg py-2 z-50">
          <nuxt-link
            v-for="link in filteredNavigationLinks"
            :key="link.to"
            :to="link.to"
            class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
            @click.stop="toggleMobileMenu"
          >
            {{ link.label }}
          </nuxt-link>
          <button
            @click.stop="logoutUser"
            class="w-full text-left px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Logout
          </button>
        </div>
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
  .language-select,
  .mt-6 {
    display: none;
  }
}
</style>
