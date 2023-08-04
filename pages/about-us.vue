<template>
  <div class="about-container">
    <div class="about-content">
      <h1 class="font-extrabold text-3xl md:text-6xl text-white">About Us - Mangai.me</h1>
      <p class="font-light my-8 text-xl md:text-2xl text-gray-300">Learn more about our team, our mission, and how we're revolutionizing the manga experience.</p>
      <hr class="my-8 border-gray-200">
      
      <h2 class="font-semibold text-2xl text-white">Our Mission</h2>
      <p class="font-light my-8 text-xl md:text-2xl text-gray-300">At Mangai.me, our mission is to make manga more accessible and personalized for everyone. We're passionate about creating original artworks that captivate and inspire.</p>
      <hr class="my-8 border-gray-200">
      
      <h2 class="font-semibold text-2xl text-white">Our Team</h2>
      <p class="font-light my-8 text-xl md:text-2xl text-gray-300">Our team is composed of dedicated professionals and manga enthusiasts committed to delivering the best experience to our users.</p>
      <!-- You can list team members here -->
      <hr class="my-8 border-gray-200">
      
      <h2 class="font-semibold text-2xl text-white">Contact Us</h2>
      <p class="font-light my-8 text-xl md:text-2xl text-gray-300">We love hearing from our users! Reach out to us with any questions, comments, or feedback.</p>
      <div class="socials">
        <a href="mailto:useing322@gmail.com" class="contact-link">Email us at useing322@gmail.com</a>
        <a href="https://www.instagram.com/feweeksaway" class="contact-link">Follow us on Instagram</a>
      </div>
      
      <hr class="my-8 border-gray-200">
      
      <button @click="goBack" class="btn bg-red-500 hover:bg-red-600">Go Back</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.about-container {
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

.about-content {
  width: 100%;
  text-align: center;
}

hr {
  border-color: #2c2c2c;
}

.socials {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.contact-link {
  color: #87cefa;
}

.btn {
  background-color: #1e90ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #87cefa;
}

footer {
  padding: 1rem 0;
  text-align: center;
  color: #ccc;
}
</style>
