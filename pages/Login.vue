<template>
  <div class="app-container">
    <div class="main-content flex flex-col items-center">
      <h1 class="text-3xl font-semibold text-white mb-4">Login</h1>
      <form class="form-container flex flex-col" @submit.prevent="loginUser">
        <label class="text-lg font-semibold mb-2" for="email">Email:</label>
        <input
          id="email"
          v-model="email"
          class="input-field"
          type="email"
          required
          placeholder="Email address"
        />

        <label class="text-lg font-semibold mb-2 mt-4" for="password"
          >Password:</label
        >
        <input
          id="password"
          v-model="password"
          class="input-field"
          type="password"
          required
          placeholder="Password"
        />

        <button :disabled="!email || !password" class="submit-button mt-8">
          Login
        </button>

        <button
          @click.prevent="$router.push('/register')"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          No account? Register
        </button>

        <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
// Import axios from @nuxtjs/axios
import axios from "@nuxtjs/axios";
import qs from "qs"; // You might need to install this package

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async loginUser() {
      this.error = "";
      try {
        const data = qs.stringify({
          grant_type: "",
          username: this.email,
          password: this.password,
          scope: "",
          client_id: "",
          client_secret: "",
        });

        // Use this.$axios to access Axios with the base URL from next.config.js
        const response = await this.$axios.post("/auth/users/tokens", data);

        if (response.data.access_token) {
          // Store the JWT in local storage
          localStorage.setItem("jwt", response.data.access_token);
          console.log("User logged in successfully!");
          this.$router.push("/dashboard");
        } else {
          this.error = "Error logging in: " + response.data.detail;
        }
      } catch (error) {
        this.error = "Error logging in: " + error;
      }
    },
  },
};
</script>

<style scoped>
.app-container {
  padding: 1rem;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #141414;
  box-sizing: border-box;
}

.main-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container {
  width: 100%;
  max-width: 500px;
}

/* Responsive Design */
@media screen and (max-width: 600px) {
  .form-container {
    max-width: 100%;
  }
}

.input-field {
  color: #000;
  padding: 0.5rem;
  border: none;
  background-color: #ffffff;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.submit-button {
  color: #fff;
  background-color: #e50914;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.5s ease;
}

.submit-button:hover {
  background-color: #f40612;
}
</style>
