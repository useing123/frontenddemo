<template>
  <footer class="footer mt-8">
    <div class="text-white text-center">
      <p>Netflix Kazakhstan</p>
      <div class="footer-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
        <a href="/about-us">About Us</a>
        <a href="/contact-us">Contact Us</a>
      </div>
      <div class="footer-social-icons">
        <a href="https://www.facebook.com/netflixkz" target="_blank" rel="noopener">
          <!-- <img src="facebook-icon.png" alt="Facebook"> -->
        </a>
        <a href="https://twitter.com/netflixkz" target="_blank" rel="noopener">
          <!-- <img src="twitter-icon.png" alt="Twitter"> -->
        </a>
        <a href="https://www.instagram.com/netflixkz" target="_blank" rel="noopener">
          <!-- <img src="instagram-icon.png" alt="Instagram"> -->
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #181818;
  padding: 20px;
  color: #999;
}

.footer p {
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.footer-links {
  margin-bottom: 1rem;
}

.footer-links a {
  color: #999;
  margin-right: 0.75rem;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

.footer-social-icons a {
  display: inline-block;
  margin-right: 0.5rem;
}

.footer-social-icons img {
  width: 25px;
  height: 25px;
}
</style>