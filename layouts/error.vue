<template>
  <div class="error-page-container">
    <div class="error-message">
      <img class="error-image" :src="errorImage" alt="Error image">
      <h1 class="text-4xl font-bold mb-4">{{ errorCode }}</h1>
      <p class="text-xl mb-4">{{ errorMessage }}</p>
      <p class="text-md mb-6">{{ errorSuggestion }}</p>
      <button
        class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
        @click="goBack"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.error-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #141414;
  padding: 1rem;
}

.error-message {
  text-align: center;
  padding: 2rem;
  background-color: #141414;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

.error-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 1.5rem;
}

.button {
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>

<script>
export default {
  props: {
    errorCode: {
      type: String,
      default: "Uh-oh!",
    },
    errorMessage: {
      type: String,
      default: "It looks like something went wrong on our end.",
    },
    errorSuggestion: {
      type: String,
      default: "Please try going back to the previous page, or check back in a little while.",
    },
    errorImage: {
      type: String,
      default: "https://i.imgur.com/uRhKVpd.png",
    },
    buttonText: {
      type: String,
      default: "Go back"
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'index' });
    },
  },
};
</script>
