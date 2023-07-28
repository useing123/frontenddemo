<template>
  <header class="header bg-black text-white p-4">
    <div class="container mx-auto flex flex-wrap justify-between items-center">
      <router-link
        :to="isAuthenticated ? '/mangaCollection' : '/'"
        class="font-bold text-2xl md:text-4xl"
      >
        Mangago.ai
      </router-link>
      <div class="flex gap-6">
        <router-link
          v-for="link in navigationLinks"
          :key="link.to"
          v-if="isAuthenticated || !link.authRequired"
          :to="link.to"
          class="transition-colors duration-300 ease-in-out text-base md:text-lg hover:text-yellow-500"
        >
          {{ link.label }}
        </router-link>
      </div>
      <div class="flex items-center gap-6 mt-6 md:mt-0">
        <div class="language-select">
          <select class="text-white bg-transparent border border-white rounded p-1" @change="changeLanguage">
            <option v-for="lang in supportedLanguages" :key="lang.value" :value="lang.value">{{ lang.label }}</option>
          </select>
        </div>
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-300 ease-in-out">
            Sign In
          </router-link>
        </template>
        <template v-else>
          <button @click="logoutUser" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-300 ease-in-out">
            Logout
          </button>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    navigationLinks() {
      return [
        { label: 'Read manga', to: '/mangaCollection', authRequired: true },
        { label: 'Generate Manga', to: '/mangaGeneration', authRequired: true },
        { label: 'Find Manga', to: '/mangaSearch', authRequired: true }
      ];
    }
  },
  data() {
    return {
      supportedLanguages: [
        { label: 'English', value: 'en' },
        { label: 'Русский', value: 'ru' },
        { label: 'Qazaq', value: 'kz' }
      ]
    };
  },
  methods: {
    changeLanguage(event) {
      const selectedLanguage = event.target.value;
      // Add logic here to change the language in the app
    },
    logoutUser() {
      // Clear the JWT from cookies
      this.$cookies.remove("jwt");
      // Update the authentication state in the store
      this.$store.dispatch("setAuthenticated", false);
      // Redirect the user to the home page
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
/* Your styles here */
</style>
