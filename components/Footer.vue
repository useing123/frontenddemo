<template>
  <footer class="footer mt-8">
    <div class="text-white text-center">
      <p>Mangai.me by Gizatullayev Ossein &copy; 2023</p>
      <p>All Rights Reserved</p>
      <p>useing322@gmail.com</p>
      <p>Number for Kaspi Donations: +7 775 832 63 97</p>
      <div class="footer-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
        <a href="/about-us">About Us</a>
        <a href="/contacts">Contact Us</a>
      </div>
      <div class="footer-social-icons">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener">
          <!-- <img src="facebook-icon.png" alt="Facebook"> -->
        </a>
        <a href="https://www.tiktok.com/@mangai.me" target="_blank" rel="noopener">
          <img src="@/assets/icons/tik-tok.png" alt="Twitter">
        </a>
        <a href="https://www.instagram.com/mangai.me/" target="_blank" rel="noopener">
          <img src="@/assets/icons/instagram.png" alt="Instagram">
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #141414;
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