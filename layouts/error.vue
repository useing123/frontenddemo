<template>
  <div class="error-page-container">
    <div class="error-message">
      <h1 class="text-4xl font-bold mb-4">{{ errorCode }}</h1>
      <p class="text-xl">{{ errorMessage }}</p>
      <button
        class="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
        @click="goBack"
      >
        Go Back
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
}

.error-message {
  text-align: center;
  padding: 2rem;
  background-color: #262626;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

.button {
  cursor: pointer;
}

/* Add any additional styling as needed */
</style>
  
  <script>
export default {
  props: {
    errorCode: {
      type: String,
      default: "Error",
    },
    errorMessage: {
      type: String,
      default: "Oops! Something went wrong.",
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
  