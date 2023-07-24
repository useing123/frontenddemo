<template>
  <div class="app-container">
    <Header />
    <main class="main-content">
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
/* Reset default margins and paddings */
body, html {
  margin: 0;
  padding: 0;
}

/* Apply a base font size and set the body as flex container */
body {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Set the container for the app */
.app-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 1440px; /* Maximum width for the content */
  margin: 0 auto; /* Center the content horizontally */
  padding: 0 20px; /* Add some space between the content and the viewport */
}

/* Define the main content area with flexible spacing */
.main-content {
  flex: 1;
}

/* Style the footer */
footer {
  padding: 20px;
  background-color: #f1f1f1;
  text-align: center;
}
</style>
