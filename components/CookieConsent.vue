<template>
  <div v-if="show" class="cookie-consent-container">
    <div class="content-container">
      <p class="font-light text-gray-300">
        We use cookies to improve your browsing experience on our site. By using
        our site, you consent to our use of cookies.
        <a href="/privacy-policy" class="font-light underline text-blue-400"
          >Learn more</a
        >
      </p>
      <div class="buttons-container">
        <button @click="acceptCookies" class="accept-btn">I Accept</button>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      show: false,
    };
  },
  computed: {
    cookiesAccepted() {
      if (process.client) {
        return document.cookie
          .split(";")
          .some((item) => item.trim().startsWith("cookies-accepted="));
      }
      return false; // Assume cookies are not accepted on the server-side
    },
  },
  methods: {
    acceptCookies() {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1); // Cookie will expire in 1 year
      document.cookie = `cookies-accepted=true; expires=${date.toUTCString()}; path=/`;
      this.show = false;
    },
    closePopup() {
      this.show = false;
    },
  },
  mounted() {
    // On the client-side, update the 'show' state based on the cookiesAccepted value
    this.show = !this.cookiesAccepted;
  },
};
</script>
  
  
  <style scoped>
.cookie-consent-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #141414;
  color: #fff;
  padding: 20px;
  text-align: center;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content-container {
  margin-bottom: 2rem; /* Increase this value for more space */
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
}

.cookie-consent-container button {
  padding: 10px 20px;
  cursor: pointer;
  color: #fff;
  background-color: #333;
  border: none;
}

.accept-btn {
  background-color: #6b7280;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
}

.accept-btn:hover {
  background-color: #4b5563;
}

.close-btn {
  background-color: transparent;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid #6b7280;
  transition: background-color 0.2s ease-in-out;
}

.close-btn:hover {
  background-color: #4b5563;
}
</style>
  