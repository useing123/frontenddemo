<template>
  <div class="app-container">
    <div class="main-content">
      <div class="logo-container">
        <h1 class="font-extrabold text-3xl md:text-6xl text-white">
          Mangai.me - Terms of Service
        </h1>
      </div>
      <hr class="my-8 border-gray-200" />
      <div class="tos-container">
        <h2 class="font-semibold text-2xl text-white">Terms of Service</h2>
        <p class="font-light my-8 text-xl md:text-2xl text-gray-300">
          The following terms and conditions (the "Agreement") govern all use of
          the Mangai.me website and all content, services, and products
          available at or through the website. By using the site, you agree to
          these terms. Please read them carefully. If you do not agree to the
          terms of this Agreement, do not use the site. We reserve the right to
          update, change or replace any part of these Terms of Service by
          posting updates and/or changes to our website.
        </p>
      </div>
      <hr class="my-8 border-gray-200" />
    </div>
  </div>
</template>

<script>
export default {
  name: "TermsOfService",
};
</script>
  
  <style scoped>
.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.logo-img {
  max-width: 100%;
  height: auto;
}

.tos-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.app-container {
  padding: 1rem;
  padding-top: 80px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #141414;
  width: 100%;
  box-sizing: border-box;
}

.main-content {
  width: 100%;
  text-align: center;
}

hr {
  border-color: #2c2c2c;
}
</style>
  