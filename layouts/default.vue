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
  width: 100%; 
  align-items: center; 
  background: #141414; 
  color: #fff;
}

.header {
  background-color: #141414;
  color: #fff;
  width: 100%; 
}

.main-content {
  flex: 1;
  width: 100%; 
  overflow-y: auto;
  background: #141414; 
  color: #fff;
}

.footer {
  background-color: #141414;
  color: #fff;
  width: 100%; 
}
</style>
