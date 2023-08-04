<template>
  <div class="app-container">
    <div class="main-content">
      <div class="logo-container">
        <h1 class="font-extrabold text-3xl md:text-6xl text-white">
          Mangai.me - Dive into Personalized Manga Adventures!
        </h1>
        <img src="https://i.imgur.com/P6Ac62Y.png" alt="Mangai.me Logo" class="logo-img">
      </div>
      <p class="font-light my-8 text-xl md:text-2xl text-gray-300">
        Unleash your imagination in a universe of unseen, original artworks!
      </p>
      <div class="cta-container">
        <button @click="goToMangaGeneration" class="generate-btn bg-red-500">Generate Manga</button>
      </div>
      <hr class="my-8 border-gray-200">
      <RegistrationForm />
      <hr class="my-8 border-gray-200">
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

export default {
  head: {
    title: 'Mangai.me - Dive into Personalized Manga Adventures!',
    meta: [
      { hid: 'description', name: 'description', content: 'Unleash your imagination in a universe of unseen, original artworks! With personalization at our heart, we are making unseen artworks accessible for everyone.' },
      { name: 'keywords', content: 'Manga, Personalized Manga, Mangai.me, Manga Adventures' },
      { property: 'og:title', content: 'Mangai.me - Dive into Personalized Manga Adventures!' },
      { property: 'og:description', content: 'Unleash your imagination in a universe of unseen, original artworks! With personalization at our heart, we are making unseen artworks accessible for everyone.' },
      { property: 'og:image', content: 'https://i.imgur.com/P6Ac62Y.png' },
      { property: 'og:url', content: 'https://www.mangai.me' },
      // { name: 'twitter:card', content: 'summary_large_image' },
    ]
  },
  data() {
    return {
      isLoading: true,
    };
  },
  components: {
    RegistrationForm,
    FAQSection,
  },
  methods: {
    goToMangaGeneration() {
      this.$router.push('/mangaGeneration');
    }
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

.generate-btn {
  background-color: #ff4500;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.generate-btn:hover {
  background-color: #ff6347;
}
</style>
