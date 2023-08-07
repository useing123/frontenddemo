<template>
  <header class="header bg-black text-white p-4">
    <div class="container mx-auto flex flex-wrap justify-between items-center">
      <div class="flex items-center">
        <nuxt-link :to="isAuthenticated ? '/' : '/'" class="font-bold text-2xl md:text-4xl">Mangai.me</nuxt-link>
        <!-- Show login button when not authenticated -->
        <div v-if="!isAuthenticated" class="ml-4">
          <nuxt-link to="/login" class="bg-red-500 text-white rounded px-2 py-1">Login</nuxt-link>
        </div>
      </div>
      <div class="hidden md:flex gap-6">
        <nuxt-link
          v-for="link in internalLinks"
          :key="link.to"
          :to="link.to"
          class="transition-colors duration-300 ease-in-out text-base md:text-lg hover:text-yellow-500"
        >
          {{ link.label }}
        </nuxt-link>
        <a
          v-for="link in externalLinks"
          :key="link.to"
          :href="link.to"
          target="_blank"
          class="transition-colors duration-300 ease-in-out text-base md:text-lg hover:text-yellow-500"
        >
          {{ link.label }}
        </a>
      </div>
      <div class="fixed inset-x-0 bottom-0 bg-white rounded-lg shadow-lg py-2 z-50 w-full flex flex-row justify-around md:hidden">
        <nuxt-link
          v-for="link in internalLinks"
          :key="link.to"
          :to="link.to"
          class="flex flex-col items-center"
        >
          <icon :name="link.icon" size="2x"></icon>
          <span class="mt-2 text-black">{{ link.label }}</span>
        </nuxt-link>
        <a
          v-for="link in externalLinks"
          :key="link.to"
          :href="link.to"
          target="_blank"
          class="flex flex-col items-center"
        >
          <icon :name="link.icon" size="2x"></icon>
          <span class="mt-2 text-black">{{ link.label }}</span>
        </a>
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
  },
  data() {
    return {
      mobileMenuOpen: true,
      supportedLanguages: [
        { label: "English", value: "en" },
        { label: "Русский", value: "ru" },
        { label: "Qazaq", value: "kz" },
      ],
      internalLinks: [
        { label: "Read manga", to: "/mangaCollection", authRequired: true, icon: 'book' },
        { label: "Generate Manga", to: "/mangaGeneration", authRequired: true, icon: 'magic' },
        { label: "Reviews", to: "/mangaReviews", authRequired: true, icon: 'comments' },
      ],
      externalLinks: [
        { label: "Help up", to: "https://forms.gle/4vQ8y9EDvmDytmT66", authRequired: true, icon: 'user' },
      ],
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      // We don't need to change mobileMenuOpen based on the window size anymore.
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
