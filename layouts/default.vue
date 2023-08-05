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
  created() {
    this.$store.dispatch('checkAuthenticated');
  },
};
</script>
  
<style>
body{
  background-color: #141414;
}
html {
  /* background-color:  */
  margin: 0;
  padding: 0;
  font-size: 16px;
  box-sizing: border-box;
}

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #141414;
  color: #fff;
  min-height: 100vh; /* Set minimum height to 100% of viewport height */
}

.header {
  background-color: #141414;
  color: #fff;
  width: 100%;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background: #141414;
  color: #fff;
  height: auto; /* Set height to auto */
}

.footer {
  background-color: #141414;
  color: #fff;
  width: 100%;
  height: auto; /* Set height to auto */
}
</style>

