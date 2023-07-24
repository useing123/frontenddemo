<template>
  <div class="app-container">
    <div class="main-content flex justify-center items-center">
      <div class="content-container text-center">
        <h1 class="font-extrabold mb-4 text-3xl md:text-6xl text-gray-900">
          Mangago - stories generated personally for you.
        </h1>
        <p class="font-light mb-8 text-xl md:text-2xl text-gray-600">
          Explore a world of artwork the world has never seen before!
        </p>
        <RegistrationForm />
        <hr class="my-8 border-gray-200">
        <FAQSection />
        <hr class="my-8 border-gray-200">
        <div>
          <h2 class="mb-4 font-semibold text-2xl text-gray-900">About Us</h2>
          <p class="mb-8 font-light text-xl md:text-2xl text-gray-600">Add content about your website here.</p>
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
  background: #f7f8fa;
  width: 100%; /* changed from 100vw to 100% to avoid overflow */
  box-sizing: border-box; /* Add this line */
}

.main-content {
  width: 100%; /* removed max-width */
  text-align: center;
}

.content-container {
  padding: 50px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

hr {
  border-color: #e2e8f0;
}
</style>
