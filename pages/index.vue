<template>
  <div class="app-container">
    <div class="main-content flex justify-center items-center">
      <div class="content-container text-center">
        <h1 class="font-extrabold mb-4 text-3xl md:text-6xl text-white">
          Mangago - Dive into Personalized Manga Adventures!
        </h1>
        <p class="font-light mb-8 text-xl md:text-2xl text-gray-300">
          Unleash your imagination in a universe of unseen, original artworks!
        </p>
        <RegistrationForm />
        <hr class="my-8 border-gray-200">
        <FAQSection />
        <hr class="my-8 border-gray-200">
        <div>
          <h2 class="mb-4 font-semibold text-2xl text-white">Who We Are</h2>
          <p class="mb-8 font-light text-xl md:text-2xl text-gray-300">At Mangago, we're transforming the way you experience manga. With personalization at our heart, we're making unseen artworks accessible for everyone.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationForm from "@/components/RegistrationForm.vue";
import FAQSection from "@/components/FAQSection.vue";

export default {
  components: {
    RegistrationForm,
    FAQSection,
  },
};
</script>

<style scoped>
.app-container {
  padding: 1rem;
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
