<template>
  <div v-if="isLoading" class="bg-pic-placeholder"></div>
  <img
    v-else
    src="assets/bg.jpg"
    alt="Background" 
    @load="handleImageLoad"
    class="bg-pic"
  />
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    handleImageLoad() {
      this.isLoading = false;
    },
  },
};
</script>

<style>
.bg-pic-placeholder {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1; /* Set a color for the placeholder */
}
</style>
