<template>
  <button v-show="isShown" class="scroll-top-button" @click="scrollTop">
    <icon name="chevron-up"></icon>
  </button>
</template>

<script>
export default {
  data() {
    return {
      isShown: false,
    };
  },
  methods: {
    checkScroll() {
      this.isShown = window.scrollY > 200;
    },
    scrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  created() {
    window.addEventListener('scroll', this.checkScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.checkScroll);
  },
};
</script>

<style scoped>
.scroll-top-button {
  position: fixed;
  bottom: 5em;
  right: 2em;
  padding: 1em;
  background: #ffffff; /* Adjust to match your design */
  color: #FFF;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  z-index: 1000;
}

.scroll-top-button i {
  font-size: 1.5rem;
}
</style>
