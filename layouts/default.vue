<template>
    <div class="app-container">
      <Header />
      <div class="main-content">
        <Nuxt />
      </div>
      <Footer />
    </div>
</template>
  
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>
  
<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.app-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%; /* Use 100% to ensure app-container does not exceed viewport width */
  align-items: center; /* This will center align all child elements */
}

.header {
  background-color: #181818;
  color: #fff;
  width: 100%; /* Ensures header stretches to the full width of the app container */
}

.main-content {
  flex: 1;
  width: 100%; /* Ensures main content stretches to the full width of the app container */
  overflow-y: auto;
}

.footer {
  background-color: #181818;
  color: #fff;
  width: 100%; /* Ensures footer stretches to the full width of the app container */
}
</style>
