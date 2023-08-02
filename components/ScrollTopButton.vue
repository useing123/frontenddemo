<template>
    <button v-show="isShown" class="scroll-top-button" @click="scrollTop">
      Scroll to top
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
  bottom: 2em;
  right: 2em;
  padding: 1em;
  background: #E53E3E; /* Adjust to match your design */
  color: #FFF;
  border: none;
  cursor: pointer;
  border-radius: 0.25rem;
  font-weight: bold;
}

@media (max-width: 600px) {
  .frame {
    width: 100%;
  }
}
</style>
