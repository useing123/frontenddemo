<template>
  <div class="app-container">
    <div class="main-content">
      <div class="logo-container">
        <h1 class="font-extrabold text-3xl md:text-6xl text-white">
          Mangai.me - Privacy Policy
        </h1>
      </div>
      <p class="font-light my-8 text-xl md:text-2xl text-gray-300">
        At Mangai.me, we value and respect your privacy. This Privacy Policy outlines how we handle your personal data. By using our website, you agree to the collection and use of information in accordance with this policy.
      </p>
      <hr class="my-8 border-gray-200">

      <div class="policy-content">
        <div>
          <h2 class="font-semibold text-2xl text-white">Personal Information Collection and Use</h2>
          <p class="font-light my-8 text-xl md:text-2xl text-gray-300">
            We collect personal data only for necessary functions, such as providing and improving our service, and we commit to safeguarding your data with the utmost security measures. The type of information we collect includes, but is not limited to, email address, name, and usage data.
          </p>
        </div>

        <div>
          <h2 class="font-semibold text-2xl text-white">Data Sharing</h2>
          <p class="font-light my-8 text-xl md:text-2xl text-gray-300">
            We do not sell, trade, or rent users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.
          </p>
        </div>

        <!-- // More sections as needed to cover the entire policy -->
      </div>

      <hr class="my-8 border-gray-200">
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // Any necessary JavaScript data properties
    };
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

.policy-content {
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 0 20px;
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
  text-align: left;
}

hr {
  border-color: #2c2c2c;
}
</style>
