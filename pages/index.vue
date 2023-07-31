<template>
  <div class="app-container">
    <div class="main-content">
      <div class="logo-container">
        <h1 class="font-extrabold text-3xl md:text-6xl text-white">
          Mangai.me - Dive into Personalized Manga Adventures!
        </h1>
        <img src="https://i.imgur.com/P6Ac62Y.png" alt="Mangai.me Logo" class="logo-img">
        <!-- <img src="images/background.png" alt=""> -->
        <!-- <img src="https://i.imgur.com/I6VTCD5.png" alt="Mangai.me Team" class="team-img"> -->
      </div>
      <p class="font-light my-8 text-xl md:text-2xl text-gray-300">
        Unleash your imagination in a universe of unseen, original artworks!
      </p>
      <hr class="my-8 border-gray-200">
      <RegistrationForm />
      <hr class="my-8 border-gray-200">
      <div class="team-container">
        <CookieConsent />
        <div>
          <h2 class="font-semibold text-2xl text-white">Who We Are</h2>
          <p class="font-light my-8 text-xl md:text-2xl text-gray-300">At Mangai.me, we're transforming the way you experience manga. With personalization at our heart, we're making unseen artworks accessible for everyone.</p>
        </div>
      </div>
      <hr class="my-8 border-gray-200">
      <FAQSection />
      <hr class="my-8 border-gray-200">
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import RegistrationForm from "@/components/RegistrationForm.vue";
import FAQSection from "@/components/FAQSection.vue";
import CookieConsent from "@/components/CookieConsent.vue";

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  components: {
    RegistrationForm,
    FAQSection,
    CookieConsent,
  },
  created() {
    axios.get('https://fastapi-9a00.onrender.com/')
      .then(response => {
        console.log(response);
        this.isLoading = false;
      })
      .catch(error => {
        console.log(error);
      });
  },
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

.team-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-img {
  max-width: 100%;
  height: auto;
}

hr {
  border-color: #2c2c2c;
}
.app-container {
  padding: 1rem;
  padding-top: 80px; /* Add top padding to accommodate for the fixed header */
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
